/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_SUPABASE_SUBSCRIBERS_TABLE?: string;
  readonly VITE_MAILCHIMP_FUNCTION_NAME?: string;
  readonly VITE_APP_TITLE?: string;
  readonly VITE_APP_DESCRIPTION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
