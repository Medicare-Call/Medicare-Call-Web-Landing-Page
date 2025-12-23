import React from "react";
import type { DesktopHeroSectionProps } from "../../types/types";

const DesktopHeroSection: React.FC<DesktopHeroSectionProps> = ({
  scrollToSection,
}) => {
  return (
    <section className="hidden md:block relative w-full overflow-hidden">
      <div className="absolute h-[550px] lg:h-[600px] left-0 top-0 w-full overflow-hidden pointer-events-none z-0">
        <img
          alt=""
          className="w-full h-full object-cover"
          src="/images/main.png"
        />
      </div>
      <div className="content-stretch flex flex-col gap-[50px] items-center relative shrink-0 w-full min-w-[713px]px-[100px] md:py-[118px] lg:py-[138px]">
        <div className="content-stretch flex flex-col gap-[20px] items-center relative shrink-0 w-full">
          <div
            style={{
              fontSize: "var(--t01-font-size)",
              lineHeight: "var(--t01-line-height)",
              fontWeight: "var(--t01-weight)",
            }}
            className="font-['Pretendard',sans-serif] min-w-full not-italic relative shrink-0 text-center text-white w-[392px]"
          >
            <p className="mb-0">바쁜 당신을 대신해</p>
            <p>메디가 매일 부모님 건강을 챙깁니다</p>
          </div>
          <div
            style={{
              fontSize: "var(--b01-font-size)",
              lineHeight: "var(--b01-line-height)",
              fontWeight: "var(--b01-r-weight)",
            }}
            className="content-stretch flex flex-col font-['Pretendard',sans-serif] gap-[10px] items-center not-italic relative shrink-0 text-[var(--mc-gray-3)] text-center text-nowrap whitespace-pre"
          >
            <p className="relative shrink-0">
              깜빡 잊으시는 부모님, 매번 챙겨드리기 힘든 바쁜 일상
            </p>
            <p className="relative shrink-0">
              이제 불안한 마음은 내려놓고, AI 케어콜에게 맡겨주세요.
            </p>
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
    </section>
  );
};

export default DesktopHeroSection;
