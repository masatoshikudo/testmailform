import { createClient } from '@supabase/supabase-js';
import { User } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

// テーブル名を環境変数から取得（デフォルトは 'subscribers'）
const supabaseTable = import.meta.env.VITE_SUPABASE_SUBSCRIBERS_TABLE || 'subscribers';

export const saveUserToSupabase = async (user: User) => {
  try {
    const { data, error } = await supabase
      .from(supabaseTable)
      .insert([{ 
        email: user.email, 
        first_name: user.firstName ?? ''
      }])
      .select();

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error('Error saving user to Supabase:', error);
    return { data: null, error };
  }
};

// Edge Function 名を環境変数から取得（デフォルトは 'subscribe-to-mailchimp'）
export const subscribeToMailchimp = async (user: User) => {
  const functionName = import.meta.env.VITE_MAILCHIMP_FUNCTION_NAME || 'subscribe-to-mailchimp';
  try {
    const { data, error } = await supabase.functions.invoke(functionName, {
      body: { email: user.email, firstName: user.firstName },
    });
    return { data, error };
  } catch (error) {
    console.error('Error subscribing to Mailchimp:', error);
    return { data: null, error };
  }
};