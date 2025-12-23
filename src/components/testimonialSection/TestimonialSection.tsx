import type React from "react";
import type { TestimonialSectionProps } from "../../types/types";
import MobileTestimonials from "./MobileTestimonial";
import DesktopTestimonials from "./DesktopTestimonial";

const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  testimonialsRef,
}) => {
  return (
    <section
      id="testimonials"
      ref={testimonialsRef}
      className="py-[80px] bg-white overflow-hidden"
    >
      <h2
        style={{
          fontSize: "var(--t03-font-size)",
          lineHeight: "var(--t03-line-height)",
          fontWeight: "var(--t03-b-weight)",
        }}
        className="md:text-[var(--t02-font-size)] md:leading-[var(--t02-line-height)] md:font-[var(--t02-weight)] text-black text-center mb-[60px]"
      >
        <span className="md:hidden block">
          메디케어콜과
          <br />
          함께하는 분들의 이야기
        </span>
        <span className="hidden md:block">
          메디케어콜과 함께하는 분들의 이야기
        </span>
      </h2>

      {/* 모바일 */}
      <div className="md:hidden">
        <MobileTestimonials />
      </div>

      {/* 데스크탑 */}
      <DesktopTestimonials />
    </section>
  );
};

export default TestimonialSection;
