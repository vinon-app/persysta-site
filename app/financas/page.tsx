import { ArrowRight } from "lucide-react";

export const metadata = { title: "Finanças" };

export default function FinancasPage() {
  return (
    <div>
      <section className="bg-ink-900 text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <p className="text-xs uppercase tracking-wider text-accent-500 mb-3">
            Persysta Finanças
          </p>
          <h1 className="text-4xl md:text-5xl mb-4">
            Gestão financeira pessoal e PJ
          </h1>
          <p className="text-lg text-ink-200 max-w-2xl mx-auto">
            Receitas, despesas, metas, recorrências, importação OFX,
            relatórios. Pra quem leva controle financeiro a sério.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <p className="text-ink-600 mb-6 max-w-xl mx-auto">
            Persysta Finanças tem dashboard próprio, planos e onboarding
            independentes do Persysta Stores.
          </p>
          <a
            href="https://app.persysta.com.br"
            className="inline-flex items-center bg-ink-900 hover:bg-ink-800 text-white rounded-md px-6 py-3 font-semibold"
          >
            Acessar Persysta Finanças <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>
      </section>
    </div>
  );
}
