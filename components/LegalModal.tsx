"use client";

import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { ModalShell, ModalCloseButton } from "./ModalShell";

interface LegalModalProps {
  type: "privacy" | "terms" | "disclaimer" | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  const { language } = useLanguage();
  const isGu = language === "gu";
  const isHi = language === "hi";
  const L = (en: string, hi: string, gu: string) => (isGu ? gu : isHi ? hi : en);

  if (!type) return null;

  const updated = L("Updated: January 2026", "अद्यतित: जनवरी २०२६", "અપડેટ: જાન્યુઆરી ૨૦૨૬");

  const contentMap = {
    privacy: {
      title: L("Privacy Policy", "गोपनीयता नीति", "ગોપનીયતા નીતિ"),
      kicker: L("Data Protection & Confidentiality", "डेटा सुरक्षा एवं गोपनीयता", "ડેટા સુરક્ષા અને ગુપ્તતા"),
      sections: [
        {
          h: L("1. Commitment to Absolute Discretion", "१. पूर्ण गोपनीयता और सुरक्षा की प्रतिबद्धता", "૧. સંપૂર્ણ વિવેકબુદ્ધિ અને ગોપનીયતા"),
          p: L(
            "CASE SUNO collects only the necessary details required to understand your matter and organize your documentation. We maintain non-disclosure standards across all digital communication, telephone conferences, and physical documents shared with our team in Surat or virtually.",
            "CASE SUNO केवल आपकी स्थिति को समझने और दस्तावेजों को व्यवस्थित करने के लिए आवश्यक जानकारी ही एकत्र करता है। हमारे सूरत कार्यालय या डिजिटल माध्यम से साझा किए गए सभी विवरण सख्त गैर-प्रकटीकरण मानकों के तहत सुरक्षित रहते हैं।",
            "CASE SUNO માત્ર તમારી બાબત સમજવા અને તમારા દસ્તાવેજો વ્યવસ્થિત કરવા માટે જરૂરી વિગતો જ એકત્રિત કરે છે. અમારા સુરત કાર્યાલયમાં અથવા ડિજિટલ માધ્યમથી શેર કરેલા તમામ દસ્તાવેજો પર કડક ગોપનીયતા ધોરણો લાગુ પડે છે.",
          ),
        },
        {
          h: L("2. Document Handling and Storage", "२. दस्तावेज रखरखाव और सुरक्षित भंडारण", "૨. દસ્તાવેજ સંભાળ અને સંગ્રહ"),
          p: L(
            "Documents and case files shared by users are encrypted and stored in secure digital vaults. Access is strictly limited to authorized intake coordinators handling your specific matter. We never sell or share data with marketers or non-consented third parties.",
            "ग्राहकों द्वारा साझा की गई फाइलें एन्क्रिप्टेड डिजिटल वॉल्ट में सुरक्षित रखी जाती हैं। हम कभी भी विपणक या अनधिकृत तीसरे पक्ष को डेटा नहीं बेचते और न ही साझा करते हैं।",
            "ક્લાયન્ટ્સ દ્વારા શેર કરવામાં આવેલી ફાઇલો એન્ક્રિપ્ટેડ ડિજિટલ વોલ્ટમાં સુરક્ષિત રહે છે. અમે માર્કેટર્સ અથવા બિન-સંમત ત્રીજા પક્ષોને ક્યારેય ડેટા વેચતા કે શેર કરતા નથી.",
          ),
        },
        {
          h: L("3. Data Retention and Erasure", "३. डेटा प्रतिधारण और निष्कासन", "૩. ડેટા જાળવણી અને રદબાતલ"),
          p: L(
            "Upon completion of coordination or at your written request, case dossiers and personal records can be permanently expunged from our active records in compliance with applicable Indian digital data privacy regulations.",
            "समन्वय पूर्ण होने के उपरांत या आपके लिखित अनुरोध पर, भारतीय डिजिटल डेटा गोपनीयता नियमों के अनुसार केस फाइलें हमारे सक्रिय रिकॉर्ड से स्थायी रूप से हटाई जा सकती हैं।",
            "સંકલન પૂર્ણ થયા પછી અથવા તમારી લેખિત વિનંતી પર, ભારતીય ડિજિટલ ડેટા સુરક્ષા નિયમો અનુસાર કેસ ફાઇલો અમારા રેકોર્ડમાંથી કાયમ માટે દૂર કરી શકાય છે.",
          ),
        },
      ],
    },
    terms: {
      title: L("Terms & Conditions", "नियम और शर्तें", "નિયમો અને શરતો"),
      kicker: L("Operational Agreement", "परिचालन समझौता", "કાર્યકારી કરાર"),
      sections: [
        {
          h: L("1. Nature of Platform & Scope", "१. मंच का स्वरूप एवं कार्यक्षेत्र", "૧. પ્લેટફોર્મનું સ્વરૂપ અને કાર્યક્ષેત્ર"),
          p: L(
            "CASE SUNO operates as an advisory coordination, documentation structuring, and process liaison service. Engaging CASE SUNO does not constitute an attorney-client or statutory auditor relationship until and unless an independent advocate or chartered accountant is formally retained by you.",
            "CASE SUNO एक सलाहकार समन्वय, दस्तावेज संरचना और प्रक्रिया सेतु सेवा के रूप में कार्य करता है। जब तक आप किसी स्वतंत्र अधिवक्ता या सीए से औपचारिक अनुबंध नहीं करते, तब तक CASE SUNO से संपर्क अधिवक्ता-क्लाइंट संबंध स्थापित नहीं करता।",
            "CASE SUNO એક સલાહકાર સંકલન, દસ્તાવેજ માળખું અને પ્રક્રિયા સેતુ સેવા તરીકે કાર્ય કરે છે. જ્યાં સુધી તમે કોઈ સ્વતંત્ર વકીલ કે સીએ સાથે ઔપચારિક રીતે કરાર ન કરો ત્યાં સુધી CASE SUNO સાથેનું જોડાણ વકીલ-ક્લાયન્ટ સંબંધ સ્થાપિત કરતું નથી.",
          ),
        },
        {
          h: L("2. Appointment & Cancellation Policy", "२. अपॉइंटमेंट एवं रद्दीकरण नीति", "૨. એપોઇન્ટમેન્ટ અને રદ્દીકરણ નીતિ"),
          p: L(
            "Appointments are reserved strictly for registered parties. Rescheduling or cancellations must be communicated at least 4 hours prior to the scheduled time to ensure available slots for other clients.",
            "अन्य ग्राहकों के समय की उपलब्धता सुनिश्चित करने के लिए, पुनर्निर्धारण या रद्दीकरण की सूचना निर्धारित समय से कम से कम ४ घंटे पूर्व दी जानी चाहिए।",
            "સમય અન્ય ક્લાયન્ટ્સ માટે પણ ઉપલબ્ધ રહે તે માટે પુનઃનિર્ધારણ અથવા રદ્દીકરણ નિર્ધારિત સમયના ઓછામાં ઓછા ૪ કલાક પહેલાં જણાવવું જરૂરી છે.",
          ),
        },
        {
          h: L("3. Limitation of Liability", "३. दायित्व की सीमा", "૩. જવાબદારીની મર્યાદા"),
          p: L(
            "While CASE SUNO exercises highest professional care in vetting independent professionals and organizing dossiers, outcomes in judicial, quasi-judicial, or arbitral forums depend on statutory merits and judicial discretion.",
            "यद्यपि CASE SUNO स्वतंत्र विशेषज्ञों की समीक्षा और फाइल तैयार करने में उच्चतम पेशेवर सावधानी बरतता है, न्यायिक या मध्यस्थता मंचों में परिणाम केस के कानूनी गुण-दोष और पीठासीन अधिकारी के विवेक पर निर्भर करते हैं।",
            "CASE SUNO વ્યાવસાયિકોની પસંદગી અને ફાઇલ તૈયાર કરવામાં ઉચ્ચતમ કાળજી રાખે છે, પરંતુ કોઈપણ ન્યાયિક કે લવાદ મંચમાં પરિણામ કેસની કાયદાકીય યોગ્યતા અને ન્યાયાધીશના વિવેક પર નિર્ભર રહે છે.",
          ),
        },
      ],
    },
    disclaimer: {
      title: L("Regulatory Disclaimer", "नियामकीय अस्वीकरण (Disclaimer)", "નિયમનકારી ડિસ્ક્લેમર"),
      kicker: L("Bar Council & Regulatory Compliance", "बार काउंसिल एवं विधिक अनुपालन", "બાર કાઉન્સિલ અને કાનૂની પાલન"),
      sections: [
        {
          h: L("1. Compliance with Bar Council of India Rules", "१. बार काउंसिल ऑफ इंडिया के नियमों का अनुपालन", "૧. બાર કાઉન્સિલ ઓફ ઈન્ડિયા નિયમોનું પાલન"),
          p: L(
            "As per the rules of the Bar Council of India, advocates are strictly prohibited from soliciting work or advertising in any form or manner. CASE SUNO is an independent case management and administrative coordination organization.",
            "बार काउंसिल ऑफ इंडिया के नियमों के अनुसार अधिवक्ताओं द्वारा किसी भी रूप में कार्य या विज्ञापन का प्रचार करना पूर्णतः प्रतिबंधित है। CASE SUNO एक स्वतंत्र केस प्रबंधन एवं प्रशासनिक समन्वय संस्था है।",
            "બાર કાઉન્સિલ ઓફ ઈન્ડિયાના નિયમો મુજબ વકીલો માટે જાહેરાત કે પ્રચાર કરવો સખત પ્રતિબંધિત છે. CASE SUNO એ સ્વતંત્ર કેસ મેનેજમેન્ટ અને વહીવટી સંકલન સંસ્થા છે.",
          ),
        },
        {
          h: L("2. No Direct Legal Representation", "२. न्यायालय में सीधा प्रतिनिधित्व नहीं", "૨. અદાલતમાં સીધું પ્રતિનિધિત્વ નહીં"),
          p: L(
            "This website is not intended to be a source of legal advertising or solicitation. The information provided herein is for informational and educational purposes only and should not be construed as legal advice.",
            "यह वेबसाइट कानूनी विज्ञापन या वकालत प्रचार का स्रोत नहीं है। यहां दी गई जानकारी केवल सूचनात्मक और मार्गदर्शक उद्देश्यों के लिए है और इसे अंतिम विधिक सलाह न समझा जाए।",
            "આ વેબસાઇટ કાનૂની જાહેરાત અથવા ક્લાયન્ટ શોધવાનો સ્ત્રોત નથી. અહીં પૂરી પાડવામાં આવેલ માહિતી ફક્ત જાણકારી માટે છે અને તેને કાયદાકીય સલાહ તરીકે ગણવી નહીં.",
          ),
        },
        {
          h: L("3. Independent Professional Relationship", "३. स्वतंत्र पेशेवर संबंध", "૩. સ્વતંત્ર વ્યાવસાયિક સંબંધ"),
          p: L(
            "Any independent advocate, CA, or surveyor to whom a client is introduced operates in their independent professional capacity and enters into a direct, privileged client relationship under their respective statutory bar or institute rules.",
            "कोई भी स्वतंत्र अधिवक्ता, सीए या सर्वेक्षक जिनसे क्लाइंट का परिचय कराया जाता है, वे अपनी स्वतंत्र पेशेवर क्षमता में कार्य करते हैं और संबंधित सांविधिक संस्था के नियमों के तहत सीधा संबंध स्थापित करते हैं।",
            "ક્લાયન્ટ જે કોઈપણ સ્વતંત્ર વકીલ કે સીએ સાથે જોડાય છે, તેઓ પોતાની સ્વતંત્ર ક્ષમતામાં કામ કરે છે અને સંબંધિત સંસ્થાના નિયમો મુજબ સીધો સંબંધ સ્થાપિત કરે છે.",
          ),
        },
      ],
    },
  };

