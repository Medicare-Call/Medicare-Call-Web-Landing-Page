import React from "react";
import type { MobileHeaderProps } from "../../types/types";
import { mobileNavigationItems } from "../../constants/navigation";

const MobileHeader: React.FC<MobileHeaderProps> = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  activeSection,
  scrollToSection,
}) => {
  return (
    <>
      {/* Mobile Sticky Header */}
      <div className="md:hidden backdrop-blur-sm backdrop-filter bg-[rgba(255,255,255,0.7)] shrink-0 sticky top-0 w-full z-50">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-[16px] py-[19px] relative w-full">
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

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden overflow-clip relative shrink-0 size-[24px]"
            >
              <img src="/icons/hamburger.svg" />
              <div className="absolute bottom-1/2 left-[16.67%] right-[16.67%] top-1/2">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 18 2"
                >
                  <path
                    d="M0.999806 0.999806H16.9967"
                    stroke="var(--mc-gray-5)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.99961"
                  />
                </svg>
              </div>
              <div className="absolute inset-[79.17%_16.67%_20.83%_16.67%]">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 18 2"
                >
                  <path
                    d="M0.999806 0.999806H16.9967"
                    stroke="var(--mc-gray-5)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.99961"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-0 left-0 right-0 bottom-0 bg-white z-[9999] overflow-y-auto">
          <div className="flex pt-4 pb-6 px-4 justify-end">
            <img
              src="/icons/x_mobile.svg"
              onClick={() => setMobileMenuOpen(false)}
              alt="닫기"
            />
          </div>
          <div className="flex flex-col">
            {mobileNavigationItems.map((item) => (
              <div key={item.id} className="px-4 py-[6px]">
                <button
                  onClick={() => scrollToSection(item.id)}
                  style={{
                    fontSize: "var(--b01-font-size)",
                    lineHeight: "var(--b01-line-height)",
                    fontWeight: "var(--b01-m-weight)",
                  }}
                  className={`w-full px-4 py-[10px] text-left transition-colors rounded-[10px]
            ${
              activeSection === item.id
                ? "bg-[var(--mc-gray-1)]"
                : "hover:bg-[var(--mc-gray-1)]"
            } text-[var(--mc-gray-9)]`}
                >
                  {item.label}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MobileHeader;
