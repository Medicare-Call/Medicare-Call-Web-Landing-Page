import type React from "react";
import type { MobileReportSectionProps } from "../../types/types";

const MobileReportSection: React.FC<MobileReportSectionProps> = ({
  featureMobileRef,
}) => {
  return (
    <section
      ref={featureMobileRef}
      className="md:hidden bg-neutral-50 relative size-full feature-mobile"
    >
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center px-[16px] py-[60px] relative size-full">
          <div className="basis-0 content-stretch flex flex-col gap-[32px] grow items-center min-h-px min-w-px relative shrink-0">
            <div className="content-stretch flex flex-col gap-[32px] items-center relative shrink-0 w-full">
              <div className="content-stretch flex flex-col gap-[16px] items-start not-italic relative shrink-0 text-center w-full">
                <div
                  style={{
                    fontSize: "var(--t03-font-size)",
                    lineHeight: "var(--t03-line-height)",
                    fontWeight: "var(--t03-b-weight)",
                  }}
                  className="font-['Pretendard',sans-serif] relative shrink-0 text-neutral-950 w-full"
                >
                  <p className="mb-0">손안에서 확인하는</p>
                  <p>부모님 건강 리포트</p>
                </div>
                <div
                  style={{
                    fontSize: "var(--b02-font-size)",
                    lineHeight: "var(--b02-line-height)",
                    fontWeight: "var(--b02-r-weight)",
                  }}
                  className="font-['Pretendard',sans-serif] relative shrink-0 text-[var(--mc-gray-5)] w-full"
                >
                  <p className="mb-0">바쁜 일상 속에서도 터치 한 번으로</p>
                  <p>부모님의 건강 상태를 언제 어디서든</p>
                  <p>쉽고 빠르게 확인할 수 있습니다.</p>
                </div>
              </div>

              <div className="content-stretch flex flex-col gap-[16px] items-center justify-center relative shrink-0">
                <div className="content-stretch flex gap-[11.398px] items-center relative shrink-0">
                  <div className="relative shrink-0 size-[22px]">
                    <img src="/icons/check.svg" alt="check" />
                  </div>
                  <p className="font-['Pretendard',sans-serif] text-[var(--b02-font-size)] leading-[var(--b02-line-height)] font-[var(--b02-r-weight)] not-italic relative shrink-0 text-black text-nowrap whitespace-pre">
                    오늘의 컨디션, 식사, 복약 정보 요약
                  </p>
                </div>

                <div className="content-stretch flex gap-[11.398px] items-center relative shrink-0">
                  <div className="relative shrink-0 size-[22px]">
                    <img src="/icons/warning.svg" alt="warning" />
                  </div>
                  <p className="font-['Pretendard',sans-serif] text-[var(--b02-font-size)] leading-[var(--b02-line-height)] font-[var(--b02-r-weight)] not-italic relative shrink-0 text-black text-nowrap whitespace-pre">
                    AI가 감지한 건강 위험 신호 즉시 알림
                  </p>
                </div>

                <div className="content-stretch flex gap-[11.398px] items-center relative shrink-0 w-full">
                  <div className="overflow-clip relative shrink-0 size-[22px]">
                    <img src="/icons/calendar.svg" alt="calendar" />
                  </div>
                  <p className="font-['Pretendard',sans-serif] text-[var(--b02-font-size)] leading-[var(--b02-line-height)] font-[var(--b02-r-weight)] not-italic relative shrink-0 text-black text-nowrap whitespace-pre">
                    주간/월간 건강 데이터 추이 분석 그래프
                  </p>
                </div>
              </div>
            </div>

            <div className="h-[314px] relative shrink-0 w-[240px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img
                  alt="부모님의 건강 상태와 복약 정보를 확인할 수 있는 모바일 리포트 화면"
                  className="absolute h-[160.99%] left-0 max-w-none top-0 w-[100.01%]"
                  src="/images/parent-health-report-mobile-preview.png"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileReportSection;
