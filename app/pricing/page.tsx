import Link from "next/link";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preços",
  description:
    "Persysta — pague só pelo que usar. Stores, Email, Help e Finanças com planos individuais ou bundle Suite.",
};

/**
 * /pricing — página única com 4 seções (1 por produto) + bundle Suite.
 *
 * Decisões registradas (2026-05-07):
 *  - Modelo escolhido: A (página única com seções por produto + bundle)
 *    Reflete Atlassian/HubSpot pricing structure.
 *  - Valores em PLACEHOLDER ("a partir de R$ ?") exceto Finanças que já
 *    está em produção (Pricing v2: Free / Pro R$ 39,90 / Business R$ 149,90).
 *  - Bundle "Persysta Suite" no final com -20% sobre soma — placeholder
 *    pendente de definição comercial.
 *
 * Pra ativar valores reais: editar PLANS abaixo + remover badge
 * "Preço em definição" do componente Plan.
 */

interface Plan {
  name: string;
  price: string;
  priceLabel?: string;
  isPlaceholder?: boolean;
  description: string;
  features: string[];
  cta: string;
  ctaHref: string;
  highlight?: boolean;
}

interface ProductSection {
  slug: string;
  name: string;
  tagline: string;
  plans: Plan[];
}

const PRODUCTS: ProductSection[] = [
  // ─── STORES ─────────────────────────────────────────────────────
  // Valores 2026-05-07 baseados em concorrentes BR (Loja Integrada R$ 79-249,
  // Tray R$ 99-399, Nuvemshop R$ 87-349) — preço inicial mais agressivo
  // pra conquistar mercado + escala em Growth.
  // Pendente: validação user antes de publicar.
  {
    slug: "stores",
    name: "Persysta Stores",
    tagline: "Loja online, ERP e marketing num lugar só.",
    plans: [
      {
        name: "Free",
        price: "R$ 0",
        priceLabel: "/sempre",
        description: "Pra testar a plataforma com 1 loja pequena.",
        features: [
          "1 loja",
          "Até 50 produtos",
          "Pedidos ilimitados",
          "Tema padrão",
          "Suporte comunidade",
        ],
        cta: "Começar grátis",
        ctaHref: "https://accounts.persysta.com?product=stores&plan=free",
      },
      {
        name: "Starter",
        price: "R$ 49,90",
        priceLabel: "/mês",
        description: "Pra lojas em crescimento.",
        features: [
          "1 loja",
          "Produtos ilimitados",
          "Domínio próprio",
          "Temas premium",
          "Email marketing básico",
          "Suporte por email",
        ],
        cta: "Começar Starter",
        ctaHref: "https://accounts.persysta.com?product=stores&plan=starter",
        highlight: true,
      },
      {
        name: "Growth",
        price: "R$ 199,90",
        priceLabel: "/mês",
        description: "Pra lojas estabelecidas com múltiplos canais.",
        features: [
          "Lojas ilimitadas",
          "Multi-domínio (CNAME)",
          "API completa",
          "Webhooks",
          "Multi-usuário",
          "Suporte prioritário",
        ],
        cta: "Começar Growth",
        ctaHref: "https://accounts.persysta.com?product=stores&plan=growth",
      },
    ],
  },

  // ─── EMAIL ──────────────────────────────────────────────────────
  // Valores 2026-05-07 baseados em Mailchimp ($13-21 pra 5k, $59 pra 25k)
  // e Resend ($20-85). Métrica: contatos ativos. Envios ilimitados em pago.
  // Pendente: validação user.
  {
    slug: "email",
    name: "Persysta Email",
    tagline: "Email marketing profissional com A/B testing e segmentação.",
    plans: [
      {
        name: "Free",
        price: "R$ 0",
        priceLabel: "/sempre",
        description: "Pra começar a construir lista.",
        features: [
          "Até 500 contatos",
          "1.000 envios/mês",
          "Templates prontos",
          "Suporte comunidade",
        ],
        cta: "Começar grátis",
        ctaHref: "https://accounts.persysta.com?product=email&plan=free",
      },
      {
        name: "Pro",
        price: "R$ 49,90",
        priceLabel: "/mês",
        description: "Pra times que mandam campanhas regulares.",
        features: [
          "Até 5.000 contatos",
          "Envios ilimitados",
          "A/B testing",
          "Segmentação avançada",
          "Automações (drip)",
          "Suporte por email",
        ],
        cta: "Começar Pro",
        ctaHref: "https://accounts.persysta.com?product=email&plan=pro",
        highlight: true,
      },
      {
        name: "Business",
        price: "R$ 149,90",
        priceLabel: "/mês",
        description: "Pra empresas com listas grandes.",
        features: [
          "Até 25.000 contatos",
          "Multi-domínio (DKIM)",
          "Dedicated IP opcional",
          "API completa",
          "Multi-usuário",
          "Suporte prioritário",
        ],
        cta: "Começar Business",
        ctaHref: "https://accounts.persysta.com?product=email&plan=business",
      },
    ],
  },

  // ─── HELP ───────────────────────────────────────────────────────
  // Valores 2026-05-07 baseados em Movidesk (R$ 79-189/agente) e Zendesk
  // ($19-99/agente). Métrica: por agente. Free: 1 agente.
  // Pendente: validação user.
  {
    slug: "help",
    name: "Persysta Help",
    tagline: "Atendimento ao cliente: tickets, CSAT, SLA.",
    plans: [
      {
        name: "Free",
        price: "R$ 0",
        priceLabel: "/sempre",
        description: "Pra começar a organizar seu suporte.",
        features: [
          "1 agente",
          "Tickets ilimitados",
          "1 caixa de email",
          "Suporte comunidade",
        ],
        cta: "Começar grátis",
        ctaHref: "https://accounts.persysta.com?product=help&plan=free",
      },
      {
        name: "Pro",
        price: "R$ 79,90",
        priceLabel: "/agente/mês",
        description: "Pra times de suporte profissionais.",
        features: [
          "Múltiplos agentes",
          "Múltiplas caixas",
          "SLA tracking",
          "CSAT survey",
          "Macros e respostas prontas",
          "Suporte por email",
        ],
        cta: "Começar Pro",
        ctaHref: "https://accounts.persysta.com?product=help&plan=pro",
        highlight: true,
      },
      {
        name: "Business",
        price: "R$ 199,90",
        priceLabel: "/agente/mês",
        description: "Pra operações enterprise.",
        features: [
          "Tudo do Pro",
          "Multi-marca",
          "API completa",
          "SSO empresarial",
          "Relatórios avançados",
          "Suporte prioritário",
        ],
        cta: "Começar Business",
        ctaHref: "https://accounts.persysta.com?product=help&plan=business",
      },
    ],
  },

  // ─── FINANÇAS (valores REAIS — Pricing v2 já em produção) ───────
  {
    slug: "financas",
    name: "Persysta Finanças",
    tagline: "Gestão financeira pessoal e PJ: receitas, despesas, metas.",
    plans: [
      {
        name: "Free",
        price: "R$ 0",
        priceLabel: "/sempre",
        description: "Pra controle pessoal básico.",
        features: [
          "Até 200 transações",
          "1 conta bancária",
          "Categorias ilimitadas",
          "Suporte comunidade",
        ],
        cta: "Começar grátis",
        ctaHref: "https://accounts.persysta.com?product=financas&plan=free",
      },
      {
        name: "Pro",
        price: "R$ 39,90",
        priceLabel: "/mês",
        description: "Pra freelancers e pequenas empresas.",
        features: [
          "Transações ilimitadas",
          "Contas bancárias ilimitadas",
          "Lembretes automáticos",
          "Email marketing básico",
          "Multi-usuário (até 3)",
          "Suporte por email",
        ],
        cta: "Começar Pro",
        ctaHref: "https://accounts.persysta.com?product=financas&plan=pro",
        highlight: true,
      },
      {
        name: "Business",
        price: "R$ 149,90",
        priceLabel: "/mês",
        description: "Pra equipes e operações maiores.",
        features: [
          "Tudo do Pro",
          "Multi-usuário ilimitado",
          "Audit log 365 dias",
          "API completa",
          "Webhooks",
          "Suporte prioritário",
        ],
        cta: "Começar Business",
        ctaHref: "https://accounts.persysta.com?product=financas&plan=business",
      },
    ],
  },
];

