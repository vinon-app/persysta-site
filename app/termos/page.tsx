import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos de uso dos produtos Persysta.",
};

/**
 * /termos — Termos de Uso.
 *
 * PLACEHOLDER — texto base que precisa ser revisado por advogado antes
 * de ir pra prod. Não é orientação jurídica.
 *
 * Estrutura padrão SaaS BR:
 *  1. Aceitação
 *  2. Objeto
 *  3. Cadastro e contas
 *  4. Pagamento e assinatura
 *  5. Cancelamento
 *  6. Responsabilidades do usuário
 *  7. Responsabilidades da Persysta
 *  8. Propriedade intelectual
 *  9. LGPD (cross-link com /privacidade)
 *  10. Limitação de responsabilidade
 *  11. Foro
 */
export default function TermosPage() {
  return (
    <div>
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <h1 className="font-serif text-4xl mb-2">Termos de Uso</h1>
          <p className="text-sm text-ink-500 mb-12">
            Última atualização: {/* PLACEHOLDER */} [data — preencher]
          </p>

          <div className="prose prose-ink max-w-none space-y-8 text-ink-700">
            <Notice />

            <section>
              <h2 className="font-serif text-2xl mb-3">1. Aceitação</h2>
              <p>
                Ao usar qualquer produto da família Persysta (Stores, Email,
                Help, Finanças), você concorda com estes Termos. Se não
                concorda, não use os serviços.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl mb-3">2. Cadastro e contas</h2>
              <p>
                Pra usar a plataforma você precisa criar uma conta com email
                válido. Você é responsável por manter a senha em sigilo. Conta
                pode ser suspensa por uso inadequado, fraude ou violação
                destes Termos.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl mb-3">
                3. Pagamento e assinatura
              </h2>
              <p>
                Planos pagos são cobrados mensalmente ou anualmente conforme
                escolha. Pagamento via cartão de crédito ou Pix. Reembolso
                segue regra do produto contratado e do código de defesa do
                consumidor.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl mb-3">4. Cancelamento</h2>
              <p>
                Você pode cancelar a qualquer momento direto no painel da sua
                conta. Acesso fica liberado até o fim do ciclo já pago. Não há
                multa nem fidelidade.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl mb-3">5. Privacidade e LGPD</h2>
              <p>
                Tratamento de dados pessoais segue nossa{" "}
                <a href="/privacidade" className="text-accent-600 hover:underline">
                  Política de Privacidade
                </a>{" "}
                e a Lei Geral de Proteção de Dados (LGPD).
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl mb-3">6. Foro</h2>
              <p>
                Foro da comarca de {/* PLACEHOLDER */} [cidade — preencher],
                Brasil, pra dirimir questões relacionadas a estes Termos.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl mb-3">Contato</h2>
              <p>
                Dúvidas sobre estes Termos:{" "}
                <a
                  href="mailto:juridico@persysta.com"
                  className="text-accent-600 hover:underline"
                >
                  juridico@persysta.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}

function Notice() {
  return (
    <div className="bg-amber-50 border border-amber-300 rounded-lg p-4 text-sm text-amber-900 not-prose">
      ⚠ <strong>Documento em rascunho.</strong> Versão final precisa ser
      revisada por advogado. Texto atual é placeholder pra estruturação do
      site.
    </div>
  );
}
