import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a Persysta trata seus dados pessoais. LGPD-compliant.",
};

/**
 * /privacidade — Política de Privacidade (LGPD).
 *
 * PLACEHOLDER — base estruturada conforme LGPD (Lei 13.709/2018) +
 * práticas comuns SaaS BR. Versão final precisa de revisão por DPO ou
 * advogado especializado.
 *
 * Seções obrigatórias LGPD:
 *  - Quais dados coletamos
 *  - Por que coletamos (finalidade)
 *  - Base legal (consentimento, contrato, legítimo interesse)
 *  - Com quem compartilhamos (subprocessadores)
 *  - Direitos do titular (Art. 18)
 *  - Como exercer direitos
 *  - Como contatar o DPO
 *  - Cookies
 *  - Retenção
 *  - Transferência internacional (se houver)
 */
export default function PrivacidadePage() {
  return (
    <div>
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <h1 className="font-serif text-4xl mb-2">Política de Privacidade</h1>
          <p className="text-sm text-ink-500 mb-12">
            Última atualização: {/* PLACEHOLDER */} [data — preencher]
          </p>

          <div className="space-y-8 text-ink-700">
            <Notice />

            <section>
              <h2 className="font-serif text-2xl mb-3">Em resumo</h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <strong className="text-ink-900">Coletamos só o necessário</strong> pra
                  você usar nossos produtos.
                </li>
                <li>
                  <strong className="text-ink-900">Não vendemos seus dados</strong> nunca.
                </li>
                <li>
                  <strong className="text-ink-900">Você tem direitos</strong> garantidos
                  pela LGPD — explicamos abaixo como exercê-los.
                </li>
                <li>
                  <strong className="text-ink-900">Subprocessadores</strong> listados
                  abaixo (Stripe, Resend, Cloudflare, Sentry).
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl mb-3">1. Dados que coletamos</h2>
              <ul className="space-y-2 list-disc pl-5 text-sm">
                <li>
                  <strong>Cadastro:</strong> nome, email, senha (hash), CPF/CNPJ
                  se aplicável.
                </li>
                <li>
                  <strong>Pagamento:</strong> dados processados diretamente pela
                  Stripe — não armazenamos número de cartão.
                </li>
                <li>
                  <strong>Uso da plataforma:</strong> logs de acesso, ações em
                  audit_log, métricas de uso.
                </li>
                <li>
                  <strong>Conteúdo seu:</strong> dados que você adiciona (transações
                  financeiras, produtos da loja, lista de contatos, tickets etc.) — só
                  você acessa.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl mb-3">2. Por que coletamos</h2>
              <ul className="space-y-2 list-disc pl-5 text-sm">
                <li>Operar a plataforma (autenticação, billing, features).</li>
                <li>Suporte técnico quando você pede ajuda.</li>
                <li>Melhorar produtos via métricas agregadas/anônimas.</li>
                <li>Cumprir obrigações legais (notas fiscais, retenções).</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl mb-3">
                3. Subprocessadores
              </h2>
              <p className="text-sm mb-3">
                Pra operar, usamos serviços terceirizados que têm acesso
                limitado a alguns dados:
              </p>
              <ul className="space-y-2 list-disc pl-5 text-sm">
                <li>
                  <strong>Stripe</strong> (pagamentos) — EUA, certificada PCI-DSS
                </li>
                <li>
                  <strong>Resend</strong> (envio de email transacional)
                </li>
                <li>
                  <strong>Cloudflare</strong> (CDN, proteção DDoS)
                </li>
                <li>
                  <strong>Railway</strong> (hospedagem da aplicação)
                </li>
                <li>
                  <strong>Backblaze B2</strong> (backup do banco de dados)
                </li>
                <li>
                  <strong>Sentry</strong> (monitoramento de erros)
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl mb-3">
                4. Seus direitos (LGPD Art. 18)
              </h2>
              <ul className="space-y-2 list-disc pl-5 text-sm">
                <li>Confirmação de existência de tratamento</li>
                <li>Acesso aos seus dados</li>
                <li>Correção de dados incompletos/desatualizados</li>
                <li>Anonimização, bloqueio ou eliminação</li>
                <li>Portabilidade pra outro fornecedor</li>
                <li>Eliminação de dados tratados com seu consentimento</li>
                <li>Informação sobre subprocessadores</li>
                <li>Revogação de consentimento</li>
              </ul>
              <p className="text-sm mt-3">
                Pra exercer:{" "}
                <a
                  href="mailto:dpo@persysta.com"
                  className="text-accent-600 hover:underline"
                >
                  dpo@persysta.com
                </a>
                . Resposta em até 15 dias.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl mb-3">5. Cookies</h2>
              <p className="text-sm">
                Usamos cookies essenciais (sessão, preferências) e analytics
                anônimos. Sem cookies de terceiros pra publicidade.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl mb-3">6. Retenção</h2>
              <p className="text-sm">
                Dados de conta ficam mantidos enquanto a conta estiver ativa
                e por mais 5 anos após cancelamento (obrigação legal). Logs
                de auditoria conforme retenção do plano contratado.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl mb-3">DPO</h2>
              <p className="text-sm">
                Encarregado de Proteção de Dados (DPO):{" "}
                {/* PLACEHOLDER */}
                [Nome — preencher].{" "}
                <a
                  href="mailto:dpo@persysta.com"
                  className="text-accent-600 hover:underline"
                >
                  dpo@persysta.com
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
    <div className="bg-amber-50 border border-amber-300 rounded-lg p-4 text-sm text-amber-900">
      ⚠ <strong>Documento em rascunho.</strong> Versão final precisa ser
      revisada por DPO ou advogado especializado em LGPD. Texto atual é
      placeholder pra estruturação do site.
    </div>
  );
}