  const active = contentMap[type];
  const headingFont = isGu || isHi ? "font-sans" : "font-serif";

  return (
    <ModalShell onClose={onClose} maxHeightClass="max-h-[85vh]" zIndexClass="z-[60]" ariaLabel={active.title}>
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-[#E8E4DB] bg-white">
        <div>
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#8C8479] uppercase block">{active.kicker}</span>
          <h3 className={`text-xl sm:text-2xl text-[#1E1D1A] ${isGu || isHi ? "font-sans font-semibold" : "font-serif"}`}>
            {active.title}
          </h3>
        </div>
        <ModalCloseButton onClick={onClose} />
      </div>

      <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5 text-xs text-[#524E46] leading-relaxed">
        <p className="text-[11px] text-[#8C8479] font-mono">{updated}</p>
        {active.sections.map((sec, idx) => (
          <div key={`${type}-${idx}`} className="cs-rise space-y-1.5" style={{ animationDelay: `${80 + idx * 80}ms` }}>
            <h4 className={`text-sm sm:text-base font-semibold text-[#1E1D1A] ${headingFont}`}>{sec.h}</h4>
            <p>{sec.p}</p>
          </div>
        ))}
      </div>

      <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-t border-[#E8E4DB] bg-white flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="w-full sm:w-auto px-5 py-2 bg-[#1F1E1B] hover:bg-[#33312B] text-white text-xs font-medium rounded-sm hover:shadow-md active:scale-[0.97] transition-all cursor-pointer"
        >
          {L("I Understand", "मैं समझता/समझती हूँ", "હું સમજું છું")}
        </button>
      </div>
    </ModalShell>
  );
};