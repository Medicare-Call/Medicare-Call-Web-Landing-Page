import type React from "react";
import type { DesktopReportSectionProps } from "../../types/types";

const DesktopReportSection: React.FC<DesktopReportSectionProps> = ({
  featureDesktopRef,
}) => {
  return (
    <section
      ref={featureDesktopRef}
      className="hidden md:block relative shrink-0 w-full bg-white feature-desktop"
    >
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-[100px] lg:px-[312px] py-[90px] lg:py-[100px] relative w-full">
          <div className="content-stretch flex flex-col lg:flex-row gap-[80px] lg:gap-[194px] items-start lg: relative shrink-0 w-full justify-center">
            <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full lg:w-[345.739px]">
              <div className="content-stretch flex flex-col gap-[16px] items-start not-italic relative shrink-0 w-full">
                <div
                  style={{
                    fontSize: "var(--t04-font-size)",
                    lineHeight: "var(--t04-line-height)",
                    fontWeight: "var(--t04-b-weight)",
                  }}
                  className="font-['Pretendard',sans-serif] lg:text-[var(--t02-font-size)] lg:leading-[var(--t02-line-height)] lg:font-[var(--t02-weight)] text-neutral-950 w-full"
                >
                  <p className="mb-0">손안에서 확인하는</p>
                  <p>부모님 건강 리포트</p>
                </div>
                <p
                  style={{
                    fontSize: "var(--b03-font-size)",
                    lineHeight: "var(--b03-line-height)",
                    fontWeight: "var(--b03-r-weight)",
                  }}
                  className="font-['Pretendard',sans-serif] relative shrink-0 text-[var(--mc-gray-5)] w-full"
                >
                  바쁜 일상 속에서도 터치 한 번으로 부모님의 건강 상태를 언제
                  어디서든 쉽고 빠르게 확인할 수 있습니다.
                </p>
              </div>

              <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                <div className="content-stretch flex gap-[11.398px] items-center relative shrink-0">
                  <div className="relative shrink-0 size-[22px]">
                    <img src="/icons/check.svg" alt="check" />
                  </div>
                  <p
                    style={{
                      fontSize: "var(--b03-font-size)",
                      lineHeight: "var(--b03-line-height)",
                      fontWeight: "var(--b03-r-weight)",
                    }}
                    className="font-['Pretendard',sans-serif] not-italic relative shrink-0 text-[var(--mc-gray-10)] text-nowrap whitespace-pre"
                  >
                    오늘의 컨디션, 식사, 복약 정보 요약
                  </p>
                </div>

                <div className="content-stretch flex gap-[11.398px] items-center relative shrink-0">
                  <div className="relative shrink-0 size-[22px]">
                    <img src="/icons/warning.svg" alt="warning" />
                  </div>
                  <p
                    style={{
                      fontSize: "var(--b03-font-size)",
                      lineHeight: "var(--b03-line-height)",
                      fontWeight: "var(--b03-r-weight)",
                    }}
                    className="font-['Pretendard',sans-serif] not-italic relative shrink-0 text-[var(--mc-gray-10)] text-nowrap whitespace-pre"
                  >
                    AI가 감지한 건강 위험 신호 즉시 알림
                  </p>
                </div>

                <div className="content-stretch flex gap-[11.398px] items-center relative shrink-0 w-full">
                  <div className="overflow-clip relative shrink-0 size-[22px]">
                    <img src="/icons/calendar.svg" alt="calendar" />
                  </div>
                  <p
                    style={{
                      fontSize: "var(--b03-font-size)",
                      lineHeight: "var(--b03-line-height)",
                      fontWeight: "var(--b03-r-weight)",
                    }}
                    className="font-['Pretendard',sans-serif] not-italic relative shrink-0 text-[var(--mc-gray-10)] text-nowrap whitespace-pre"
                  >
                    주간/월간 건강 데이터 추이 분석 그래프
                  </p>
                </div>
              </div>
            </div>

            <div className="h-[350px] lg:h-[396px] relative shrink-0 w-[250px] lg:w-[278px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img
                  alt="부모님의 건강 상태와 복약 정보를 확인할 수 있는 모바일 리포트 화면"
                  className="absolute h-[147.98%] left-0 max-w-none top-0 w-[100.01%]"
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

export default DesktopReportSection;