export default function PricingPage() {
  return (
    <div>
      {/* ─── Hero ──────────────────────────────────────────────── */}
      <section className="bg-ink-900 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl mb-4">
            Pague só pelo que usar.
          </h1>
          <p className="text-lg text-ink-200 max-w-2xl mx-auto">
            Cada produto tem seu plano. Use um, dois ou todos — combine no
            bundle Suite e economize 20%.
          </p>
        </div>
      </section>

      {/* ─── Quick nav ─────────────────────────────────────────── */}
      <nav className="border-b border-ink-200 sticky top-16 bg-white z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex gap-6 text-sm overflow-x-auto py-3">
          {PRODUCTS.map(p => (
            <a
              key={p.slug}
              href={`#${p.slug}`}
              className="text-ink-600 hover:text-ink-900 whitespace-nowrap"
            >
              {p.name}
            </a>
          ))}
          <a
            href="#bundle"
            className="text-accent-600 hover:text-accent-700 whitespace-nowrap font-semibold"
          >
            Suite (-20%)
          </a>
        </div>
      </nav>

      {/* ─── Sections por produto ─────────────────────────────── */}
      {PRODUCTS.map(product => (
        <section
          key={product.slug}
          id={product.slug}
          className="py-16 md:py-20 even:bg-ink-50"
        >
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <header className="mb-10 text-center">
              <h2 className="font-serif text-3xl md:text-4xl mb-2">
                {product.name}
              </h2>
              <p className="text-ink-600">{product.tagline}</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {product.plans.map(plan => (
                <PlanCard key={plan.name} plan={plan} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ─── Bundle Suite ─────────────────────────────────────── */}
      <section
        id="bundle"
        className="py-20 md:py-28 bg-ink-900 text-white"
      >
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-accent-500/20 text-accent-300 rounded-full px-4 py-1.5 text-xs font-semibold mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            Use tudo, pague menos
          </div>
          <h2 className="font-serif text-3xl md:text-5xl mb-4">
            Persysta Suite
          </h2>
          <p className="text-lg text-ink-200 max-w-2xl mx-auto mb-8">
            Stores + Email + Help + Finanças no mesmo plano, com{" "}
            <strong className="text-white">20% de desconto</strong> sobre a
            soma dos planos individuais.
          </p>

          <div className="bg-ink-800 rounded-xl p-8 max-w-md mx-auto mb-8">
            <p className="text-ink-300 text-sm mb-1">Pro de tudo</p>
            <p className="font-serif text-5xl mb-1">
              R$ 175,68
              <span className="text-base text-ink-300 font-sans"> /mês</span>
            </p>
            <p className="text-xs text-ink-400 mb-1">
              Equivale a Pro de cada produto, -20%.
            </p>
            <p className="text-xs text-ink-500 mb-6">
              Soma individual: R$ 219,60/mês. Você economiza R$ 43,92/mês.
            </p>
            <Link
              href="https://accounts.persysta.com?product=suite"
              className="inline-flex items-center bg-accent-500 hover:bg-accent-600 text-ink-900 rounded-md px-6 py-3 font-semibold w-full justify-center"
            >
              Começar Suite
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          <p className="text-sm text-ink-400">
            Inclui todos os recursos Pro de cada produto. Cancele quando
            quiser.
          </p>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <h2 className="font-serif text-3xl mb-8 text-center">
            Perguntas frequentes
          </h2>
          <div className="space-y-6">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="border-b border-ink-200 pb-6">
                <h3 className="font-semibold mb-2">{q}</h3>
                <p className="text-ink-600 text-sm">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={`rounded-xl p-6 border ${
        plan.highlight
          ? "border-accent-500 bg-white shadow-lg ring-1 ring-accent-500"
          : "border-ink-200 bg-white"
      }`}
    >
      {plan.highlight && (
        <div className="text-xs font-semibold text-accent-600 mb-2 uppercase tracking-wider">
          Mais popular
        </div>
      )}
      <h3 className="font-serif text-2xl mb-1">{plan.name}</h3>
      <p className="text-sm text-ink-600 mb-4 min-h-[2.5em]">
        {plan.description}
      </p>

      <div className="mb-5">
        <span className="font-serif text-4xl">{plan.price}</span>
        {plan.priceLabel && (
          <span className="text-ink-500 text-sm">{plan.priceLabel}</span>
        )}
        {plan.isPlaceholder && (
          <p className="text-xs text-amber-600 mt-1">⚠ Preço em definição</p>
        )}
      </div>

      <ul className="space-y-2 mb-6 text-sm">
        {plan.features.map(feat => (
          <li key={feat} className="flex items-start gap-2">
            <Check className="w-4 h-4 text-accent-500 shrink-0 mt-0.5" />
            <span className="text-ink-700">{feat}</span>
          </li>
        ))}
      </ul>

      <a
        href={plan.ctaHref}
        className={`inline-flex items-center justify-center w-full rounded-md px-4 py-2.5 text-sm font-semibold ${
          plan.highlight
            ? "bg-accent-500 hover:bg-accent-600 text-ink-900"
            : "border border-ink-300 hover:bg-ink-50 text-ink-900"
        }`}
      >
        {plan.cta}
      </a>
    </div>
  );
}

const FAQ = [
  {
    q: "Posso usar só um produto, sem o pacote?",
    a: "Sim. Cada produto tem planos individuais. Você só contrata o Suite se quiser usar pelo menos 2 deles e quiser desconto.",
  },
  {
    q: "O plano Free é grátis pra sempre?",
    a: "Sim. O Free não expira. Você pode usar pra sempre dentro dos limites listados. Quando precisar de mais, sobe pro Pro.",
  },
  {
    q: "Posso cancelar quando quiser?",
    a: "Sim, sem multa nem fidelidade. Você cancela direto no painel da sua conta. Acesso fica liberado até o fim do ciclo já pago.",
  },
  {
    q: "Como funciona o desconto do Suite?",
    a: "Suite = soma do plano Pro de cada produto, com 20% de desconto. Por exemplo, se cada Pro custa R$ X individualmente, Suite custa 0.8 × (X+X+X+X) por mês.",
  },
  {
    q: "Aceitam Pix? Cartão? Boleto?",
    a: "Cartão de crédito e Pix recorrente via Stripe. Boleto sob demanda pra planos Business.",
  },
  {
    q: "Tem desconto anual?",
    a: "Sim. Pagamento anual paga 10 meses (16% off) — mesmo no Suite, se quiser potencializar.",
  },
];
