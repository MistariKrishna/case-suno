"use client";

import React from "react";
import { ArrowRight, ShieldCheck, HeartHandshake, Eye } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { ModalShell, ModalCloseButton } from "./ModalShell";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartEnquiry: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, onStartEnquiry }) => {
  const { language } = useLanguage();
  const isGu = language === "gu";
  const isHi = language === "hi";
  const L = (en: string, hi: string, gu: string) => (isGu ? gu : isHi ? hi : en);

  if (!isOpen) return null;
  const headingFont = isGu || isHi ? "font-sans font-semibold" : "font-serif";

  const commitments = [
    {
      icon: <ShieldCheck className="w-4 h-4 text-[#73634B] mb-2 transition-transform group-hover:scale-110" />,
      title: L("Absolute Privacy", "पूर्ण गोपनीयता", "સંપૂર્ણ ગોપનીયતા"),
      desc: L("Your situation stays strictly confidential and unshared.", "आपकी स्थिति पूर्णतः निजी और सुरक्षित रहती है।", "તમારી પરિસ્થિતિ સંપૂર્ણ ખાનગી અને સુરક્ષિત રહે છે."),
    },
    {
      icon: <Eye className="w-4 h-4 text-[#73634B] mb-2 transition-transform group-hover:scale-110" />,
      title: L("Zero Hidden Fees", "कोई छिपा शुल्क नहीं", "શૂન્ય છુપી ફી"),
      desc: L("Clear upfront costs with no misleading retainers.", "पारदर्शी शुल्क, कोई अप्रत्याशित खर्च नहीं।", "પારદર્શક કિંમતો, કોઈ અણધાર્યા ખર્ચ નહીં."),
    },
    {
      icon: <HeartHandshake className="w-4 h-4 text-[#73634B] mb-2 transition-transform group-hover:scale-110" />,
      title: L("Independent Vetting", "सत्यापित विशेषज्ञ", "સ્વતંત્ર ચકાસણી"),
      desc: L("Referrals based on merit, competence, and your exact case fit.", "योग्यता और अनुभव के आधार पर ही विशेषज्ञों से परिचय।", "લાયકાત અને યોગ્યતાના આધારે જ નિષ્ણાતો સાથે જોડાણ."),
    },
  ];

  return (
    <ModalShell onClose={onClose} ariaLabel="About CASE SUNO">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-[#E8E4DB] bg-white">
        <div>
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#8C8479] uppercase block">
            {L("Our Story & Philosophy", "हमारी कहानी और विचार", "અમારી વાર્તા અને વિચારધારા")}
          </span>
          <h3 className={`text-xl sm:text-2xl text-[#1E1D1A] ${headingFont}`}>
            {L("About CASE SUNO", "CASE SUNO के बारे में", "CASE SUNO વિશે")}
          </h3>
        </div>
        <ModalCloseButton onClick={onClose} />
      </div>

      <div className="p-4 sm:p-8 overflow-y-auto space-y-5 sm:space-y-6 text-[#3D3A33]">
        <div className="cs-rise p-4 sm:p-5 bg-[#F4EFE6] border-l-2 border-[#1E1D1A] rounded-r-xs" style={{ animationDelay: "80ms" }}>
          <p className={`text-lg sm:text-2xl text-[#1E1D1A] leading-snug ${isGu || isHi ? "font-sans font-medium" : "font-serif italic"}`}>
            {L(
              "“You may not always know the answers. But you can always take the next step. That's what CASE SUNO is here for.”",
              "“हो सकता है आपके पास हमेशा सभी उत्तर न हों। लेकिन आप हमेशा अगला कदम उठा सकते हैं। CASE SUNO इसी के लिए उपस्थित है।”",
              "“તમારી પાસે કદાચ હંમેશા જવાબો ન હોય. પરંતુ તમે હંમેશા આગલું પગલું ભરી શકો છો. CASE SUNO એના માટે જ હાજર છે.”",
            )}
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-[#524E46] leading-relaxed">
          <h4 className={`text-lg sm:text-xl text-[#1E1D1A] ${headingFont}`}>
            {L("Why We Started", "हमने शुरुआत क्यों की", "અમે શા માટે શરૂઆત કરી")}
          </h4>
          <p>
            {L(
              "Individuals, families, and business owners often face unexpected legal notices, property ambiguities, family settlements, and commercial disagreements.",
              "व्यक्ति, परिवार और व्यवसायी अक्सर अप्रत्याशित कानूनी नोटिस, संपत्ति की अस्पष्टता, पारिवारिक समझौते और व्यावसायिक मतभेदों का सामना करते हैं।",
              "વ્યક્તિઓ, પરિવારો અને વ્યવસાયિકો ઘણીવાર અણધારી કાનૂની નોટિસ, મિલકતની અસ્પષ્ટતા, વારસાઈ વહેંચણી અને વેપારી મતભેદોનો સામનો કરતા હોય છે.",
            )}
          </p>
          <p>
            {L(
              "Often, the hardest hurdle isn't the legal dispute itself—it's the initial paralysis. Where do I go? Who can I trust? Will I get overcharged? What documents do I actually need?",
              "अक्सर सबसे बड़ी बाधा विवाद नहीं होता—बल्कि प्रारंभिक भ्रम और असमंजस होता है: मुझे कहाँ जाना चाहिए? किस पर भरोसा करें? किन दस्तावेजों की आवश्यकता होगी? क्या अत्यधिक शुल्क लिया जाएगा?",
              "મોટેભાગે, સૌથી મોટો અવરોધ વિવાદ નથી હોતો—પરંતુ શરૂઆતની મૂંઝવણ હોય છે: મારે ક્યાં જવું? કોના પર વિશ્વાસ કરવો? કયા કાગળોની જરૂર પડશે? શું વધારે ફી વસૂલવામાં આવશે?",
            )}
          </p>
          <p>
            <strong>CASE SUNO</strong>{" "}
            {L(
              "was founded with a singular, quiet purpose: to be the calm, structured bridge between confusion and progress. We do not solicit litigation. Instead, we listen deeply, organize your paperwork, clarify realistic options, and introduce you to verified, independent professionals only when necessary.",
              "की स्थापना एक स्पष्ट उद्देश्य के साथ हुई है: असमंजस और समाधान के बीच एक शांत, व्यवस्थित सेतु बनना। हम अनावश्यक विवादों को बढ़ावा नहीं देते। हम आपकी बात सुनते हैं, कागजात व्यवस्थित करते हैं, व्यावहारिक विकल्प स्पष्ट करते हैं और जरूरत पड़ने पर ही स्वतंत्र विशेषज्ञों से संपर्क कराते हैं।",
              "ની સ્થાપના એક જ સ્પષ્ટ હેતુ સાથે થઈ છે: મૂંઝવણ અને પ્રગતિ વચ્ચેનો શાંત, વ્યવસ્થિત સેતુ બનવું. અમે કાયદાકીય તકરારોને પ્રોત્સાહન આપતા નથી. અમે તમારી વાત સાંભળીએ છીએ, કાગળો વ્યવસ્થિત કરીએ છીએ, વાસ્તવિક વિકલ્પો સ્પષ્ટ કરીએ છીએ અને જરૂર જણાય ત્યારે જ સ્વતંત્ર વ્યાવસાયિકો સાથે જોડીએ છીએ.",
            )}
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C8479]">
            {L("Our Guiding Commitments", "हमारी मुख्य प्रतिबद्धताएं", "અમારી મુખ્ય પ્રતિબદ્ધતાઓ")}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {commitments.map((c, i) => (
              <div
                key={i}
                className="cs-rise group p-3.5 bg-white border border-[#E8E4DB] rounded-sm text-xs transition-all duration-200 hover:border-[#BFB6A6] hover:-translate-y-1 hover:shadow-sm"
                style={{ animationDelay: `${150 + i * 80}ms` }}
              >
                {c.icon}
                <span className="font-semibold block text-[#1E1D1A]">{c.title}</span>
                <span className="text-[#6E685D] mt-1 block">{c.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-4 border-t border-[#E8E4DB] bg-white flex items-center justify-between gap-3">
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
          className="group inline-flex items-center gap-2 px-5 py-2.5 bg-[#1F1E1B] hover:bg-[#33312B] text-white text-xs font-medium rounded-sm hover:shadow-md active:scale-[0.97] transition-all cursor-pointer"
        >
          <span>{L("Start Your Enquiry", "अपनी पूछताछ शुरू करें", "પૂછપરછ શરૂ કરો")}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </ModalShell>
  );
};