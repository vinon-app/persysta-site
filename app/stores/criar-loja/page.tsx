import { Suspense } from "react";
import { SignupForm } from "@/components/SignupForm";

export const metadata = {
  title: "Criar loja",
  description: "Crie sua loja online em 5 minutos. 14 dias grátis.",
};

export default function CriarLojaPage() {
  return (
    <div className="bg-ink-50 min-h-[calc(100vh-4rem)]">
      <section className="max-w-2xl mx-auto px-4 md:px-6 py-10 md:py-14">
        <header className="text-center mb-8">
          <p className="text-xs uppercase tracking-wider text-accent-600 mb-2">
            Persysta Stores
          </p>
          <h1 className="text-3xl md:text-4xl mb-3">Crie sua loja</h1>
          <p className="text-ink-600">
            14 dias grátis. Sem cartão. Cancele quando quiser.
          </p>
        </header>

        <Suspense
          fallback={<div className="text-center text-ink-500">Carregando…</div>}
        >
          <SignupForm
            product="stores"
            slugLabel="Subdomínio da sua loja"
            slugPlaceholder="minha-loja"
            companyLabel="Nome da loja"
            companyPlaceholder="Adega da Maria"
            redirectTo="admin"
          />
        </Suspense>
      </section>
    </div>
  );
}
