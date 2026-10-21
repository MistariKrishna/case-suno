"use client";

import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { LEGAL_DOCS, LEGAL_ORDER } from "../lib/legal";

interface FooterProps {
  onOpenAbout: () => void;
  onOpenResources: () => void;
  onOpenFaq: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAbout, onOpenResources, onOpenFaq, onOpenContact }) => {
  const { t, language } = useLanguage();

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else scrollTop();
  };

  const marker =
    language === "gu"
      ? "ઓનલાઇન અને એપોઇન્ટમેન્ટ આધારિત સહાય"
      : language === "hi"
        ? "ऑनलाइन एवं अपॉइंटमेंट आधारित सहायता"
        : "Online & Appointment-Based Assistance";

  const links = [
    { key: "home", label: t.nav.home, action: scrollTop },
    { key: "services", label: t.nav.services, action: () => scrollTo("services") },
    { key: "about", label: t.nav.about, action: onOpenAbout },
    { key: "resources", label: t.nav.resources, action: onOpenResources },
    { key: "faq", label: t.nav.faq, action: onOpenFaq },
    { key: "contact", label: t.nav.contact, action: onOpenContact },
  ];

  const legalLabel = (type: (typeof LEGAL_ORDER)[number]) =>
    type === "privacy" ? t.footer.privacy : type === "terms" ? t.footer.terms : t.footer.disclaimer;

  const socialClass =
    "flex h-8 w-8 items-center justify-center rounded-full bg-[#EFECE5] text-[#4A463E] transition-all duration-200 hover:bg-[#1E1D1A] hover:text-white hover:-translate-y-1 hover:shadow-md active:scale-90";

  return (
    <footer className="w-full bg-[#FAF9F6] text-[#3E3A33] pt-12 sm:pt-14 pb-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-10 border-b border-[#E8E4DB]">
          <button
            type="button"
            onClick={scrollTop}
            aria-label="Back to top"
            className="self-start cursor-pointer transition-transform duration-200 hover:scale-[1.03] active:scale-95"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="CASE SUNO Logo" className="h-20 w-auto" />
          </button>

          <nav className="flex flex-wrap items-center gap-5 sm:gap-7 text-[13px] font-medium text-[#524D45]" aria-label="Footer Navigation">
            {links.map((l) => (
              <button
                key={l.key}
                type="button"
                onClick={l.action}
                className="nav-link-underline hover:text-[#1A1917] transition-colors py-1 cursor-pointer"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-6">
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/share/1CJHQMZB2D/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={socialClass}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                  <path d="M14 8h3V4h-3c-2.76 0-5 2.24-5 5v3H6v4h3v6h4v-6h3l1-4h-4V9c0-.55.45-1 1-1Z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/casesuno.in/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={socialClass}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>
            </div>
            <p className="text-[11.5px] text-[#787268] tabular-nums">{t.footer.rights}</p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#787268]">
          <div className="flex items-center gap-3 flex-wrap">
            {LEGAL_ORDER.map((type, i) => (
              <React.Fragment key={type}>
                {i > 0 && <span aria-hidden="true">|</span>}
                <a
                  href={LEGAL_DOCS[type].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link-underline hover:text-[#1A1917] transition-colors cursor-pointer"
                >
                  {legalLabel(type)}
                </a>
              </React.Fragment>
            ))}
          </div>
          <div className="flex items-center gap-2 text-left sm:text-right">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" aria-hidden="true" />
            {marker}
          </div>
        </div>
      </div>
    </footer>
  );
};