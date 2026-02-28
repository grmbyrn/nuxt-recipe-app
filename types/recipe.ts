import type { Database } from './supabase';

export type Recipe = Database['public']['Tables']['recipes']['Row'];
