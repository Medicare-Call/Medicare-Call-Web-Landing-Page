import { useState } from "react";
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
        `/api/server/make-server-6e07f166/consultations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const raw = await response.text();
      let result: any = null;
      try {
        result = raw ? JSON.parse(raw) : null;
      } catch {
        throw new Error(`API 응답 파싱 실패: ${raw?.slice(0, 200)}`);
      }

      if (response.ok && result?.success) {
        alert("상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.");
        setFormData({ name: "", phone: "", email: "", message: "" });
        setValidationErrors({ name: "", phone: "", email: "" });
        setHasSubmitted(false);
      } else {
        const detail = result?.debug ? `\n(${result.debug})` : "";
        alert((result?.error || "상담 신청 중 오류가 발생했습니다.") + detail);
      }
    } catch (error) {
      console.error("상담 신청 오류:", error);
      alert(`상담 신청 중 오류가 발생했습니다.\n${error instanceof Error ? error.message : ""}`);
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
