"use client";

import React, { useState } from "react";
import { ArrowRight, Phone, Mail, Calendar, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { ModalShell, ModalCloseButton } from "./ModalShell";
import { EMAIL, PHONE_DISPLAY, PHONE_TEL, openWhatsApp } from "./contact";
import { WhatsAppIcon } from "./WhatsApp";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartEnquiry: () => void;
}

const todayISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().split("T")[0];
};

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, onStartEnquiry }) => {
  const [booked, setBooked] = useState(false);
  const [preferredDate, setPreferredDate] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [error, setError] = useState("");
  const { language } = useLanguage();
  const isGu = language === "gu";
  const isHi = language === "hi";
  const L = (en: string, hi: string, gu: string) => (isGu ? gu : isHi ? hi : en);

  const handleClose = () => {
    setBooked(false);
    setPreferredDate("");
    setContactName("");
    setContactPhone("");
    setError("");
    onClose();
  };

  if (!isOpen) return null;
  const headingFont = isGu || isHi ? "font-sans font-semibold" : "font-serif";
  const inputClass =
    "w-full p-2 text-xs bg-[#FAF9F6] border border-[#D5CFBF] rounded-sm text-[#1E1D1A] transition-all focus:outline-hidden focus:border-[#1E1D1A] focus:bg-white focus:ring-2 focus:ring-[#1E1D1A]/10";

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const digits = contactPhone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 13) {
      setError(L("Please enter a valid mobile number.", "कृपया मान्य मोबाइल नंबर दर्ज करें।", "કૃપા કરીને માન્ય મોબાઇલ નંબર લખો."));
      return;
    }
    setError("");
    setBooked(true);
  };

  const sendOnWhatsApp = () =>
    openWhatsApp(
      `Hello CASE SUNO, I would like to request an appointment.\nName: ${contactName}\nPhone: ${contactPhone}\nPreferred date: ${preferredDate || "Earliest available"}`,
    );

  const channelClass =
    "group p-3 bg-white border border-[#E8E4DB] rounded-sm flex items-center gap-3 hover:border-[#1E1D1A] hover:-translate-y-0.5 hover:shadow-sm active:scale-[0.98] transition-all duration-200 cursor-pointer text-left";
  const iconWrap =
    "w-8 h-8 rounded-full bg-[#F5F1E8] flex items-center justify-center text-[#4A443B] shrink-0 transition-all duration-200 group-hover:bg-[#1F1E1B] group-hover:text-white group-hover:scale-110";

  return (
    <ModalShell onClose={handleClose} ariaLabel="Contact CASE SUNO">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-[#E8E4DB] bg-white">
        <div>
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#8C8479] uppercase block">
            {L("Direct Assistance & Appointments", "सीधी सहायता और अपॉइंटमेंट", "સીધી સહાય અને એપોઇન્ટમેન્ટ")}
          </span>
          <h3 className={`text-xl sm:text-2xl text-[#1E1D1A] ${headingFont}`}>
            {L("Contact CASE SUNO", "CASE SUNO से संपर्क करें", "CASE SUNO નો સંપર્ક કરો")}
          </h3>
        </div>
        <ModalCloseButton onClick={handleClose} />
      </div>

      <div className="p-4 sm:p-6 overflow-y-auto space-y-5 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <a href={`tel:${PHONE_TEL}`} className={channelClass}>
            <div className={iconWrap}><Phone className="w-4 h-4" /></div>
            <div className="min-w-0">
              <span className="block font-medium text-[#1E1D1A] truncate">{PHONE_DISPLAY}</span>
              <span className="block text-[11px] text-[#7A7468]">{L("Call us", "कॉल करें", "કૉલ કરો")}</span>
            </div>
          </a>
          <button type="button" onClick={() => openWhatsApp()} className={channelClass}>
            <div className={`${iconWrap} group-hover:bg-[#25D366]`}><WhatsAppIcon className="w-4 h-4" /></div>
            <div className="min-w-0">
              <span className="block font-medium text-[#1E1D1A]">WhatsApp</span>
              <span className="block text-[11px] text-[#7A7468]">{L("Quick chat", "त्वरित चैट", "ઝડપી ચેટ")}</span>
            </div>
          </button>
          <a href={`mailto:${EMAIL}`} className={channelClass}>
            <div className={iconWrap}><Mail className="w-4 h-4" /></div>
            <div className="min-w-0">
              <span className="block font-medium text-[#1E1D1A] truncate">{EMAIL}</span>
              <span className="block text-[11px] text-[#7A7468]">{L("Confidential Dossiers", "गोपनीय दस्तावेज ईमेल", "ગોપનીય દસ્તાવેજ મેઇલ")}</span>
            </div>
          </a>
        </div>

        <div className="p-4 sm:p-5 bg-white border border-[#DDD6C8] rounded-sm space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#8C8479]" />
            <h4 className={`text-base sm:text-lg text-[#1E1D1A] ${headingFont}`}>
              {L("Request an Appointment Slot", "अपॉइंटमेंट स्लॉट के लिए अनुरोध करें", "એપોઇન્ટમેન્ટ સ્લોટ માટે વિનંતી કરો")}
            </h4>
          </div>

          {booked ? (
            <div className="cs-fade space-y-3">
              <div className="p-4 bg-[#EEF5EC] border border-[#CDE3C9] rounded-sm text-xs text-[#2E682A] flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-sm">
                    {L("Slot Request Received!", "अनुरोध प्राप्त हुआ!", "વિનંતી પ્રાપ્ત થઈ છે!")}
                  </span>
                  <span>
                    {L(
                      `Our case coordinator will confirm your preferred timing (${preferredDate || "Upcoming opening"}) with ${contactName || "you"} at ${contactPhone}.`,
                      `हमारे समन्वयक आपके पसंदीदा समय (${preferredDate || "आगामी स्लॉट"}) की पुष्टि के लिए ${contactName || "आपसे"} ${contactPhone} पर संपर्क करेंगे।`,
                      `અમારા કોઓર્ડિનેટર તમારા અનુકૂળ સમય (${preferredDate || "આગામી સ્લોટ"}) ની પુષ્ટિ કરવા માટે ${contactName || "તમને"} ${contactPhone} પર સંપર્ક કરશે.`,
                    )}
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
                <button
                  type="button"
                  onClick={() => setBooked(false)}
                  className="px-4 py-2 border border-[#D9D3C7] text-xs text-[#5C564C] rounded-sm hover:text-black hover:border-[#1E1D1A] active:scale-[0.97] transition-all cursor-pointer"
                >
                  {L("Edit details", "विवरण बदलें", "વિગતો બદલો")}
                </button>
                <button
                  type="button"
                  onClick={sendOnWhatsApp}
                  className="group inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-medium rounded-sm hover:shadow-md active:scale-[0.97] transition-all cursor-pointer"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                  {L("Send request on WhatsApp", "व्हाट्सएप पर अनुरोध भेजें", "વોટ્સએપ પર વિનંતી મોકલો")}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-3">
              {error && (
                <div className="cs-slide-down p-2.5 bg-red-50 border border-red-200 text-red-800 text-xs rounded-sm" role="alert">
                  {error}
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label htmlFor="ct-name" className="block text-[11px] font-semibold text-[#4A453C] mb-1">
                    {L("Your Name *", "आपका नाम *", "તમારું નામ *")}
                  </label>
                  <input id="ct-name" type="text" required autoComplete="name" value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder={L("e.g. Amit Desai", "उदा. अमित देसाई", "દા.ત. અમિત દેસાઈ")} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="ct-phone" className="block text-[11px] font-semibold text-[#4A453C] mb-1">
                    {L("Phone Number *", "फ़ोन नंबर *", "ફોન નંબર *")}
                  </label>
                  <input id="ct-phone" type="tel" required inputMode="tel" autoComplete="tel" value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)} placeholder="+91 9825..." className={inputClass} />
                </div>
                <div>
                  <label htmlFor="ct-date" className="block text-[11px] font-semibold text-[#4A453C] mb-1">
                    {L("Preferred Date", "पसंदीदा तारीख", "પસંદગીની તારીખ")}
                  </label>
                  <input id="ct-date" type="date" min={todayISO()} value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)} className={inputClass} />
                </div>
              </div>
              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2 bg-[#1F1E1B] hover:bg-[#33312B] text-white text-xs font-medium rounded-sm hover:shadow-md active:scale-[0.97] transition-all cursor-pointer"
                >
                  {L("Confirm Appointment Request", "अपॉइंटमेंट अनुरोध की पुष्टि करें", "એપોઇન્ટમેન્ટ વિનંતી કન્ફર્મ કરો")}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <div className="px-4 sm:px-6 py-4 border-t border-[#E8E4DB] bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleClose}
          className="w-full sm:w-auto px-4 py-2 border border-[#D9D3C7] text-xs text-[#5C564C] rounded-sm hover:text-black hover:border-[#1E1D1A] active:scale-[0.97] transition-all cursor-pointer"
        >
          {L("Close", "बंद करें", "બંધ કરો")}
        </button>
        <button
          type="button"
          onClick={() => {
            handleClose();
            onStartEnquiry();
          }}
          className="group w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2 bg-[#1F1E1B] hover:bg-[#33312B] text-white text-xs font-medium rounded-sm hover:shadow-md active:scale-[0.97] transition-all cursor-pointer"
        >
          <span>{L("Fill Detailed Case Brief", "विस्तृत केस विवरण भरें", "વિસ્તૃત કેસ બ્રીફ ભરો")}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </ModalShell>
  );
};