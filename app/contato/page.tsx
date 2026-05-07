import type { Metadata } from "next";
import { Mail, MessageSquare, FileQuestion } from "lucide-react";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com a Persysta — vendas, suporte, parcerias.",
};

/**
 * /contato — canais de contato.
 *
 * Por enquanto sem formulário — só links mailto pros canais. Quando
 * volume justificar, trocar por form com backend real (ou Formspree).
 */
export default function ContatoPage() {
  return (
    <div>
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Fale com a gente</h1>
          <p className="text-lg text-ink-600 mb-12">
            Escolha o canal que faz sentido pro seu caso.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <ContactCard
              icon={MessageSquare}
              title="Suporte"
              desc="Já é cliente e precisa de ajuda? Use o Help Center."
              cta="Abrir um ticket"
              href="https://help.persysta.com"
              note="Resposta em até 1 dia útil."
            />
            <ContactCard
              icon={Mail}
              title="Vendas"
              desc="Quer entender se a Persysta serve pro seu negócio?"
              cta="contato@persysta.com"
              href="mailto:contato@persysta.com"
              note="Resposta em até 1 dia útil."
            />
            <ContactCard
              icon={Mail}
              title="Parcerias"
              desc="Integrações, revenda, programa de afiliados."
              cta="parcerias@persysta.com"
              href="mailto:parcerias@persysta.com"
              note=""
            />
            <ContactCard
              icon={FileQuestion}
              title="Imprensa"
              desc="Solicitação de entrevistas, materiais de imprensa."
              cta="press@persysta.com"
              href="mailto:press@persysta.com"
              note=""
            />
          </div>

          <div className="mt-12 p-6 bg-ink-50 rounded-lg border border-ink-200 text-sm text-ink-600">
            <p>
              <strong className="text-ink-900">Endereço:</strong>{" "}
              {/* PLACEHOLDER — preencher com endereço real */}
              [Endereço sede — preencher]
            </p>
            <p className="mt-2">
              <strong className="text-ink-900">CNPJ:</strong>{" "}
              {/* PLACEHOLDER */}
              [CNPJ — preencher]
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

interface ContactCardProps {
  icon: typeof Mail;
  title: string;
  desc: string;
  cta: string;
  href: string;
  note: string;
}

function ContactCard({
  icon: Icon,
  title,
  desc,
  cta,
  href,
  note,
}: ContactCardProps) {
  return (
    <div className="rounded-lg border border-ink-200 p-6 hover:border-ink-300 transition">
      <Icon className="w-6 h-6 text-accent-500 mb-3" />
      <h3 className="font-serif text-xl mb-1">{title}</h3>
      <p className="text-sm text-ink-600 mb-4">{desc}</p>
      <a
        href={href}
        className="text-accent-600 hover:text-accent-700 font-semibold text-sm"
      >
        {cta} →
      </a>
      {note && <p className="text-xs text-ink-500 mt-2">{note}</p>}
    </div>
  );
}
