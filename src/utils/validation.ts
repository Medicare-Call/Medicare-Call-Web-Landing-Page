import type { ConsultationFormData } from "../types/types";

export const validateForm = (data: ConsultationFormData) => {
  const errors: Record<keyof ConsultationFormData, string> = {
    name: "",
    phone: "",
    email: "",
    message: "",
  };

  if (!data.name.trim()) {
    errors.name = "성함을 입력해주세요";
  }
  if (!data.phone.trim()) {
    errors.phone = "연락처를 입력해주세요";
  }
  const email = data.email.trim();
  if (!email) {
    errors.email = "이메일을 입력해주세요";
  } else {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      errors.email = "올바른 이메일 형식(영문)으로 입력해주세요";
    }
  }
  return errors;
};
