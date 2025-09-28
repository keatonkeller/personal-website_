import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Contact submission types
export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  message: string;
  ip_address?: string;
  user_agent?: string;
  created_at?: string;
}

// Contact form functions
export const submitContactForm = async (
  entry: Omit<ContactSubmission, 'id' | 'created_at'>
): Promise<ContactSubmission> => {
  const { error } = await supabase
    .from('contact_submissions')
    .insert([entry]);

  if (error) {
    throw error;
  }

  // Return the entry data we submitted (we don't need the DB response for anonymous inserts)
  return entry as ContactSubmission;
};

export const checkEmailExists = async (email: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from('contact_submissions')
    .select('email')
    .eq('email', email)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
    throw error;
  }

  return !!data;
};

// Get recent submissions (requires authentication)
export const getRecentSubmissions = async (limit: number = 10) => {
  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    throw error;
  }

  return data;
};