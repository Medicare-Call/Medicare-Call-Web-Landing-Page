import type { ConsultationFormData } from "../types/types";

export const validateForm = (data: ConsultationFormData) => {
  const errors: Record<keyof ConsultationFormData, string> = {
    name: "",
    phone: "",
    message: "",
  };

  if (!data.name.trim()) {
    errors.name = "성함을 입력해주세요";
  }
  if (!data.phone.trim()) {
    errors.phone = "연락처를 입력해주세요";
  }
  return errors;
};
