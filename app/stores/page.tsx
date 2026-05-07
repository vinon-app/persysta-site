import Link from "next/link";
import { Check, X, ArrowRight } from "lucide-react";
import { fetchPlans, type PlanPublic } from "@/lib/api";

export const metadata = {
  title: "Stores",
  description:
    "Loja online completa: catálogo, pedidos B2B, ERP, marketing. 14 dias grátis.",
};

export const revalidate = 60;

function formatBRL(value: string | null): string {
  if (!value) return "—";
  const n = Number(value);
  if (isNaN(n)) return value;
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatLimit(n: number | null, unit: string, ilim = "Ilimitado"): string {
  if (n === null) return ilim;
  return `${n.toLocaleString("pt-BR")} ${unit}`;
}

export default async function StoresPage() {
  let plans: PlanPublic[] = [];
  try {
    plans = await fetchPlans("stores");
  } catch {
    plans = [];
  }

  return (
    <div>
      <section className="bg-ink-900 text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <p className="text-xs uppercase tracking-wider text-accent-500 mb-3">
            Persysta Stores
          </p>
          <h1 className="text-4xl md:text-5xl mb-4">
            Sua loja online, do jeito profissional
          </h1>
          <p className="text-lg text-ink-200 max-w-2xl mx-auto">
            Plataforma completa pra importadoras, distribuidoras e lojistas
            B2B. Catálogo, pedidos, ERP-light, email marketing. 14 dias grátis,
            sem cartão.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl text-center mb-10">Planos</h2>

          {plans.length === 0 ? (
            <p className="text-center text-ink-500">
              Não foi possível carregar os planos.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {plans.map((plan, idx) => {
                const featured = idx === plans.length - 2;
                return (
                  <div
                    key={plan.slug}
                    className={`bg-white rounded-lg p-6 flex flex-col ${
                      featured
                        ? "border-2 border-ink-900 shadow-md"
                        : "border border-ink-200"
                    }`}
                  >
                    {featured && (
                      <div className="inline-block self-start mb-3 bg-accent-500 text-ink-900 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-semibold">
                        Mais popular
                      </div>
                    )}
                    <h3 className="text-lg mb-1">{plan.name}</h3>
                    <p className="text-3xl font-semibold mt-2">
                      {formatBRL(plan.price_brl_monthly)}
                      <span className="text-sm text-ink-500 font-normal"> /mês</span>
                    </p>
                    {plan.description && (
                      <p className="text-sm text-ink-600 mt-2 mb-3 line-clamp-3">
                        {plan.description}
                      </p>
                    )}
                    <ul className="text-sm space-y-1.5 flex-1 mb-5 mt-2">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        {formatLimit(plan.max_products, "produtos")}
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        {formatLimit(plan.max_orders_month, "pedidos/mês")}
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        {formatLimit(plan.max_emails_month, "emails/mês")}
                      </li>
                      {plan.allow_custom_domain ? (
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                          Domínio próprio
                        </li>
                      ) : (
                        <li className="flex items-start gap-2 text-ink-400">
                          <X className="w-4 h-4 shrink-0 mt-0.5" />
                          Sem domínio próprio
                        </li>
                      )}
                    </ul>
                    <Link
                      href={`/stores/criar-loja?plan=${plan.slug}`}
                      className={
                        featured
                          ? "block text-center bg-ink-900 hover:bg-ink-800 text-white rounded-md px-4 py-2.5 font-medium"
                          : "block text-center border border-ink-300 hover:bg-ink-50 rounded-md px-4 py-2.5 font-medium"
                      }
                    >
                      {plan.slug === "free" ? "Começar grátis" : "Assinar"}
                      <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
