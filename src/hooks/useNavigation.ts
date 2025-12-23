import { useState, useEffect, useRef } from "react";

export const useNavigation = () => {
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const featuresRef = useRef<HTMLElement>(null);
  const featureMobileRef = useRef<HTMLElement>(null);
  const featureDesktopRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const scrollToSection = (id: string) => {
    let element: HTMLElement | null = null;

    switch (id) {
      case "features":
        element = featuresRef.current;
        break;
      case "testimonials":
        element = testimonialsRef.current;
        break;
      case "contact":
        element = contactRef.current;
        break;
    }

    if (element) {
      const headerHeight = 62;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setActiveSection(id);
    }

    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const featureParts = [
        featuresRef.current,
        featureMobileRef.current,
        featureDesktopRef.current,
      ];

      const isInFeatures = featureParts.some((el) => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= window.innerHeight && rect.bottom >= 100;
      });

      if (isInFeatures) {
        setActiveSection("features");
        return;
      }

      // Check testimonials section
      if (testimonialsRef.current) {
        const rect = testimonialsRef.current.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection("testimonials");
          return;
        }
      }

      // Check contact section
      if (contactRef.current) {
        const rect = contactRef.current.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection("contact");
          return;
        }
      }

      if (featuresRef.current) {
        const rect = featuresRef.current.getBoundingClientRect();
        if (rect.top > 100) {
          setActiveSection("");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return {
    activeSection,
    mobileMenuOpen,
    setMobileMenuOpen,
    scrollToSection,
    featuresRef,
    featureMobileRef,
    featureDesktopRef,
    testimonialsRef,
    contactRef,
  };
};
