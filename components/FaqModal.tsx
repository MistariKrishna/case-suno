"use client";

import React, { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { ModalShell, ModalCloseButton } from "./ModalShell";

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartEnquiry: () => void;
}

const faqsGu = [
  { q: "CASE SUNO ખરેખર શું છે?", a: "CASE SUNO એ વ્યાવસાયિક પરામર્શ, કેસ સંકલન અને વહીવટી માર્ગદર્શન સેવા છે. અમે વ્યક્તિઓ અને વ્યવસાયોને તેમની મૂંઝવણભરી કાનૂની, વાણિજ્યિક અને દસ્તાવેજી સમસ્યાઓ ઉકેલવામાં, કાગળો વ્યવસ્થિત કરવામાં અને જરૂર જણાય ત્યારે ચકાસાયેલા વકીલો કે CA સાથે સંકલન કરવામાં મદદ કરીએ છીએ." },
  { q: "શું CASE SUNO કોઈ વકીલ પેઢી (Law Firm) છે?", a: "ના. CASE SUNO કોઈ વકીલ પેઢી નથી અને તે અદાલતમાં સીધું પ્રતિનિધિત્વ આપતી નથી કે વકીલાતની જાહેરાત કરતી નથી. અમે એક સ્વતંત્ર કેસ મેનેજમેન્ટ અને સલાહકાર સંસ્થા તરીકે કાર્ય કરીએ છીએ. ઔપચારિક કોર્ટ ફાઇલિંગ કે CA ઓડિટ માટે અમે તમને સીધા લાયક સ્વતંત્ર વ્યાવસાયિકો સાથે જોડીએ છીએ." },
  { q: "એપોઇન્ટમેન્ટ આધારિત સહાય કેવી રીતે કાર્ય કરે છે?", a: "દરેક ક્લાયન્ટને પૂરતો સમય આપવા અને સંપૂર્ણ ગોપનીયતા જાળવવા માટે, અમારા તમામ સત્રો માત્ર અગાઉથી નક્કી કરેલ એપોઇન્ટમેન્ટ મુજબ જ યોજાય છે. તમે ઓનલાઇન વિડીયો અથવા ફોન સત્ર બુક કરી શકો છો." },
  { q: "શું મારી માહિતી ખાનગી રાખવામાં આવે છે?", a: "ચોક્કસપણે. CASE SUNO સાથે શેર કરવામાં આવતી દરેક વિગત, દસ્તાવેજ અને પૂછપરછ સખત બિન-જાહેર ધોરણો હેઠળ રક્ષિત છે. તમારી સ્પષ્ટ મંજૂરી વિના અમે ક્યારેય તમારી માહિતી કોઈ ત્રીજા પક્ષ સાથે શેર કરતા નથી." },
  { q: "સેવાઓ માટે શું ચાર્જ લેવામાં આવે છે?", a: "પ્રારંભિક પૂછપરછ અને વિગતો સમજવી મફત છે. ઊંડાણપૂર્વક દસ્તાવેજ વિશ્લેષણ અને કેસ ફાઇલ તૈયાર કરવા માટે અમે અગાઉથી નક્કી કરેલા પારદર્શક ચાર્જ જણાવીએ છીએ. કોઈ છુપા ખર્ચ હોતા નથી." },
  { q: "શું CASE SUNO કોઈપણ સ્થળેથી ક્લાયન્ટ્સને મદદ કરી શકે છે?", a: "હા. CASE SUNO સુરક્ષિત ઓનલાઇન માધ્યમ દ્વારા વિવિધ સ્થળોએ રહેલા ક્લાયન્ટ્સને માર્ગદર્શન અને સંકલન સેવાઓ પ્રદાન કરી શકે છે." },
  { q: "પૂછપરછ સબમિટ કર્યા પછી શું થાય છે?", a: "અમારા કેસ કોઓર્ડિનેટર તમારી વિગતો ચકાસીને ૨ વ્યાવસાયિક કલાકમાં વોટ્સએપ અથવા ફોન દ્વારા સંપર્ક કરે છે અને અનુકૂળ સમયે પ્રારંભિક સત્ર ગોઠવે છે." },
];

