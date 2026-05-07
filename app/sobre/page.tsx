import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Persysta — software multi-tenant pra gestão. Sobre a empresa, missão e a família de produtos.",
};

/**
 * /sobre — página institucional.
 *
 * Estrutura editorial simples (Stripe-like): hero + missão + family
 * + valores. Conteúdo placeholder pra preencher quando user definir
 * tom de voz definitivo.
 */
export default function SobrePage() {
  return (
    <div>
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <h1 className="font-serif text-4xl md:text-5xl mb-6">
            Software pra rodar seu negócio.
          </h1>
          <p className="text-xl text-ink-600 mb-12 leading-relaxed">
            Persysta é uma família de produtos SaaS construída pra
            empreendedores, freelancers e pequenas empresas que precisam de
            ferramentas profissionais sem complexidade de enterprise.
          </p>

          <div className="space-y-12">
            <section>
              <h2 className="font-serif text-2xl mb-3">Por que separamos</h2>
              <p className="text-ink-600 leading-relaxed">
                Em vez de um software inchado tentando fazer tudo, dividimos
                em produtos focados que conversam entre si. Você usa o que faz
                sentido — Stores pra vender online, Email pra comunicar com
                seus clientes, Help pra dar suporte, Finanças pra controlar
                fluxo de caixa.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl mb-3">Como cobramos</h2>
              <p className="text-ink-600 leading-relaxed">
                Cada produto tem plano grátis pra começar e planos pagos
                conforme você cresce. Sem fidelidade, sem multa, sem
                surpresas. Combine 2+ produtos no Suite e economize 20%.
              </p>
              <Link
                href="/pricing"
                className="inline-block mt-3 text-accent-600 hover:text-accent-700 font-semibold"
              >
                Ver preços →
              </Link>
            </section>

            <section>
              <h2 className="font-serif text-2xl mb-3">Sobre a empresa</h2>
              <p className="text-ink-600 leading-relaxed">
                {/* PLACEHOLDER — preencher com história real */}
                Persysta nasceu da necessidade de ter ferramentas de gestão
                que respeitam o tempo do empreendedor brasileiro. Sediada no
                Brasil, focada em ergonomia em PT-BR, integrações com Pix e
                infraestrutura confiável.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl mb-3">Princípios</h2>
              <ul className="space-y-3 text-ink-600">
                <li>
                  <strong className="text-ink-900">Sem dark patterns.</strong>{" "}
                  Cancelar é tão fácil quanto contratar.
                </li>
                <li>
                  <strong className="text-ink-900">Transparência.</strong>{" "}
                  Preços claros, mudanças comunicadas com antecedência.
                </li>
                <li>
                  <strong className="text-ink-900">
                    Privacidade primeiro.
                  </strong>{" "}
                  Seus dados nunca são vendidos. LGPD-compliant.
                </li>
                <li>
                  <strong className="text-ink-900">Brasil first.</strong>{" "}
                  Pix, NF-e, mercado BR — tudo nativo, não adaptado.
                </li>
              </ul>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
