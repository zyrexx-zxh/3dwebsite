import { useState } from "react";
import SceneBackground from "./components/three/SceneBackground";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/Hero";
import ServiceCatalog from "./components/ServiceCatalog";
import FAQAccordion from "./components/FAQAccordion";
import Contact from "./components/Contact";
import CheckoutWizard from "./components/checkout/CheckoutWizard";

export default function App() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [initialProjectTypeId, setInitialProjectTypeId] = useState(null);

  function openCheckout() {
    setInitialProjectTypeId(null);
    setCheckoutOpen(true);
  }

  function openCheckoutForService(serviceId) {
    setInitialProjectTypeId(serviceId);
    setCheckoutOpen(true);
  }

  function scrollToServices() {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="relative min-h-screen text-[#e8eaf0] selection:bg-[#a3ff00]/30">
      <SceneBackground />
      <Navbar onStartCheckout={openCheckout} />

      <main>
        <Hero onStartCheckout={openCheckout} onScrollServices={scrollToServices} />
        <ServiceCatalog onSelectService={openCheckoutForService} />
        <FAQAccordion />
        <Contact onStartCheckout={openCheckout} />
      </main>

      <Footer />

      <CheckoutWizard
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        initialProjectTypeId={initialProjectTypeId}
      />
    </div>
  );
}
