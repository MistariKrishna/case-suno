"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, Download, CheckCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { ModalShell, ModalCloseButton } from "./ModalShell";

interface ResourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartEnquiry: () => void;
}

export const ResourcesModal: React.FC<ResourcesModalProps> = ({ isOpen, onClose, onStartEnquiry }) => {
  const [downloadedItem, setDownloadedItem] = useState<string | null>(null);
  const { language } = useLanguage();
  const isGu = language === "gu";
  const isHi = language === "hi";
  const L = (en: string, hi: string, gu: string) => (isGu ? gu : isHi ? hi : en);

  // Auto-hide the toast and clean up the timer
  useEffect(() => {
    if (!downloadedItem) return;
    const timer = setTimeout(() => setDownloadedItem(null), 3000);
    return () => clearTimeout(timer);
  }, [downloadedItem]);

  if (!isOpen) return null;
  const headingFont = isGu || isHi ? "font-sans font-semibold" : "font-serif";

  const checklists = [
    {
      id: "property",
      title: L("Property & Land Title Verification Checklist", "संपत्ति एवं भूमि टाइटल सत्यापन चेकलिस्ट", "મિલકત અને જમીન ટાઇટલ ચકાસણી ચેકલિસ્ટ"),
      category: L("Documentation", "दस्तावेज़ीकरण", "દસ્તાવેજીકરણ"),
      pages: L("4 Pages", "४ पृष्ठ", "૪ પાના"),
      desc: L(
        "Complete index of 7/12 extracts, index-II, municipal taxes, non-encumbrance certificates, and mutation entries required before purchasing or settling property.",
        "७/१२ उद्धरण, इंडेक्स-२, नगर निगम कर रसीदें, भारमुक्ति प्रमाणपत्र और दाखिल-खारिज प्रविष्टियों की संपूर्ण सूची।",
        "૭/૧૨ ના ઉતારા, ઈન્ડેક્સ-૨, મ્યુનિસિપલ વેરા બિલ, બોજા મુક્તિ પ્રમાણપત્ર અને હક્કપત્રક નોંધોની સંપૂર્ણ યાદી.",
      ),
    },
    {
      id: "legal-notice",
      title: L("Guide to Receiving a Legal Notice: Do’s & Don’ts", "कानूनी नोटिस प्राप्त होने पर क्या करें और क्या न करें", "કાનૂની નોટિસ મળવા પર શું કરવું અને શું ન કરવું"),
      category: L("Individual Assistance", "व्यक्तिगत सहायता", "વ્યક્તિગત સહાય"),
      pages: L("3 Pages", "३ पृष्ठ", "૩ પાના"),
      desc: L(
        "Step-by-step checklist on timelines, preserved envelopes, avoiding emotional responses, and preparing structured factual points for legal reply.",
        "समयसीमा का ध्यान, डाक लिफाफा संभालना, जल्दबाजी में उत्तर न देना और वकील के लिए बिंदुवार तथ्य तैयार करना।",
        "સમયમર્યાદા, પોસ્ટ કવર સાચવવું, આવેશમાં જવાબ ન આપવો અને વકીલ માટે મુદ્દાસર હકીકતો તૈયાર કરવાની માર્ગદર્શિકા.",
      ),
    },
    {
      id: "msme-recovery",
      title: L("MSME Vendor Payment Recovery Framework", "MSME विक्रेता भुगतान वसूली रूपरेखा", "MSME વેપારી પેમેન્ટ રિકવરી ફ્રેમવર્ક"),
      category: L("Business Support", "व्यापार सहायता", "વ્યવસાય સહાય"),
      pages: L("5 Pages", "५ पृष्ठ", "૫ પાના"),
      desc: L(
        "Documentation structure for commercial invoices, e-way bills, MSME Samadhaan conciliation filing requirements, and statutory interest calculations.",
        "वाणिज्यिक चालान (Invoice), ई-वे बिल, MSME समाधान पोर्टल पर आवेदन और वैधानिक ब्याज गणना की मार्गदर्शिका।",
        "વાણિજ્યિક ઇન્વોઇસ, ઇ-વે બિલ, MSME સમાધાન પોર્ટલ અરજી અને વ્યાજ ગણતરી માટેનું સંગઠિત માળખું.",
      ),
    },
    {
      id: "family-settlement",
      title: L("Family Asset Division & Settlement Inventory Sheet", "पारिवारिक संपत्ति विभाजन एवं इन्वेंट्री प्रारूप", "કૌટુંબિક મિલકત વહેંચણી અને ઈન્વેન્ટરી શીટ"),
      category: L("Family & Estate", "पारिवारिक एवं वसीयत", "વારસાઈ અને મિલકત"),
      pages: L("6 Pages", "६ पृष्ठ", "૬ પાના"),
      desc: L(
        "A calm, structured template to catalog movable, immovable, and digital assets with clear documentation proof to avert contentious disputes.",
        "चल, अचल और वित्तीय संपत्तियों की पारदर्शी सूची जिससे पारिवारिक मतभेदों को शांतिपूर्ण ढंग से सुलझाया जा सके।",
        "જંગમ, સ્થાવર અને નાણાકીય અસ્કયામતોની વ્યવસ્થિત નોંધણી જેથી કૌટુંબિક વિવાદો ટાળી શકાય.",
      ),
    },
  ];

  const handleClose = () => {
    setDownloadedItem(null);
    onClose();
  };

  return (
    <ModalShell onClose={handleClose} ariaLabel="Resources">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-[#E8E4DB] bg-white">
        <div>
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#8C8479] uppercase block">
            {L("Knowledge Repository", "ज्ञान भंडार और चेकलिस्ट्स", "જ્ઞાન ભંડાર અને માર્ગદર્શિકા")}
          </span>
          <h3 className={`text-xl sm:text-2xl text-[#1E1D1A] ${headingFont}`}>
            {L("Resources & Checklists", "संसाधन और चेकलिस्ट्स", "રિસોર્સિસ અને ચેકલિસ્ટ્સ")}
          </h3>
        </div>
        <ModalCloseButton onClick={handleClose} />
      </div>

      <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
        <p className="text-xs text-[#5C564C] leading-relaxed">
          {L(
            "Free, practical checklists and preparation toolkits prepared by CASE SUNO to help you organize facts before consulting professionals.",
            "विशेषज्ञों के पास जाने से पहले अपने तथ्यों और कागजातों को व्यवस्थित करने के लिए CASE SUNO द्वारा तैयार निःशुल्क चेकलिस्ट्स।",
            "વ્યાવસાયિકો પાસે જતાં પહેલાં તમારી હકીકતો વ્યવસ્થિત કરવા માટે CASE SUNO દ્વારા તૈયાર કરાયેલ મફત ચેકલિસ્ટ્સ.",
          )}
        </p>

        {downloadedItem && (
          <div className="cs-slide-down p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-sm flex items-center gap-2" role="status">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              {L(`“${downloadedItem}” prepared for viewing and download.`, `“${downloadedItem}” डाउनलोड के लिए तैयार है।`, `“${downloadedItem}” ડાઉનલોડ માટે તૈયાર છે.`)}
            </span>
          </div>
        )}

        <div className="space-y-3 pt-1">
          {checklists.map((res, i) => (
            <div
              key={res.id}
              className="cs-rise group p-4 bg-white border border-[#E8E4DB] rounded-sm hover:border-[#BFB6A6] hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="space-y-1 max-w-md">
                <div className="flex items-center gap-2 text-[10px] font-semibold text-[#8C8479] uppercase tracking-wider">
                  <span>{res.category}</span>
                  <span>·</span>
                  <span>{res.pages}</span>
                </div>
                <h4 className={`text-sm sm:text-base text-[#1E1D1A] font-medium ${headingFont}`}>{res.title}</h4>
                <p className="text-xs text-[#6B655B] leading-relaxed">{res.desc}</p>
              </div>
              <div className="shrink-0">
                <button
                  type="button"
                  onClick={() => setDownloadedItem(res.title)}
                  className="group/btn w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 border border-[#D9D3C7] hover:border-[#1E1D1A] hover:bg-[#1E1D1A] hover:text-white text-xs font-medium text-[#1E1D1A] rounded-sm active:scale-[0.96] transition-all cursor-pointer bg-white"
                >
                  <Download className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-y-0.5" />
                  <span>{L("Get PDF", "PDF प्राप्त करें", "PDF મેળવો")}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-[#F5F1E8] border border-[#E0D9CB] rounded-sm text-xs text-[#524C41] mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <span>
            {L("Need a custom document review or personalized dossier?", "कस्टम दस्तावेज समीक्षा या व्यक्तिगत केस फाइल की आवश्यकता है?", "કસ્ટમ દસ્તાવેજ સમીક્ષા અથવા વ્યક્તિગત કેસ ફાઇલની જરૂર છે?")}
          </span>
          <button
            type="button"
            onClick={() => {
              handleClose();
              onStartEnquiry();
            }}
            className="group text-[#1E1D1A] font-semibold hover:underline inline-flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <span>{L("Request Intake", "पूछताछ करें", "પૂછપરછ કરો")}</span>
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-4 border-t border-[#E8E4DB] bg-white flex justify-end">
        <button
          type="button"
          onClick={handleClose}
          className="w-full sm:w-auto px-5 py-2 bg-[#1F1E1B] hover:bg-[#33312B] text-white text-xs font-medium rounded-sm active:scale-[0.97] transition-all cursor-pointer"
        >
          {L("Close Resources", "बंद करें", "બંધ કરો")}
        </button>
      </div>
    </ModalShell>
  );
};