import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Persysta", template: "%s — Persysta" },
  description:
    "Persysta — software multi-tenant pra gestão. Finanças, lojas online, email marketing, atendimento ao cliente.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="border-b border-ink-200">
          <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
            <Link href="/" className="font-serif text-xl font-semibold">
              Persysta
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link href="/stores" className="text-ink-700 hover:text-ink-900">
                Stores
              </Link>
              <Link href="/email" className="text-ink-700 hover:text-ink-900">
                Email
              </Link>
              <Link href="/help" className="text-ink-700 hover:text-ink-900">
                Help
              </Link>
              <Link href="/financas" className="text-ink-700 hover:text-ink-900">
                Finanças
              </Link>
              <a
                href="https://app.persysta.com.br"
                className="btn-secondary text-xs"
              >
                Login
              </a>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="mt-20 border-t border-ink-200 py-10 text-sm text-ink-500">
          <div className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <h4 className="font-semibold text-ink-900 mb-2">Persysta</h4>
              <p>Plataforma SaaS multi-produto pra gestão de negócios.</p>
            </div>
            <div>
              <h4 className="font-semibold text-ink-900 mb-2">Produtos</h4>
              <ul className="space-y-1">
                <li><Link href="/stores" className="hover:text-ink-900">Stores</Link></li>
                <li><Link href="/email" className="hover:text-ink-900">Email</Link></li>
                <li><Link href="/help" className="hover:text-ink-900">Help</Link></li>
                <li><Link href="/financas" className="hover:text-ink-900">Finanças</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-ink-900 mb-2">Empresa</h4>
              <ul className="space-y-1">
                <li><Link href="/sobre" className="hover:text-ink-900">Sobre</Link></li>
                <li><Link href="/contato" className="hover:text-ink-900">Contato</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-ink-900 mb-2">Legal</h4>
              <ul className="space-y-1">
                <li><Link href="/termos" className="hover:text-ink-900">Termos</Link></li>
                <li><Link href="/privacidade" className="hover:text-ink-900">Privacidade</Link></li>
              </ul>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-4 md:px-6 mt-8 text-xs text-ink-400">
            © {new Date().getFullYear()} Persysta. Todos os direitos reservados.
          </div>
        </footer>
      </body>
    </html>
  );
}
