import type React from "react";
import type { ContactSectionProps } from "../../types/types";
import FormField from "./FormField";
import TextAreaField from "./TextAreaField";
import { formFieldsConfig, textAreaFieldConfig } from "../../constants/formFields";

const ContactSection: React.FC<ContactSectionProps> = ({
  contactRef,
  formData,
  validationErrors,
  isSubmitting,
  handleChange,
  handleBlur,
  handleSubmit,
}) => {
  return (
    <section
      id="contact"
      ref={contactRef}
      className="bg-white relative shrink-0 w-full"
    >
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[10px] items-center justify-center px-4 md:px-[100px] lg:w-[561px] py-[60px] box-content md:py-[90px] lg:py-[100px] relative w-full">
          <div className="basis-0 content-stretch flex flex-col gap-[32px] md:gap-[70px] lg:gap-[80px] grow items-center min-h-px min-w-px relative shrink-0">
            <div className="content-stretch flex flex-col gap-[20px] md:gap-[27px] items-end relative shrink-0 w-full">
              <div
                style={{
                  fontSize: "var(--t03-font-size)",
                  lineHeight: "var(--t03-line-height)",
                  fontWeight: "var(--t03-b-weight)",
                }}
                className="font-['Pretendard',sans-serif] md:text-[var(--t04-font-size)] md:leading-[var(--t04-line-height)] md:font-[var(--t04-b-weight)] lg:text-[var(--t02-font-size)] lg:leading-[var(--t02-line-height)] lg:font-[var(--t02-weight)] not-italic relative shrink-0 text-[#313131] text-center w-full"
              >
                <p className="mb-0">더 늦기 전에,</p>
                <p className="mb-0 md:hidden">부모님께 스마트한 안부를</p>
                <p className="md:hidden">선물하세요</p>
                <p className="hidden md:block">
                  부모님께 스마트한 안부를 선물하세요
                </p>
              </div>
              <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
                <p
                  style={{
                    fontSize: "var(--b02-font-size)",
                    lineHeight: "var(--b02-line-height)",
                    fontWeight: "var(--b02-r-weight)",
                  }}
                  className="font-['Pretendard',sans-serif] md:text-[var(--b01-font-size)] md:leading-[var(--b01-line-height)] not-italic relative shrink-0 text-[var(--mc-gray-5)] text-center w-full md:whitespace-pre"
                >
                  <span className="md:hidden">궁금하신 점을 남겨주시면</span>
                  <span className="md:hidden">
                    <br />
                  </span>
                  <span className="md:hidden">
                    전문 컨설턴트가 친절하게 상담해 드리겠습니다.
                  </span>
                  <span className="hidden md:inline">
                    궁금하신 점을 남겨주시면 전문 컨설턴트가 친절하게 상담해
                    드리겠습니다.
                  </span>
                </p>
              </div>
            </div>

            <div className="bg-neutral-50 relative rounded-[20px] md:rounded-[30px] shrink-0 w-full">
              <div className="flex flex-row items-center size-full">
                <div className="box-border content-stretch flex gap-[10px] items-center p-[20px] md:p-[30px] relative w-full">
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-row items-center self-stretch w-full"
                    noValidate
                  >
                    <div className="content-stretch flex flex-col gap-[50px] md:gap-[50px] h-full items-start relative shrink-0 w-full">
                      <div className="content-stretch flex flex-col gap-[24px] md:gap-[36px] items-start relative shrink-0 w-full">
                        {formFieldsConfig.map((field) => (
                          <FormField
                            key={field.name}
                            label={field.label}
                            name={field.name}
                            type={field.type}
                            value={formData[field.name as keyof typeof formData]}
                            placeholder={field.placeholder}
                            required={field.required}
                            error={validationErrors[field.name as keyof typeof validationErrors]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        ))}

                        <TextAreaField
                          label={textAreaFieldConfig.label}
                          name={textAreaFieldConfig.name}
                          value={formData.message}
                          placeholder={textAreaFieldConfig.placeholder}
                          required={textAreaFieldConfig.required}
                          onChange={handleChange}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[var(--mc-main-color)] relative rounded-[10px] shrink-0 w-full hover:bg-[var(--mc-main-g500)] transition-all disabled:opacity-50 disabled:cursor-not-allowed border-0 cursor-pointer"
                      >
                        <div className="flex flex-row items-center justify-center size-full">
                          <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[20px] md:px-[26px] py-[14px] md:py-[16px] relative w-full">
                            <p
                              style={{
                                fontSize: "var(--b01-font-size)",
                                lineHeight: "var(--b01-line-height)",
                                fontWeight: "var(--b01-sb-weight)",
                              }}
                              className="font-['Pretendard',sans-serif] md:leading-[var(--t05-line-height)] md:font-[var(--t05-sb-weight)] not-italic relative shrink-0 text-neutral-50 text-nowrap whitespace-pre"
                            >
                              {isSubmitting
                                ? "신청 중..."
                                : "무료 상담 신청하기"}
                            </p>
                          </div>
                        </div>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
