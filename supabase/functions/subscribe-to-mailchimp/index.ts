// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const MAILCHIMP_API_KEY = Deno.env.get("MAILCHIMP_API_KEY") || "";
const MAILCHIMP_SERVER_PREFIX = Deno.env.get("MAILCHIMP_SERVER_PREFIX") || ""; // ← 正解✨
const MAILCHIMP_LIST_ID = Deno.env.get("MAILCHIMP_LIST_ID") || "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    if (!MAILCHIMP_API_KEY || !MAILCHIMP_SERVER_PREFIX || !MAILCHIMP_LIST_ID) {
      throw new Error("Missing Mailchimp configuration");
    }

    // Parse request body
    const { email, firstName } = await req.json();

    if (!email || !firstName) {
      return new Response(
        JSON.stringify({ error: "Email and firstName are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Subscribe to Mailchimp
    const response = await subscribeToMailchimp(email, firstName);

    return new Response(
      JSON.stringify({ success: true, data: response }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in subscribe-to-mailchimp function:", error);
    
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "An unexpected error occurred",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

async function subscribeToMailchimp(email: string, firstName: string) {
  const MAILCHIMP_URL = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`;
  
  const data = {
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: firstName,
    },
  };

  const response = await fetch(MAILCHIMP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Basic ${btoa(`anystring:${MAILCHIMP_API_KEY}`)}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.title || "Failed to subscribe to Mailchimp");
  }

  return await response.json();
}