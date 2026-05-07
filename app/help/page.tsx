import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { fetchPlans, type PlanPublic } from "@/lib/api";

export const metadata = {
  title: "Help",
  description: "Atendimento ao cliente: tickets, CSAT, SLA. 14 dias grátis.",
};

export const revalidate = 60;

function formatBRL(value: string | null): string {
  if (!value) return "—";
  const n = Number(value);
  if (isNaN(n)) return value;
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default async function HelpPage() {
  let plans: PlanPublic[] = [];
  try {
    plans = await fetchPlans("help");
  } catch {
    plans = [];
  }

  return (
    <div>
      <section className="bg-ink-900 text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <p className="text-xs uppercase tracking-wider text-accent-500 mb-3">
            Persysta Help
          </p>
          <h1 className="text-4xl md:text-5xl mb-4">
            Atendimento ao cliente sem complicação
          </h1>
          <p className="text-lg text-ink-200 max-w-2xl mx-auto">
            Tickets, CSAT, categorias, SLA. Pra times pequenos e médios que
            querem profissionalizar o suporte. 14 dias grátis.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl text-center mb-10">Planos</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {plans.map((plan, idx) => {
              const featured = idx === plans.length - 1;
              return (
                <div
                  key={plan.slug}
                  className={`bg-white rounded-lg p-6 flex flex-col ${
                    featured ? "border-2 border-ink-900 shadow-md" : "border border-ink-200"
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
                    <p className="text-sm text-ink-600 mt-2 mb-3">{plan.description}</p>
                  )}
                  <ul className="text-sm space-y-1.5 flex-1 mb-5 mt-2">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      Tickets ilimitados
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      Categorias customizáveis
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      CSAT (5 estrelas)
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      Notificações em tempo real
                    </li>
                  </ul>
                  <Link
                    href={`/help/criar?plan=${plan.slug}`}
                    className={
                      featured
                        ? "block text-center bg-ink-900 hover:bg-ink-800 text-white rounded-md px-4 py-2.5 font-medium"
                        : "block text-center border border-ink-300 hover:bg-ink-50 rounded-md px-4 py-2.5 font-medium"
                    }
                  >
                    Assinar <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