const faqsHi = [
  { q: "CASE SUNO वास्तव में क्या है?", a: "CASE SUNO एक पेशेवर परामर्श, केस समन्वय और प्रशासनिक मार्गदर्शन सेवा है। हम व्यक्तियों और व्यापारिक संस्थानों को उनकी जटिल व्यक्तिगत, व्यावसायिक और दस्तावेजी समस्याओं को सुलझाने, तथ्यों को व्यवस्थित करने और जरूरत पड़ने पर स्वतंत्र अधिवक्ताओं या सीए के साथ समन्वय करने में सहायता करते हैं।" },
  { q: "क्या CASE SUNO कोई लॉ फर्म (Law Firm) है?", a: "नहीं। CASE SUNO कोई वकालत फर्म नहीं है और न ही यह अदालत में सीधे पक्षकार का प्रतिनिधित्व करती है। हम एक निष्पक्ष केस आयोजक, सलाहकार और संपर्क सेतु के रूप में कार्य करते हैं। जब औपचारिक न्यायालय फाइलिंग या सीए प्रमाणन की आवश्यकता होती है, तो हम आपको सत्यापित स्वतंत्र विशेषज्ञों से जोड़ते हैं।" },
  { q: "अपॉइंटमेंट आधारित सहायता कैसे काम करती है?", a: "प्रत्येक क्लाइंट को पूरा ध्यान देने और पूर्ण गोपनीयता बनाए रखने के लिए, हमारे सभी सत्र केवल पूर्व-निर्धारित अपॉइंटमेंट के आधार पर ही आयोजित किए जाते हैं। आप ऑनलाइन वीडियो या फोन सत्र बुक कर सकते हैं।" },
  { q: "क्या मेरी जानकारी गोपनीय रखी जाती है?", a: "हाँ, पूरी तरह से। CASE SUNO के साथ साझा किया गया प्रत्येक दस्तावेज, विवरण और बातचीत गैर-प्रकटीकरण (Non-Disclosure) के सख्त नियमों से बंधी होती है। आपकी स्पष्ट सहमति के बिना आपकी जानकारी किसी तीसरे पक्ष के साथ साझा नहीं की जाती।" },
  { q: "आपकी सेवाओं के लिए क्या शुल्क है?", a: "प्रारंभिक पूछताछ और केस विवरण समझना निःशुल्क है। गहन दस्तावेज विश्लेषण और केस फाइल संरचना के लिए हम काम शुरू होने से पहले पारदर्शी और स्पष्ट अनुमान प्रदान करते हैं। कोई अप्रत्याशित शुल्क नहीं होता।" },
  { q: "क्या CASE SUNO अलग-अलग स्थानों के ग्राहकों की सहायता कर सकता है?", a: "हाँ। CASE SUNO सुरक्षित ऑनलाइन माध्यम के द्वारा अलग-अलग स्थानों पर रहने वाले ग्राहकों को मार्गदर्शन और समन्वय सेवाएँ प्रदान कर सकता है।" },
  { q: "पूछताछ दर्ज करने के बाद क्या प्रक्रिया होती है?", a: "हमारे केस समन्वयक आपकी जानकारी की समीक्षा करते हैं और २ व्यावसायिक घंटों के भीतर व्हाट्सएप या फोन द्वारा संपर्क करके आपकी सुविधानुसार प्रारंभिक सत्र तय करते हैं।" },
];

const faqsEn = [
  { q: "What exactly is CASE SUNO?", a: "CASE SUNO is a professional consultation, case organization, and administrative guidance service. We help individuals and businesses untangle complex personal, commercial, and documentation problems, structure their materials cleanly, and coordinate with verified independent advocates, CAs, or mediators when formal intervention is required." },
  { q: "Is CASE SUNO a law firm?", a: "No. CASE SUNO is not a law firm and does not solicit legal work, nor do we provide direct legal representation in court. We act as an independent case organizer, advisor, and liaison. When formal legal counsel, court filings, or CA certifications are needed, we connect you with verified, independent professionals under their respective statutory guidelines." },
  { q: "How does appointment-based assistance work?", a: "To guarantee dedicated attention and complete confidentiality, all sessions are conducted strictly by appointment. You can book a confidential virtual video or phone session. Walk-ins are not accommodated to safeguard client privacy." },
  { q: "Is my information kept confidential?", a: "Absolutely. Every consultation, document uploaded, and inquiry submitted to CASE SUNO is governed by strict non-disclosure principles. We never sell, broadcast, or share your data with third parties without your explicit authorization." },
  { q: "What are the charges for your services?", a: "Preliminary intake and inquiry review are free. For in-depth document organization, case dossier structuring, and ongoing administrative coordination, we provide clear, upfront milestone-based quotes before any work begins. There are never surprise fees or billable hour inflation." },
  { q: "Can you help clients from different locations?", a: "Yes. CASE SUNO can provide guidance and coordination services to clients in different locations through secure online appointment infrastructure." },
  { q: "What happens after I submit an inquiry?", a: "Our case coordinator reviews your notes and contacts you within 2 business hours via WhatsApp or phone call to schedule your preliminary intake session at a time convenient for you." },
];

