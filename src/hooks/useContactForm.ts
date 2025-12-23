import { useState } from "react";
import { projectId, publicAnonKey } from "../utils/supabase/info";
import { validateForm } from "../utils/validation";
import type {
  ConsultationFormData,
  ValidationErrorsState,
} from "../types/types";

export const useContactForm = () => {
  const [formData, setFormData] = useState<ConsultationFormData>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [validationErrors, setValidationErrors] =
    useState<ValidationErrorsState>({
      name: "",
      phone: "",
      email: "",
    });

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const key = name as keyof ConsultationFormData;

    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));

    if (
      hasSubmitted &&
      (key === "name" || key === "phone" || key === "email")
    ) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [key]: "",
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const key = name as keyof ValidationErrorsState;

    if (hasSubmitted) {
      const allErrors = validateForm(formData);

      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [key]: allErrors[key] || "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setHasSubmitted(true);

    const allErrors = validateForm(formData);
    const requiredErrors: ValidationErrorsState = {
      name: allErrors.name,
      phone: allErrors.phone,
      email: allErrors.email,
    };

    setValidationErrors(requiredErrors);

    if (Object.values(requiredErrors).some((error) => error)) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-6e07f166/consultations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (result.success) {
        alert("상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.");
        setFormData({ name: "", phone: "", email: "", message: "" });
        setValidationErrors({ name: "", phone: "", email: "" });
        setHasSubmitted(false);
      } else {
        alert(result.error || "상담 신청 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("상담 신청 오류:", error);
      alert("상담 신청 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    validationErrors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};
