import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
// Dodo Payments uses Standard Webhooks (Svix) specification
import { Webhook } from "https://esm.sh/standardwebhooks@1.0.0"

serve(async (req) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, webhook-id, webhook-signature, webhook-timestamp',
    }

    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const webhookSecret = Deno.env.get('DODO_PAYMENTS_WEBHOOK_SECRET')
        if (!webhookSecret) {
            throw new Error("DODO_PAYMENTS_WEBHOOK_SECRET is not set")
        }

        // Get headers for verification
        const id = req.headers.get("webhook-id")
        const timestamp = req.headers.get("webhook-timestamp")
        const signature = req.headers.get("webhook-signature")

        if (!id || !timestamp || !signature) {
            console.error("Missing webhook headers")
            return new Response("Missing headers", { status: 400, headers: corsHeaders })
        }

        // Get raw body as text for verification
        const body = await req.text()

        // Verify the webhook signature
        const wh = new Webhook(webhookSecret)
        try {
            wh.verify(body, {
                "webhook-id": id,
                "webhook-timestamp": timestamp,
                "webhook-signature": signature,
            })
        } catch (err) {
            console.error("Signature verification failed:", err.message)
            return new Response("Invalid signature", { status: 401, headers: corsHeaders })
        }

        // Signature is valid, parse the body
        const payload = JSON.parse(body)
        console.log("Validated Webhook Event:", payload.type)

        // Extract metadata
        const metadata = payload.data?.metadata || payload.metadata || {}
        const userId = metadata.user_id

        if (!userId) {
            console.warn("No user_id found in metadata. Skipping.")
            return new Response(JSON.stringify({ status: "ignored" }), {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 200
            })
        }

        // Initialize Supabase Admin Client
        const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
        const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
        const supabase = createClient(supabaseUrl, supabaseServiceKey)

        // Only update on successful payment
        if (payload.type === 'payment.succeeded') {
            const { error } = await supabase
                .from('user_settings')
                .update({ is_paid: true })
                .eq('user_id', userId)

            if (error) {
                console.error("Database Update Error:", error)
                throw error
            }
            console.log(`Success! Unlocked dashboard for User: ${userId}`)
        }

        return new Response(JSON.stringify({ status: "success" }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
        })
    } catch (err) {
        console.error("Webhook Error:", err.message)
        return new Response(JSON.stringify({ error: err.message }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400,
        })
    }
})