export const FaqModal: React.FC<FaqModalProps> = ({ isOpen, onClose, onStartEnquiry }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const { language } = useLanguage();
  const isGu = language === "gu";
  const isHi = language === "hi";
  const L = (en: string, hi: string, gu: string) => (isGu ? gu : isHi ? hi : en);

  if (!isOpen) return null;
  const faqs = isGu ? faqsGu : isHi ? faqsHi : faqsEn;
  const headingFont = isGu || isHi ? "font-sans font-semibold" : "font-serif";

  return (
    <ModalShell onClose={onClose} ariaLabel="FAQ">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-[#E8E4DB] bg-white">
        <div>
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#8C8479] uppercase block">
            {L("Clear Answers", "स्पष्ट उत्तर", "સ્પષ્ટ જવાબો")}
          </span>
          <h3 className={`text-xl sm:text-2xl text-[#1E1D1A] ${headingFont}`}>
            {L("Frequently Asked Questions", "अक्सर पूछे जाने वाले प्रश्न (FAQ)", "વારંવાર પૂછાતા પ્રશ્નો (FAQ)")}
          </h3>
        </div>
        <ModalCloseButton onClick={onClose} />
      </div>

      <div className="p-4 sm:p-6 overflow-y-auto space-y-3">
        {faqs.map((faq, idx) => {
          const expanded = openIdx === idx;
          return (
            <div
              key={idx}
              className={`cs-rise border rounded-sm bg-white overflow-hidden transition-all duration-200 ${
                expanded ? "border-[#BFB6A6] shadow-xs" : "border-[#E8E4DB] hover:border-[#D3CCBF]"
              }`}
              style={{ animationDelay: `${idx * 40}ms` }}
            >
              <button
                type="button"
                onClick={() => setOpenIdx(expanded ? null : idx)}
                aria-expanded={expanded}
                className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between gap-3 sm:gap-4 hover:bg-[#FAF8F4] transition-colors cursor-pointer"
              >
                <span className={`text-[14.5px] sm:text-[15.5px] font-medium text-[#1E1D1A] ${headingFont}`}>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 shrink-0 transition-transform duration-300 ${expanded ? "rotate-180 text-black" : "text-[#8C8479]"}`}
                />
              </button>
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                  expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden min-h-0">
                  <div className="px-3.5 sm:px-4 pb-4 pt-2 text-xs text-[#524E46] leading-relaxed border-t border-[#F5F2EB]">
                    {faq.a}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-4 sm:px-6 py-4 border-t border-[#E8E4DB] bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs text-[#787268]">{L("Have a specific query?", "कोई विशिष्ट प्रश्न है?", "કોઈ ચોક્કસ પ્રશ્ન છે?")}</span>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-[#D9D3C7] text-xs text-[#5C564C] rounded-sm hover:text-black hover:border-[#1E1D1A] active:scale-[0.97] transition-all cursor-pointer"
          >
            {L("Close", "बंद करें", "બંધ કરો")}
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onStartEnquiry();
            }}
            className="group inline-flex items-center gap-1.5 px-5 py-2 bg-[#1F1E1B] hover:bg-[#33312B] text-white text-xs font-medium rounded-sm hover:shadow-md active:scale-[0.97] transition-all cursor-pointer"
          >
            <span>{L("Ask Our Team", "हमारी टीम से पूछें", "અમારી ટીમને પૂછો")}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </ModalShell>
  );
};