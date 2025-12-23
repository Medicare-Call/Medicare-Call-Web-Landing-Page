export const formFieldsConfig = [
  {
    name: "name",
    label: "자녀분 성함",
    type: "text",
    placeholder: "성함을 입력해주세요",
    required: true,
  },
  {
    name: "phone",
    label: "연락처",
    type: "tel",
    placeholder: "'-'없이 숫자만 입력해주세요",
    required: true,
  },
  {
    name: "email",
    label: "이메일",
    type: "email",
    placeholder: "답변 받으실 이메일 주소 입력해주세요",
    required: true,
  },
] as const;

export const textAreaFieldConfig = {
  name: "message",
  label: "문의 내용",
  placeholder: "서비스에 대해 궁금한 점을 자유롭게 남겨주세요.",
  required: false,
} as const;
