import MobileHeader from "./components/header/MobileHeader";
import DesktopHeader from "./components/header/DesktopHeader";
import Footer from "./components/footer/footer";
import MobileHeroSection from "./components/heroSection/MobileHeroSection";
import DesktopHeroSection from "./components/heroSection/DesktopHeroSection";
import MobileProblemSection from "./components/problemSection/MobileProblemSection";
import DesktopProblemSection from "./components/problemSection/DesktopProblemSection";
import FeatureSection from "./components/featureSection/FeatureSection";
import TestimonialSection from "./components/testimonialSection/TestimonialSection";
import ContactSection from "./components/contactSection/ContactSection";
import { useNavigation } from "./hooks/useNavigation";
import { useContactForm } from "./hooks/useContactForm";

export default function App() {
  const navigation = useNavigation();
  const contactForm = useContactForm();

  return (
    <div className="relative bg-neutral-50 min-h-screen">
      {/* GNB - Sticky Header */}
      <MobileHeader
        mobileMenuOpen={navigation.mobileMenuOpen}
        setMobileMenuOpen={navigation.setMobileMenuOpen}
        activeSection={navigation.activeSection}
        scrollToSection={navigation.scrollToSection}
      />
      <DesktopHeader
        activeSection={navigation.activeSection}
        scrollToSection={navigation.scrollToSection}
      />

      {/* Hero Section */}
      <MobileHeroSection scrollToSection={navigation.scrollToSection} />
      <DesktopHeroSection scrollToSection={navigation.scrollToSection} />

      {/* Problem Section */}
      <MobileProblemSection />
      <DesktopProblemSection />

      <FeatureSection
        featuresRef={navigation.featuresRef}
        featureMobileRef={navigation.featureMobileRef}
        featureDesktopRef={navigation.featureDesktopRef}
      />

      <TestimonialSection testimonialsRef={navigation.testimonialsRef} />

      <ContactSection
        contactRef={navigation.contactRef}
        formData={contactForm.formData}
        validationErrors={contactForm.validationErrors}
        isSubmitting={contactForm.isSubmitting}
        handleChange={contactForm.handleChange}
        handleBlur={contactForm.handleBlur}
        handleSubmit={contactForm.handleSubmit}
      />

      <Footer />
    </div>
  );
}
