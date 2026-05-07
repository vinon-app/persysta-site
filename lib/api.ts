/**
 * Cliente HTTP do backend Persysta Stores.
 *
 * Em prod aponta pra https://api-stores.persysta.com.br/api/v1.
 * Em dev local: usa BACKEND_INTERNAL_URL (proxy via next.config rewrites).
 */

const SERVER_BASE = process.env.BACKEND_INTERNAL_URL ?? "http://localhost:8001";
const CLIENT_BASE = process.env.NEXT_PUBLIC_API_URL ?? "/api/v1";

const isServer = typeof window === "undefined";

function url(path: string): string {
  const base = isServer ? `${SERVER_BASE}/api/v1` : CLIENT_BASE;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export type PlanPublic = {
  slug: string;
  name: string;
  description: string | null;
  price_brl_monthly: string;
  price_brl_annual: string | null;
  enabled_modules: string[];
  max_products: number | null;
  max_orders_month: number | null;
  max_customers: number | null;
  max_emails_month: number | null;
  max_nf_month: number | null;
  max_storage_gb: number | null;
  allow_custom_domain: boolean;
  sort_order: number;
};

export async function fetchPlans(
  product?: "stores" | "email" | "help",
): Promise<PlanPublic[]> {
  const qs = product ? `?product=${product}` : "";
  const res = await fetch(url(`/plans${qs}`), { cache: "no-store" });
  if (!res.ok) throw new Error(`plans_fetch_failed_${res.status}`);
  return res.json();
}

export type SignupTenantPayload = {
  slug: string;
  company_name: string;
  email: string;
  password: string;
  user_name?: string | null;
  plan_slug?: string;
};

export type SignupTenantResponse = {
  account_id: number;
  account_slug: string;
  user_id: number;
  access_token: string;
  trial_ends_at: string;
};

export async function signupTenant(
  payload: SignupTenantPayload,
): Promise<SignupTenantResponse> {
  const res = await fetch(url("/onboarding/signup"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.detail?.code ?? `signup_failed_${res.status}`);
  }
  return res.json();
}

export async function checkSlugAvailability(
  slug: string,
): Promise<{ slug: string; available: boolean; reason: string | null }> {
  const res = await fetch(
    url(`/onboarding/check-slug/${encodeURIComponent(slug)}`),
    { cache: "no-store" },
  );
  if (!res.ok) throw new Error(`slug_check_failed_${res.status}`);
  return res.json();
}
