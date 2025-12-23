import type React from "react";
import type { HowItWorksSectionProps } from "../../types/types";
import { howItWorksSteps } from "../../constants/howItWorksSteps";

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  featuresRef,
}) => {
  return (
    <section
      id="features"
      ref={featuresRef}
      className="bg-[#f4fcf8] relative shrink-0 w-full"
    >
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-4 md:px-[100px] lg:px-[182px] py-[60px] md:py-[60px] lg:py-[70px] relative w-full">
          <div className="content-stretch flex flex-col gap-[52px] md:gap-[70px] lg:gap-[80px] items-center relative shrink-0 w-full">
            <div className="content-stretch flex flex-col gap-[20px] md:gap-[27px] items-end relative shrink-0 w-full">
              <div
                style={{
                  fontSize: "var(--t03-font-size)",
                  lineHeight: "var(--t03-line-height)",
                  fontWeight: "var(--t03-b-weight)",
                }}
                className="font-['Pretendard',sans-serif] md:text-[var(--t02-font-size)] md:leading-[var(--t02-line-height)] md:font-[var(--t02-weight)] not-italic relative shrink-0 text-[var(--mc-gray-8)] text-center w-full"
              >
                <p className="mb-0 md:hidden">메디케어콜 AI가</p>
                <p className="mb-0 md:hidden">똑똑하게 부모님과</p>
                <p className="md:hidden">소통합니다.</p>
                <p className="hidden md:block mb-0">메디케어콜 AI가</p>
                <p className="hidden md:block">
                  똑똑하게 부모님과 소통합니다.
                </p>
              </div>
              <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
                <p
                  style={{
                    fontSize: "var(--b02-font-size)",
                    lineHeight: "var(--b02-line-height)",
                    fontWeight: "var(--b02-r-weight)",
                  }}
                  className="font-['Pretendard',sans-serif] md:text-[var(--b01-font-size)] md:leading-[var(--b01-line-height)] not-italic relative shrink-0 text-[#666666] text-center w-full md:whitespace-pre"
                >
                  <span className="md:hidden">
                    단 3단계로 부모님의 건강과
                  </span>
                  <span className="md:hidden">
                    <br />
                  </span>
                  <span className="md:hidden">
                    자녀의 평온한일상을 지켜드립니다.
                  </span>
                  <span className="hidden md:inline">
                    단 3단계로 부모님의 건강과 자녀의 평온한일상을
                    지켜드립니다.
                  </span>
                </p>
              </div>
            </div>

            <div className="content-stretch flex flex-col md:flex-row gap-[12px] md:gap-[30px] items-center md:items-stretch justify-center w-full">
              {howItWorksSteps.map((step) => (
                <div
                  key={step.id}
                  className="w-full md:flex-1 bg-white box-border flex flex-col gap-[10px]
                 items-center justify-center px-[28px] py-[20px] relative rounded-[20px]
                 shadow-[-4px_0px_8px_0px_rgba(34,34,34,0.02),4px_0px_8px_0px_rgba(34,34,34,0.02),0px_4px_8px_0px_rgba(34,34,34,0.02)]
                 md:max-w-[338px]"
                >
                  <div className="flex flex-col gap-[28px] items-center w-full">
                    <div className="relative shrink-0 size-[80px]">
                      {step.icon}
                    </div>
                    <div className="flex flex-col gap-[16px] items-center text-center w-full">
                      <p
                        style={{
                          fontSize: "var(--b02-font-size)",
                          lineHeight: "var(--b02-line-height)",
                          fontWeight: "var(--b02-sb-weight)",
                        }}
                        className="font-['Pretendard',sans-serif] md:font-[var(--b02-b-weight)] text-neutral-950 w-full"
                      >
                        {step.id}. {step.title}
                      </p>
                      <div
                        style={{
                          fontSize: "var(--b03-font-size)",
                          lineHeight: "var(--b03-line-height)",
                          fontWeight: "var(--b03-r-weight)",
                        }}
                        className="font-['Pretendard',sans-serif] text-[var(--mc-gray-5)] w-full"
                      >
                        <p className="mb-0">{step.desc1}</p>
                        <p className="mb-0">{step.desc2}</p>
                        <p>{step.desc3}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
