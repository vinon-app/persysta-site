import Link from "next/link";
import { ShoppingBag, Mail, LifeBuoy, Wallet, ArrowRight } from "lucide-react";

const PRODUCTS = [
  {
    slug: "stores",
    name: "Persysta Stores",
    desc: "Loja online completa: catálogo, pedidos, ERP, marketing.",
    icon: ShoppingBag,
    cta: "Conhecer Stores",
    href: "/stores",
  },
  {
    slug: "email",
    name: "Persysta Email",
    desc: "Email marketing profissional com A/B testing e segmentação.",
    icon: Mail,
    cta: "Conhecer Email",
    href: "/email",
  },
  {
    slug: "help",
    name: "Persysta Help",
    desc: "Atendimento ao cliente: tickets, CSAT, SLA.",
    icon: LifeBuoy,
    cta: "Conhecer Help",
    href: "/help",
  },
  {
    slug: "financas",
    name: "Persysta Finanças",
    desc: "Gestão financeira pessoal e PJ: receitas, despesas, metas.",
    icon: Wallet,
    cta: "Conhecer Finanças",
    href: "/financas",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="bg-ink-900 text-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h1 className="font-serif text-4xl md:text-6xl mb-5 leading-tight">
            Software pra rodar seu negócio.
          </h1>
          <p className="text-lg md:text-xl text-ink-200 mb-8 max-w-2xl mx-auto">
            Persysta é uma família de produtos SaaS pra gestão. Use um, use
            todos. <strong className="text-white">14 dias grátis</strong>, sem cartão.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/stores"
              className="inline-flex items-center bg-accent-500 hover:bg-accent-600 text-ink-900 rounded-md px-6 py-3 font-semibold"
            >
              Começar com Stores
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="#produtos"
              className="inline-flex items-center border border-ink-700 hover:bg-ink-800 text-white rounded-md px-6 py-3 font-semibold"
            >
              Ver todos os produtos
            </Link>
          </div>
        </div>
      </section>

      <section id="produtos" className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <header className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-3">Nossos produtos</h2>
            <p className="text-ink-600 max-w-xl mx-auto">
              Cada produto resolve um problema. Combine os que fazem sentido
              pro seu negócio.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PRODUCTS.map((p) => (
              <Link
                key={p.slug}
                href={p.href}
                className="border border-ink-200 rounded-lg p-6 hover:border-ink-900 transition group"
              >
                <p.icon className="w-8 h-8 mb-3 text-accent-600" />
                <h3 className="text-xl mb-2">{p.name}</h3>
                <p className="text-sm text-ink-600 mb-4">{p.desc}</p>
                <span className="inline-flex items-center text-sm font-semibold text-ink-900 group-hover:underline">
                  {p.cta}
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink-50 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl mb-3">
            Por que produtos separados?
          </h2>
          <p className="text-ink-600 max-w-2xl mx-auto">
            Você só paga pelo que usa. Cada produto tem preços próprios e
            funciona standalone. Mas se quiser tudo junto, oferecemos bundles
            com desconto.
          </p>
        </div>
      </section>
    </div>
  );
}
