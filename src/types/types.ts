export interface ConsultationFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export interface ValidationErrorsState {
  name: string;
  phone: string;
  email: string;
}

// Component Props Interfaces

// Header Components
export interface MobileHeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  activeSection: string;
  scrollToSection: (id: string) => void;
}

export interface DesktopHeaderProps {
  activeSection: string;
  scrollToSection: (id: string) => void;
}

// Hero Section Components
export interface MobileHeroSectionProps {
  scrollToSection: (id: string) => void;
}

export interface DesktopHeroSectionProps {
  scrollToSection: (id: string) => void;
}

// Feature Section Components
export interface FeatureSectionProps {
  featuresRef: React.RefObject<HTMLElement | null>;
  featureMobileRef: React.RefObject<HTMLElement | null>;
  featureDesktopRef: React.RefObject<HTMLElement | null>;
}

export interface HowItWorksSectionProps {
  featuresRef: React.RefObject<HTMLElement | null>;
}

export interface MobileReportSectionProps {
  featureMobileRef: React.RefObject<HTMLElement | null>;
}

export interface DesktopReportSectionProps {
  featureDesktopRef: React.RefObject<HTMLElement | null>;
}

// Testimonial Section Components
export interface TestimonialSectionProps {
  testimonialsRef: React.RefObject<HTMLElement | null>;
}

// Contact Section Components
export interface ContactSectionProps {
  contactRef: React.RefObject<HTMLElement | null>;
  formData: ConsultationFormData;
  validationErrors: ValidationErrorsState;
  isSubmitting: boolean;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  placeholder: string;
  required: boolean;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export interface TextAreaFieldProps {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  required: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
