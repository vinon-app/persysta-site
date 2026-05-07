"use client";

/**
 * Generic signup form for any Persysta product.
 *
 * Reused by /stores/criar-loja, /email/criar, /help/criar — só muda
 * o copy + plan_slug default. Após sucesso, redireciona pra
 * {slug}.persysta.com.br/{redirectTo} com token query param.
 */
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Check, Loader2, AlertCircle, X } from "lucide-react";
import {
  signupTenant,
  checkSlugAvailability,
  fetchPlans,
  type PlanPublic,
} from "@/lib/api";

const SLUG_RE = /^[a-z0-9](?:[a-z0-9-]{1,28}[a-z0-9])?$/;

const ERR_MAP: Record<string, string> = {
  slug_already_taken: "Esse slug já está em uso.",
  slug_reserved: "Esse slug é reservado e não pode ser usado.",
  slug_invalid_format: "Slug deve ser lowercase, sem espaços ou caracteres especiais.",
  slug_invalid_length: "Slug precisa ter entre 3 e 30 caracteres.",
  plan_not_found: "Plano selecionado não existe.",
};

function errorLabel(code: string): string {
  return ERR_MAP[code] ?? `Erro: ${code}`;
}

type Props = {
  product: "stores" | "email" | "help";
  slugLabel: string;
  slugPlaceholder: string;
  companyLabel: string;
  companyPlaceholder: string;
  redirectTo: string; // path em prod ({slug}.persysta.com.br/{redirectTo})
};

