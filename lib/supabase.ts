/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

let supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
let supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Fallback to placeholders if missing or invalid
if (!supabaseUrl || !supabaseUrl.startsWith('http')) {
    console.warn('SoloPilot: Supabase URL is missing or invalid. Using placeholder.');
    supabaseUrl = 'https://placeholder.supabase.co';
}
if (!supabaseAnonKey) {
    console.warn('SoloPilot: Supabase Anon Key is missing. Using placeholder.');
    supabaseAnonKey = 'placeholder-key';
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

