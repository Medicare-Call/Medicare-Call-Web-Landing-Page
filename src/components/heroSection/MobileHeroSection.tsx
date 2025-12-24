import React from "react";
import type { MobileHeroSectionProps } from "../../types/types";

const MobileHeroSection: React.FC<MobileHeroSectionProps> = ({
  scrollToSection,
}) => {
  return (
    <section className="md:hidden relative w-full overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          alt="부모님이 핸드폰으로 통화하는 모습"
          className="absolute h-[172.74%] left-[-194.48%] max-w-none top-[-14.29%] w-[376.92%]"
          src="/images/main.png"
        />
      </div>
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center px-[16px] py-[80px] relative size-full">
          <div className="basis-0 content-stretch flex flex-col gap-[50px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
            <div className="content-stretch flex flex-col gap-[20px] items-center relative shrink-0 w-full">
              <div
                style={{
                  fontSize: "var(--t02-font-size)",
                  lineHeight: "var(--t02-line-height)",
                  fontWeight: "var(--t02-weight)",
                }}
                className="font-['Pretendard',sans-serif] min-w-full not-italic relative shrink-0 text-center text-white w-[min-content]"
              >
                <p className="mb-0">바쁜 당신을 대신해</p>
                <p className="mb-0">메디가 매일 부모님</p>
                <p>건강을 챙깁니다</p>
              </div>
              <div
                style={{
                  fontSize: "var(--b02-font-size)",
                  lineHeight: "var(--b02-line-height)",
                  fontWeight: "var(--b02-r-weight)",
                }}
                className="content-stretch flex flex-col font-['Pretendard',sans-serif] gap-[10px] items-center not-italic relative shrink-0 text-[var(--mc-gray-3)] text-center w-[249px]"
              >
                <div className="relative shrink-0 w-[239px]">
                  <p className="mb-0">깜빡 잊으시는 부모님,</p>
                  <p>매번 챙겨드리기 힘든 바쁜 일상</p>
                </div>
                <div className="min-w-full relative shrink-0 w-[min-content]">
                  <p className="mb-0">이제 불안한 마음은 내려놓고,</p>
                  <p>AI 케어콜에게 맡겨주세요.</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-[var(--mc-main-color)] box-border content-stretch flex gap-[10px] items-center justify-center px-[26px] py-[16px] relative rounded-[10px] shrink-0 hover:bg-[var(--mc-main-g500)] transition-all duration-300 cursor-pointer border-none"
            >
              <p
                style={{
                  fontSize: "var(--t05-font-size)",
                  lineHeight: "var(--t05-line-height)",
                  fontWeight: "var(--t05-sb-weight)",
                }}
                className="font-['Pretendard',sans-serif] not-italic relative shrink-0 text-neutral-50 text-nowrap whitespace-pre"
              >
                지금 바로 상담 신청하기
              </p>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileHeroSection;