export function SignupForm({
  product,
  slugLabel,
  slugPlaceholder,
  companyLabel,
  companyPlaceholder,
  redirectTo,
}: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const initialPlan = params.get("plan") || (product === "stores" ? "free" : `${product}-starter`);

  const [plans, setPlans] = useState<PlanPublic[]>([]);
  const [planSlug, setPlanSlug] = useState(initialPlan);
  const [slug, setSlug] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);
  const [slugReason, setSlugReason] = useState<string | null>(null);
  const [slugChecking, setSlugChecking] = useState(false);

  useEffect(() => {
    fetchPlans(product).then(setPlans).catch(() => setPlans([]));
  }, [product]);

  useEffect(() => {
    if (!slug || slug.length < 3) {
      setSlugAvailable(null);
      setSlugReason(null);
      return;
    }
    if (!SLUG_RE.test(slug)) {
      setSlugAvailable(false);
      setSlugReason("slug_invalid_format");
      return;
    }
    let cancelled = false;
    setSlugChecking(true);
    const t = setTimeout(async () => {
      try {
        const r = await checkSlugAvailability(slug);
        if (!cancelled) {
          setSlugAvailable(r.available);
          setSlugReason(r.reason);
        }
      } catch {
        if (!cancelled) {
          setSlugAvailable(null);
          setSlugReason(null);
        }
      } finally {
        if (!cancelled) setSlugChecking(false);
      }
    }, 350);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [slug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const r = await signupTenant({
        slug: slug.trim().toLowerCase(),
        company_name: companyName.trim(),
        email: email.trim().toLowerCase(),
        password,
        user_name: userName.trim() || null,
        plan_slug: planSlug,
      });
      const isProd = typeof window !== "undefined"
        && window.location.hostname.endsWith("persysta.com.br");
      if (isProd) {
        const targetUrl = `https://${r.account_slug}.persysta.com.br/${redirectTo}?signup_token=${encodeURIComponent(r.access_token)}`;
        window.location.href = targetUrl;
      } else {
        // Dev local — exibe alert e redireciona pro dashboard local do produto
        alert(
          `Loja criada! Token: ${r.access_token.substring(0, 20)}...\n` +
          `Em prod redirecionaria pra ${r.account_slug}.persysta.com.br/${redirectTo}`,
        );
      }
    } catch (err: any) {
      const code = err?.message || "unknown";
      setError(errorLabel(code));
    } finally {
      setBusy(false);
    }
  }

  const slugBadge = slug.length < 3 ? null
    : slugChecking ? <Loader2 className="w-4 h-4 animate-spin text-ink-400" />
    : slugAvailable === true ? <Check className="w-4 h-4 text-emerald-600" />
    : slugAvailable === false ? <X className="w-4 h-4 text-red-500" />
    : null;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-ink-200 rounded-lg p-6 md:p-8 space-y-5"
    >
      {error && (
        <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-900">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" /> {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-ink-800 mb-1.5">Plano</label>
        <select
          value={planSlug}
          onChange={(e) => setPlanSlug(e.target.value)}
          className="block w-full rounded-md border border-ink-200 bg-white px-3 py-2 text-sm focus:border-ink-900 focus:outline-none focus:ring-1 focus:ring-ink-900"
        >
          {plans.length === 0 ? (
            <option value={initialPlan}>{initialPlan}</option>
          ) : (
            plans.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name} —{" "}
                {p.price_brl_monthly === "0.00" || p.price_brl_monthly === "0"
                  ? "Grátis"
                  : `R$ ${Number(p.price_brl_monthly).toFixed(2)}/mês`}
              </option>
            ))
          )}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink-800 mb-1.5">
          {slugLabel}
        </label>
        <div className="relative">
          <input
            type="text"
            value={slug}
            onChange={(e) =>
              setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))
            }
            placeholder={slugPlaceholder}
            required
            minLength={3}
            maxLength={30}
            className="block w-full rounded-md border border-ink-200 bg-white px-3 py-2 pr-32 text-sm focus:border-ink-900 focus:outline-none focus:ring-1 focus:ring-ink-900 font-mono"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-500 flex items-center gap-1">
            {slugBadge}
            .persysta.com.br
          </span>
        </div>
        {slug.length >= 3 && slugAvailable === false && slugReason && (
          <p className="text-xs text-red-700 mt-1">{errorLabel(slugReason)}</p>
        )}
        {slug.length >= 3 && slugAvailable === true && (
          <p className="text-xs text-emerald-700 mt-1">
            Disponível! Sua conta ficará em{" "}
            <span className="font-mono">{slug}.persysta.com.br</span>
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-ink-800 mb-1.5">
          {companyLabel}
        </label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder={companyPlaceholder}
          required
          minLength={2}
          maxLength={200}
          className="block w-full rounded-md border border-ink-200 bg-white px-3 py-2 text-sm focus:border-ink-900 focus:outline-none focus:ring-1 focus:ring-ink-900"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink-800 mb-1.5">
          Seu nome
        </label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Maria Silva"
          maxLength={120}
          className="block w-full rounded-md border border-ink-200 bg-white px-3 py-2 text-sm focus:border-ink-900 focus:outline-none focus:ring-1 focus:ring-ink-900"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-ink-800 mb-1.5">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="voce@email.com"
            required
            className="block w-full rounded-md border border-ink-200 bg-white px-3 py-2 text-sm focus:border-ink-900 focus:outline-none focus:ring-1 focus:ring-ink-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-800 mb-1.5">Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="mínimo 8 caracteres"
            required
            minLength={8}
            maxLength={128}
            className="block w-full rounded-md border border-ink-200 bg-white px-3 py-2 text-sm focus:border-ink-900 focus:outline-none focus:ring-1 focus:ring-ink-900"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={
          busy
          || !slug
          || slug.length < 3
          || slugAvailable === false
          || !companyName
          || !email
          || password.length < 8
        }
        className="w-full bg-ink-900 hover:bg-ink-800 disabled:opacity-50 text-white rounded-md px-6 py-3 font-medium transition flex items-center justify-center gap-2"
      >
        {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
        Criar minha conta
      </button>

      <p className="text-xs text-ink-500 text-center">
        Ao criar a conta você concorda com os{" "}
        <Link href="/termos" className="underline">Termos</Link>{" "}
        e{" "}
        <Link href="/privacidade" className="underline">Privacidade</Link>.
        14 dias grátis, sem cartão.
      </p>
    </form>
  );
}
