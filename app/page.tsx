"use client";

import React, { useState } from "react";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { ServicesSection, type ServiceItem } from "../components/ServicesSection";
import { ProcessSection } from "../components/ProcessSection";
import { WhyChooseSection } from "../components/WhyChooseSection";
import { BeliefBanner } from "../components/BeliefBanner";
import { CtaSection } from "../components/CtaSection";
import { Footer } from "../components/Footer";
import { ChatAssistant } from "../components/ChatAssistant";
import { EnquiryModal } from "../components/EnquiryModal";
import { ServiceDetailModal } from "../components/ServiceDetailModal";
import { WhatsAppDrawer } from "../components/WhatsAppDrawer";
import { AboutModal } from "../components/AboutModal";
import { ResourcesModal } from "../components/ResourcesModal";
import { FaqModal } from "../components/FaqModal";
import { ContactModal } from "../components/ContactModal";
import { LegalModal } from "../components/LegalModal";
import { WhatsAppFloatingButton } from "../components/WhatsApp";

type LegalType = "privacy" | "terms" | "disclaimer";

export default function Home() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  // "" = no pre-selection. Accepts a service id like "property-land".
  const [enquiryCategory, setEnquiryCategory] = useState("");

  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [whatsAppOpen, setWhatsAppOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [legalType, setLegalType] = useState<LegalType | null>(null);

  /** Always resets the category so an old selection never "sticks". */
  const openEnquiry = (category: string = "") => {
    setEnquiryCategory(category);
    setEnquiryOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#222222] font-sans antialiased">
      <Header
        onOpenEnquiry={openEnquiry}
        onOpenAbout={() => setAboutOpen(true)}
        onOpenResources={() => setResourcesOpen(true)}
        onOpenFaq={() => setFaqOpen(true)}
        onOpenContact={() => setContactOpen(true)}
      />

      <main className="flex-1">
       <Hero onOpenEnquiry={openEnquiry} onOpenLocationInfo={() => setContactOpen(true)} />
        <ServicesSection onSelectService={setSelectedService} />
        <ProcessSection onKnowMore={() => setFaqOpen(true)} onOpenEnquiry={() => openEnquiry()} />
        <WhyChooseSection />
        <BeliefBanner onOurStory={() => setAboutOpen(true)} />
        <CtaSection onStartEnquiry={() => openEnquiry()} onOpenWhatsApp={() => setWhatsAppOpen(true)} />
      </main>

      <Footer
        onOpenAbout={() => setAboutOpen(true)}
        onOpenResources={() => setResourcesOpen(true)}
        onOpenFaq={() => setFaqOpen(true)}
        onOpenContact={() => setContactOpen(true)}
        onOpenLegal={setLegalType}
      />

      {/* Floating chat button (opens the topic picker) */}
     <ChatAssistant onStartEnquiry={openEnquiry} onOpenWhatsApp={() => setWhatsAppOpen(true)} />

      {/* Modals */}
      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        initialCategory={enquiryCategory}
        onOpenLegal={setLegalType}
      />

      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onStartEnquiry={(serviceId) => {
          setSelectedService(null);
          openEnquiry(serviceId);
        }}
      />

      <WhatsAppDrawer isOpen={whatsAppOpen} onClose={() => setWhatsAppOpen(false)} />

      <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} onStartEnquiry={() => openEnquiry()} />

      <ResourcesModal
        isOpen={resourcesOpen}
        onClose={() => setResourcesOpen(false)}
        onStartEnquiry={() => openEnquiry("documents-government-services")}
      />

      <FaqModal isOpen={faqOpen} onClose={() => setFaqOpen(false)} onStartEnquiry={() => openEnquiry()} />

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} onStartEnquiry={() => openEnquiry()} />

      {/* Rendered last + z-[60] so it sits above the Enquiry modal */}
      <LegalModal type={legalType} onClose={() => setLegalType(null)} />
    </div>
  );
}