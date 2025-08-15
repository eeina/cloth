import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create a dummy client for development when environment variables are not set
const createDummyClient = () => {
  console.warn('Supabase environment variables are not set. Authentication features will be disabled.');
  return {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: () => Promise.resolve({ data: { user: null }, error: { message: 'Supabase not configured' } }),
      signUp: () => Promise.resolve({ data: { user: null }, error: { message: 'Supabase not configured' } }),
      signOut: () => Promise.resolve({ error: null }),
    },
    from: () => ({
      select: () => ({
        data: [],
        error: null,
      }),
      insert: () => ({
        data: null,
        error: { message: 'Supabase not configured' },
      }),
      update: () => ({
        data: null,
        error: { message: 'Supabase not configured' },
      }),
      delete: () => ({
        data: null,
        error: { message: 'Supabase not configured' },
      }),
    }),
  };
};

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createDummyClient() as any;