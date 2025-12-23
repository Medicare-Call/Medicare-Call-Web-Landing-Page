import React from "react";
import type { DesktopHeaderProps } from "../../types/types";
import { desktopNavigationItems } from "../../constants/navigation";

const DesktopHeader: React.FC<DesktopHeaderProps> = ({
  activeSection,
  scrollToSection,
}) => {
  return (
    <div className="hidden md:block backdrop-blur-sm backdrop-filter bg-[rgba(255,255,255,0.7)] shrink-0 sticky top-0 w-full z-50">
      <div className="box-border content-stretch flex flex-col gap-[10px] items-start py-[12px] px-[60px] lg:px-[120px] relative w-full">
        <div className="content-stretch flex items-center justify-between relative shrink-0 w-full mx-auto">
          <div
            className="content-stretch flex h-[19px] items-center relative shrink-0 w-[134px] cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="basis-0 grow h-[19.473px] min-h-px min-w-px relative shrink-0">
              <img
                alt="메디케어콜 로고"
                className="absolute bg-clip-padding border-0 border-[transparent] border-solid box-border inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
                src="/images/medicare.png"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="content-stretch gap-[18px] items-center relative shrink-0 flex">
            {desktopNavigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="box-border flex items-center justify-center px-[16px] py-[10px] rounded-[6px] transition-colors hover:bg-[var(--mc-gray-1)]"
              >
                <p
                  style={{
                    fontSize: "var(--b03-font-size)",
                    lineHeight: "var(--b03-line-height)",
                    fontWeight:
                      activeSection === item.id
                        ? "var(--b03-sb-weight)"
                        : "var(--b03-r-weight)",
                  }}
                  className={`font-['Pretendard',sans-serif] whitespace-pre transition-colors ${
                    activeSection === item.id
                      ? "text-black"
                      : "text-[var(--mc-gray-5)]"
                  }`}
                >
                  {item.label}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopHeader;
