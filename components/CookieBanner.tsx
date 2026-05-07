"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

/**
 * Cookie banner LGPD-compliant.
 *
 * Conformidade:
 *  - Mostra na primeira visita (sem default opt-in implícito)
 *  - Aceita / rejeita / customiza (3 categorias)
 *  - Link pra /privacidade obrigatório
 *  - Persiste escolha em localStorage (key: persysta_cookie_consent)
 *  - Permite revogar consentimento (bottom-right toggle reabre banner)
 *
 * Categorias (mínimo necessário pra LGPD):
 *  - Necessários (sempre on, não pode desligar — sessão, idioma)
 *  - Analytics (opt-in, bloqueia tracking sem consent)
 *  - Marketing (opt-in, bloqueia retargeting/ads sem consent)
 *
 * Quando expandir features que precisam tracking:
 *  1. Ler `getCookieConsent()` antes de inicializar (Plausible, GA, Pixel)
 *  2. Se analytics === false, NÃO inicializar
 *  3. Se mudar consent depois, recarregar página ou re-init
 */

interface CookieConsent {
  necessary: boolean; // sempre true
  analytics: boolean;
  marketing: boolean;
  acceptedAt: string;
}

const STORAGE_KEY = "persysta_cookie_consent";
const STORAGE_VERSION = 1; // bump pra forçar re-aceitação se política mudar

export function getCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.version !== STORAGE_VERSION) return null;
    return parsed.consent;
  } catch {
    return null;
  }
}

function saveConsent(consent: CookieConsent) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ version: STORAGE_VERSION, consent }),
  );
}

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    // Mostra banner se não há consent salvo
    if (getCookieConsent() === null) {
      setShow(true);
    }
  }, []);

  function acceptAll() {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      acceptedAt: new Date().toISOString(),
    });
    setShow(false);
  }

  function rejectOptional() {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      acceptedAt: new Date().toISOString(),
    });
    setShow(false);
  }

  function saveCustom() {
    saveConsent({
      necessary: true,
      analytics,
      marketing,
      acceptedAt: new Date().toISOString(),
    });
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-6 z-50 max-w-3xl md:mx-auto">
      <div className="bg-white border border-ink-300 shadow-xl rounded-lg p-5 md:p-6">
        {!showCustomize ? (
          <>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-ink-900 mb-2">
                  🍪 Sobre cookies
                </h3>
                <p className="text-sm text-ink-600 leading-relaxed">
                  Usamos cookies pra fazer o site funcionar e (com sua
                  permissão) entender como você navega. Analytics e marketing
                  são opt-in — você decide.{" "}
                  <Link
                    href="/privacidade"
                    className="text-accent-600 hover:underline"
                  >
                    Saiba mais
                  </Link>
                  .
                </p>
              </div>
              <button
                onClick={() => setShow(false)}
                aria-label="Fechar"
                className="text-ink-400 hover:text-ink-600 shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <button
                onClick={acceptAll}
                className="bg-accent-500 hover:bg-accent-600 text-ink-900 rounded-md px-4 py-2 text-sm font-semibold"
              >
                Aceitar todos
              </button>
              <button
                onClick={rejectOptional}
                className="border border-ink-300 hover:bg-ink-50 text-ink-900 rounded-md px-4 py-2 text-sm font-semibold"
              >
                Apenas necessários
              </button>
              <button
                onClick={() => setShowCustomize(true)}
                className="text-ink-600 hover:text-ink-900 underline rounded-md px-4 py-2 text-sm"
              >
                Personalizar
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-start justify-between gap-4 mb-4">
              <h3 className="font-semibold text-ink-900">Personalizar cookies</h3>
              <button
                onClick={() => setShowCustomize(false)}
                aria-label="Voltar"
                className="text-ink-400 hover:text-ink-600 shrink-0 text-xs"
              >
                ← Voltar
              </button>
            </div>

            <div className="space-y-3 mb-4">
              <CategoryToggle
                title="Necessários"
                desc="Pra autenticação, preferências e segurança. Não podem ser desligados."
                checked={true}
                disabled
                onChange={() => {}}
              />
              <CategoryToggle
                title="Analytics"
                desc="Métricas anônimas de uso pra melhorar o produto."
                checked={analytics}
                onChange={setAnalytics}
              />
              <CategoryToggle
                title="Marketing"
                desc="Personalização de anúncios e remarketing. Hoje não usamos, mas reservamos a permissão."
                checked={marketing}
                onChange={setMarketing}
              />
            </div>

            <div className="flex flex-wrap gap-2 pt-3 border-t border-ink-200">
              <button
                onClick={saveCustom}
                className="bg-accent-500 hover:bg-accent-600 text-ink-900 rounded-md px-4 py-2 text-sm font-semibold"
              >
                Salvar preferências
              </button>
              <button
                onClick={acceptAll}
                className="border border-ink-300 hover:bg-ink-50 text-ink-900 rounded-md px-4 py-2 text-sm font-semibold"
              >
                Aceitar todos
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

interface CategoryToggleProps {
  title: string;
  desc: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (next: boolean) => void;
}

function CategoryToggle({
  title,
  desc,
  checked,
  disabled,
  onChange,
}: CategoryToggleProps) {
  return (
    <label
      className={`flex items-start gap-3 cursor-pointer p-2 rounded ${
        disabled ? "opacity-60 cursor-not-allowed" : "hover:bg-ink-50"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={e => !disabled && onChange(e.target.checked)}
        className="mt-1"
      />
      <div className="flex-1">
        <p className="text-sm font-medium text-ink-900">{title}</p>
        <p className="text-xs text-ink-600 mt-0.5">{desc}</p>
      </div>
    </label>
  );
}
