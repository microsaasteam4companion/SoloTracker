import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

/**
 * Dodo Payments Webhook Handler
 * This function is triggered when a payment is successful.
 * It updates the 'is_paid' column in the 'user_settings' table.
 */
serve(async (req) => {
    // CORS Headers
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    }

    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const payload = await req.json()
        console.log("Received Webhook Event:", payload)

        // Extract relevant data from Dodo payload
        // Note: Dodo metadata keys are passed as metadata[key] in URL but usually flattened in payload
        const metadata = payload.metadata || {}
        const userId = metadata.user_id
        const eventType = payload.type // e.g., 'payment.succeeded'

        if (!userId) {
            console.warn("No user_id found in metadata. Skipping.")
            return new Response(JSON.stringify({ status: "ignored", reason: "no_user_id" }), {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 200,
            })
        }

        // Initialize Supabase Admin Client
        const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
        const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
        const supabase = createClient(supabaseUrl, supabaseServiceKey)

        // Update the user's payment status
        const { error } = await supabase
            .from('user_settings')
            .update({ is_paid: true })
            .eq('user_id', userId)

        if (error) {
            console.error("Database Update Error:", error)
            throw error
        }

        console.log(`Success! Updated payment status for User ID: ${userId}`)

        return new Response(JSON.stringify({ status: "success", userId }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
        })
    } catch (err) {
        console.error("Webhook Processing Failed:", err.message)
        return new Response(JSON.stringify({ error: err.message }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400,
        })
    }
})
