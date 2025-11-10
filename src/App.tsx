import { useState, useEffect, useRef } from "react";
import { projectId, publicAnonKey } from "./utils/supabase/info";
import svgPaths from "./imports/svg-liasrdp5am";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [activeSection, setActiveSection] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonialRef = useRef<HTMLDivElement>(null);

  // Auto scroll testimonials every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Scroll to current testimonial
  useEffect(() => {
    if (testimonialRef.current) {
      const scrollWidth = testimonialRef.current.scrollWidth / 3;
      testimonialRef.current.scrollTo({
        left: scrollWidth * currentTestimonial,
        behavior: "smooth",
      });
    }
  }, [currentTestimonial]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.email) {
      alert("필수 정보를 모두 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-6e07f166/consultations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (result.success) {
        alert("상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.");
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else {
        alert(result.error || "상담 신청 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("상담 신청 오류:", error);
      alert("상담 신청 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 62;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setActiveSection(id);
    }

    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["features", "testimonials", "contact"];

      const featureParts = [
        document.querySelector('[id="features"]'),
        document.querySelector(".feature-mobile"),
        document.querySelector(".feature-desktop"),
      ];

      const isInFeatures = featureParts.some((el) => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= window.innerHeight * 0.4 && rect.bottom >= 80;
      });

      if (isInFeatures) {
        setActiveSection("features");
        return;
      }

      for (const id of sections.slice(1)) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(id);
            return;
          }
        }
      }

      const firstSection = document.getElementById("features");
      if (firstSection && firstSection.getBoundingClientRect().top > 100) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative bg-neutral-50 min-h-screen">
      {/* GNB - Sticky Header */}
      <div className="backdrop-blur-sm backdrop-filter bg-[rgba(255,255,255,0.7)] shrink-0 sticky top-0 w-full z-50">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-4 md:px-[60px] lg:px-[120px] py-[12px] relative w-full">
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-full mx-auto">
            <div
              className="content-stretch flex h-[19px] items-center relative shrink-0 w-[134px] cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <div className="basis-0 grow h-[19.473px] min-h-px min-w-px relative shrink-0">
                <img
                  alt="메디케어콜 로고"
                  className="absolute bg-clip-padding border-0 border-[transparent] border-solid box-border inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
                  src="./medicare.png"
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex content-stretch gap-[18px] items-center relative shrink-0">
              {[
                { id: "features", label: "핵심 기능" },
                { id: "testimonials", label: "이용 후기" },
                { id: "contact", label: "상담 신청" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={
                    "box-border flex items-center justify-center px-[16px] py-[10px] rounded-[6px] transition-colors hover:bg-[var(--mc-gray-1)]"
                  }
                >
                  <p
                    className={`font-['Pretendard',sans-serif] text-[14px] leading-[1.3] whitespace-pre transition-colors ${
                      activeSection === item.id
                        ? "text-black font-semibold"
                        : "text-[#666666]"
                    }`}
                  >
                    {item.label}
                  </p>
                </button>
              ))}
            </div>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden overflow-clip relative shrink-0 size-[24px]"
            >
              <div className="absolute inset-[20.83%_16.67%_79.17%_16.67%]">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 18 2"
                >
                  <path
                    d="M0.999806 0.999806H16.9967"
                    stroke="#666666"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.99961"
                  />
                </svg>
              </div>
              <div className="absolute bottom-1/2 left-[16.67%] right-[16.67%] top-1/2">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 18 2"
                >
                  <path
                    d="M0.999806 0.999806H16.9967"
                    stroke="#666666"
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
                    stroke="#666666"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.99961"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="flex flex-col py-2">
              <button
                onClick={() => scrollToSection("features")}
                className="px-4 py-3 text-left hover:bg-[#f4fcf8] transition-colors"
              >
                <p className="font-['Pretendard',sans-serif] text-[#666666] text-[14px]">
                  핵심 기능
                </p>
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="px-4 py-3 text-left hover:bg-[#f4fcf8] transition-colors"
              >
                <p className="font-['Pretendard',sans-serif] text-[#666666] text-[14px]">
                  이용 후기
                </p>
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="px-4 py-3 text-left hover:bg-[#f4fcf8] transition-colors"
              >
                <p className="font-['Pretendard',sans-serif] text-[#666666] text-[14px]">
                  상담 신청
                </p>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Hero Section - Mobile */}
      <section className="md:hidden relative w-full overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            alt=""
            className="absolute h-[172.74%] left-[-194.48%] max-w-none top-[-14.29%] w-[376.92%]"
            src="./main.png"
          />
        </div>
        <div className="flex flex-row items-center size-full">
          <div className="box-border content-stretch flex gap-[10px] items-center px-[16px] py-[80px] relative size-full">
            <div className="basis-0 content-stretch flex flex-col gap-[50px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
              <div className="content-stretch flex flex-col gap-[20px] items-center relative shrink-0 w-full">
                <div className="font-['Pretendard',sans-serif] font-bold leading-[1.3] min-w-full not-italic relative shrink-0 text-[32px] text-center text-white w-[min-content]">
                  <p className="mb-0">바쁜 당신을 대신해</p>
                  <p className="mb-0">메디가 매일 부모님</p>
                  <p>건강을 챙깁니다</p>
                </div>
                <div className="content-stretch flex flex-col font-['Pretendard',sans-serif] gap-[10px] items-center leading-[0] not-italic relative shrink-0 text-[#afafaf] text-[14px] text-center w-[249px]">
                  <div className="leading-[1.3] relative shrink-0 w-[239px]">
                    <p className="mb-0">깜빡 잊으시는 부모님,</p>
                    <p>매번 챙겨드리기 힘든 바쁜 일상</p>
                  </div>
                  <div className="leading-[1.3] min-w-full relative shrink-0 w-[min-content]">
                    <p className="mb-0">이제 불안한 마음은 내려놓고,</p>
                    <p>AI 케어콜에게 맡겨주세요.</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => scrollToSection("contact")}
                className="bg-[#35c156] box-border content-stretch flex gap-[10px] items-center justify-center px-[26px] py-[16px] relative rounded-[10px] shrink-0 hover:bg-[#00a350] transition-all duration-300 cursor-pointer border-none"
              >
                <p className="font-['Pretendard',sans-serif] font-semibold leading-[1.3] not-italic relative shrink-0 text-[20px] text-neutral-50 text-nowrap whitespace-pre">
                  지금 바로 상담 신청하기
                </p>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section - Desktop */}
      <section className="hidden md:block relative w-full overflow-hidden">
        <div className="absolute h-[550px] lg:h-[600px] left-0 top-0 w-full overflow-hidden pointer-events-none z-0">
          <img alt="" className="w-full h-full object-cover" src="./main.png" />
        </div>
        <div className="content-stretch flex flex-col gap-[50px] items-center relative shrink-0 w-full min-w-[713px]px-[100px] md:py-[118px] lg:py-[138px]">
          <div className="content-stretch flex flex-col gap-[20px] items-center relative shrink-0 w-full">
            <div className="font-['Pretendard',sans-serif] font-bold leading-[1.4] min-w-full not-italic relative shrink-0 text-[42px] lg:text-[50px] text-center text-white w-[392px]">
              <p className="mb-0">바쁜 당신을 대신해</p>
              <p>메디가 매일 부모님 건강을 챙깁니다</p>
            </div>
            <div className="content-stretch flex flex-col font-['Pretendard',sans-serif] gap-[10px] items-center leading-[1.3] not-italic relative shrink-0 text-[#afafaf] text-[18px] text-center text-nowrap whitespace-pre">
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
            className="bg-[#35c156] box-border content-stretch flex gap-[10px] items-center justify-center px-[26px] py-[16px] relative rounded-[10px] shrink-0 hover:bg-[#00a350] transition-all duration-300 cursor-pointer border-none"
          >
            <p className="font-['Pretendard',sans-serif] font-semibold leading-[1.3] not-italic relative shrink-0 text-[20px] text-neutral-50 text-nowrap whitespace-pre">
              지금 바로 상담 신청하기
            </p>
          </button>
        </div>
      </section>

      {/* Problem Section - Mobile */}
      <section
        id="problem"
        className="md:hidden relative shrink-0 w-full bg-white"
      >
        <div className="flex flex-row items-center size-full">
          <div className="box-border content-stretch flex gap-[10px] items-center px-[16px] py-[60px] relative size-full">
            <div className="basis-0 content-stretch flex flex-col gap-[52px] grow items-start min-h-px min-w-px relative shrink-0">
              <div className="content-stretch flex flex-col gap-[20px] items-start leading-[1.3] not-italic relative shrink-0 text-center w-full">
                <div className="font-['Pretendard',sans-serif] font-bold relative shrink-0 text-[#313131] text-[26px] w-full">
                  <p className="mb-0">혹시, 이런 걱정 하고</p>
                  <p>계신가요?</p>
                </div>
                <div className="font-['Pretendard',sans-serif] relative shrink-0 text-[#666666] text-[14px] w-full">
                  <p className="mb-0">부모님을 사랑하는 마음만큼,</p>
                  <p className="mb-0">현실의 벽은 높기만 합니다.</p>
                  <p className="mb-0">
                    메디케어콜은 자녀분들의 이런 깊은 고민에서
                  </p>
                  <p>시작되었습니다.</p>
                </div>
              </div>

              <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                {/* Card 1 */}
                <div className="h-[192px] relative rounded-[10px] shrink-0 w-full">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                    <img
                      alt="홀로 집에 계신 부모님이 창가에 앉아 창밖을 바라보는 모습"
                      className="absolute h-[143.99%] left-[-6.27%] max-w-none top-[-16.92%] w-[120.7%]"
                      src="./elderly-parent-alone-at-home.png"
                    />
                  </div>
                  <div className="flex flex-col justify-center size-full">
                    <div className="box-border content-stretch flex flex-col gap-[10px] h-[192px] items-start justify-center p-[20px] relative w-full">
                      <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[193px]">
                        <div className="font-['Pretendard',sans-serif] leading-[1.3] min-w-full not-italic relative shrink-0 text-[16px] text-white w-[min-content]">
                          <p className="mb-0">홀로 계신 부모님,</p>
                          <p>오늘 하루는 어떠셨을까?</p>
                        </div>
                        <div className="content-stretch flex flex-col gap-[8px] items-start leading-[1.3] not-italic relative shrink-0 w-[177px]">
                          <p className="font-['Pretendard',sans-serif] relative shrink-0 text-[#d2d2d2] text-[14px] w-full">
                            자녀와 떨어져 지내는 어르신
                          </p>
                          <p className="font-['Pretendard',sans-serif] font-bold relative shrink-0 text-[#10d266] text-[32px] w-full">
                            346만명
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="relative rounded-[10px] shrink-0 w-full">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                    <img
                      alt="손에 약을 들고 있는 어르신과 물잔을 건네는 모습"
                      className="absolute h-[223.94%] left-0 max-w-none top-[-73.79%] w-full"
                      src="./elderly-hand-holding-medicine-glass.png"
                    />
                  </div>
                  <div className="flex flex-col justify-center size-full">
                    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center p-[20px] relative w-full">
                      <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[193px]">
                        <div className="font-['Pretendard',sans-serif] leading-[1.3] min-w-full not-italic relative shrink-0 text-[16px] text-white w-[min-content]">
                          <p className="mb-0">드셔야 할 약이 많은데,</p>
                          <p>제때 챙겨 드셨을까?</p>
                        </div>
                        <div className="content-stretch flex flex-col gap-[8px] items-start leading-[1.3] not-italic relative shrink-0 w-[177px]">
                          <p className="font-['Pretendard',sans-serif] relative shrink-0 text-[#d2d2d2] text-[14px] w-full">
                            어르신 하루 평균 복약 수
                          </p>
                          <p className="font-['Pretendard',sans-serif] font-bold relative shrink-0 text-[#10d266] text-[32px] w-full">
                            5.3개 이상
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="h-[192px] relative rounded-[10px] shrink-0 w-full">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                    <img
                      alt=""
                      className="absolute h-[220.69%] left-[-33.67%] max-w-none top-[-47.13%] w-[162.98%]"
                      src="./senior-woman-confronting-alzheimer-disease.png"
                    />
                  </div>
                  <div className="flex flex-col justify-center size-full">
                    <div className="box-border content-stretch flex flex-col gap-[10px] h-[192px] items-start justify-center p-[20px] relative w-full">
                      <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[241px]">
                        <div className="font-['Pretendard',sans-serif] leading-[1.3] not-italic relative shrink-0 text-[16px] text-white w-full">
                          <p className="mb-0">바쁘다는 핑계로</p>
                          <p>또 안부전화를 놓쳤네</p>
                        </div>
                        <div className="content-stretch flex flex-col gap-[8px] items-start leading-[1.3] not-italic relative shrink-0 w-full">
                          <p className="font-['Pretendard',sans-serif] relative shrink-0 text-[#d2d2d2] text-[14px] w-full">
                            마음과 달리 자주 못하는 전화
                          </p>
                          <p className="font-['Pretendard',sans-serif] font-bold relative shrink-0 text-[#10d266] text-[32px] w-full">
                            불안한 자녀의 마음
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section - Desktop */}
      <section className="hidden md:block relative shrink-0 w-full bg-white">
        <div className="size-full">
          <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-[100px] lg:px-[192px] py-[100px] lg:py-[120px] relative w-full">
            <div className="content-stretch flex flex-col gap-[70px] lg:gap-[79px] items-center relative shrink-0 w-full">
              <div className="content-stretch flex flex-col gap-[27px] items-start relative shrink-0 w-full max-w-[432px]">
                <div className="font-['Pretendard',sans-serif] font-bold leading-[1.3] not-italic relative shrink-0 text-[#313131] text-[30px] lg:text-[32px] text-center w-full">
                  <p>혹시, 이런 걱정 하고 계신가요?</p>
                </div>
                <div className="content-stretch flex flex-col font-['Pretendard',sans-serif] gap-[10px] items-center leading-[1.3] not-italic relative shrink-0 text-[#666666] text-[18px] text-center w-full">
                  <p className="relative shrink-0">
                    부모님을 사랑하는 마음만큼, 현실의 벽은 높기만 합니다.
                  </p>
                  <p className="relative shrink-0">
                    메디케어콜은 자녀분들의 이런 깊은 고민에서 시작되었습니다.
                  </p>
                </div>
              </div>

              <div className="content-stretch flex flex-row gap-[33px] items-stretch relative shrink-0 w-full justify-center">
                {/* Card 1 */}
                <div className="h-[450px] lg:h-[480px] relative rounded-[20px] shrink-0 w-[300px] lg:w-[330px] overflow-hidden">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[20px] z-0">
                    <img
                      alt="홀로 집에 계신 부모님이 창가에 앉아 창밖을 바라보는 모습"
                      className="absolute h-full left-[-36.76%] max-w-none top-0 w-[217.98%] object-cover"
                      src="/elderly-parent-alone-at-home.png"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                  </div>
                  <div className="box-border content-stretch flex gap-[10px] items-center px-[28px] py-[30px] relative size-full z-10">
                    <div className="content-stretch flex flex-col h-full items-start justify-between relative shrink-0 w-[193px]">
                      <div className="font-['Pretendard',sans-serif] leading-[1.3] min-w-full not-italic relative shrink-0 text-[20px] text-white w-[min-content]">
                        <p className="mb-0">홀로 계신 부모님,</p>
                        <p>오늘 하루는 어떠셨을까?</p>
                      </div>
                      <div className="content-stretch flex flex-col gap-[8px] items-start leading-[1.3] not-italic relative shrink-0 w-[177px]">
                        <p className="font-['Pretendard',sans-serif] relative shrink-0 text-[#d2d2d2] text-[14px] w-full">
                          자녀와 떨어져 지내는 어르신
                        </p>
                        <p className="font-['Pretendard',sans-serif] font-bold relative shrink-0 text-[#10d266] text-[40px] w-full">
                          346만명
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="h-[450px] lg:h-[480px] relative rounded-[20px] shrink-0 w-[300px] lg:w-[329px] overflow-hidden">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[20px] z-0">
                    <img
                      alt="손에 약을 들고 있는 어르신과 물잔을 건네는 모습"
                      className="absolute h-full left-0 max-w-none top-0 w-[116.72%] object-cover"
                      src="./elderly-hand-holding-medicine-glass.png"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                  </div>
                  <div className="box-border content-stretch flex gap-[10px] items-center p-[30px] relative size-full z-10">
                    <div className="content-stretch flex flex-col h-full items-start justify-between relative shrink-0">
                      <div className="font-['Pretendard',sans-serif] leading-[1.3] not-italic relative shrink-0 text-[20px] text-white w-[176px]">
                        <p className="mb-0">드셔야 할 약이 많은데,</p>
                        <p>제때 챙겨 드셨을까?</p>
                      </div>
                      <div className="content-stretch flex flex-col gap-[8px] items-start leading-[1.3] not-italic relative shrink-0">
                        <p className="font-['Pretendard',sans-serif] min-w-full relative shrink-0 text-[#d2d2d2] text-[14px] w-[min-content]">
                          어르신 하루 평균 복약 수
                        </p>
                        <p className="font-['Pretendard',sans-serif] font-bold relative shrink-0 text-[#10d266] text-[40px] text-nowrap whitespace-pre">
                          5.3개 이상
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="h-[450px] lg:h-[480px] relative rounded-[20px] shrink-0 w-[300px] lg:w-[331px] overflow-hidden">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[20px] z-0">
                    <img
                      alt="창가에 앉아 있는 여성의 뒷모습, 부모님을 걱정하는 자녀의 마음을 표현한 이미지"
                      className="absolute h-full left-[-54.39%] max-w-none top-0 w-[206.39%] object-cover"
                      src="./daughter-worrying-about-elderly-parent.png"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                  </div>
                  <div className="box-border content-stretch flex gap-[10px] items-center p-[30px] relative size-full z-10">
                    <div className="content-stretch flex flex-col gap-[200px] lg:gap-[238px] h-full items-end relative shrink-0">
                      <div className="font-['Pretendard',sans-serif] leading-[1.3] min-w-full not-italic relative shrink-0 text-[20px] text-white w-[min-content]">
                        <p className="mb-0">바쁘다는 핑계로</p>
                        <p>또 안부전화를 놓쳤네</p>
                      </div>
                      <div className="content-stretch flex flex-col gap-[8px] items-start leading-[1.3] not-italic relative shrink-0 w-full">
                        <p className="font-['Pretendard',sans-serif] relative shrink-0 text-[#d2d2d2] text-[14px] w-full text-right">
                          마음과 달리 자주 못하는 전화
                        </p>
                        <div className="font-['Pretendard',sans-serif] font-bold leading-[1.3] relative shrink-0 text-[#10d266] text-[40px] text-right w-full">
                          <p className="mb-0">불안한</p>
                          <p>자녀의 마음</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="features" className="bg-[#f4fcf8] relative shrink-0 w-full">
        <div className="size-full">
          <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-4 md:px-[100px] lg:px-[182px] py-[60px] md:py-[60px] lg:py-[70px] relative w-full">
            <div className="content-stretch flex flex-col gap-[52px] md:gap-[70px] lg:gap-[80px] items-center relative shrink-0 w-full">
              <div className="content-stretch flex flex-col gap-[20px] md:gap-[27px] items-end relative shrink-0 w-full">
                <div className="font-['Pretendard',sans-serif] font-bold leading-[1.3] not-italic relative shrink-0 text-[#313131] text-[26px] md:text-[30px] lg:text-[32px] text-center w-full">
                  <p className="mb-0 md:hidden">메디케어콜 AI가</p>
                  <p className="mb-0 md:hidden">똑똑하게 부모님과</p>
                  <p className="md:hidden">소통합니다.</p>
                  <p className="hidden md:block mb-0">메디케어콜 AI가</p>
                  <p className="hidden md:block">
                    똑똑하게 부모님과 소통합니다.
                  </p>
                </div>
                <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
                  <p className="font-['Pretendard',sans-serif] leading-[1.3] not-italic relative shrink-0 text-[#666666] text-[14px] md:text-[18px] text-center w-full md:whitespace-pre">
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

              <div className="content-stretch flex flex-col md:flex-row gap-[12px] md:gap-[30px] items-center md:items-stretch relative shrink-0 w-full justify-center">
                {/* Step 1 */}
                <div className="bg-white box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[28px] py-[20px] relative rounded-[20px] shadow-[-4px_0px_8px_0px_rgba(34,34,34,0.02),4px_0px_8px_0px_rgba(34,34,34,0.02),0px_4px_8px_0px_rgba(34,34,34,0.02)] shrink-0 w-full md:w-[300px] lg:w-[338px]">
                  <div className="content-stretch flex flex-col gap-[28px] items-center relative shrink-0 w-full">
                    <div className="relative shrink-0 size-[80px]">
                      <svg
                        className="block size-full"
                        fill="none"
                        preserveAspectRatio="none"
                        viewBox="0 0 80 80"
                      >
                        <path d={svgPaths.p16ce8c00} fill="#35C156" />
                      </svg>
                    </div>
                    <div className="content-stretch flex flex-col gap-[16px] items-center not-italic relative shrink-0 text-center w-full">
                      <p className="font-['Pretendard',sans-serif] font-semibold md:font-bold leading-[1.3] md:leading-[21.426px] relative shrink-0 text-[16px] md:text-[15.304px] text-neutral-950 w-full">
                        1. AI 안부전화
                      </p>
                      <div className="font-['Pretendard',sans-serif] leading-[1.3] relative shrink-0 text-[#666666] text-[14px] w-full">
                        <p className="mb-0">
                          매일 정해진 시간에 AI가 자동으로 부모님께
                        </p>
                        <p className="mb-0">다정하게 전화를 걸어 대화하며</p>
                        <p>그날의 건강과 감정 상태를 확인합니다.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-white box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[28px] py-[20px] relative rounded-[20px] shadow-[-4px_0px_8px_0px_rgba(34,34,34,0.02),4px_0px_8px_0px_rgba(34,34,34,0.02),0px_4px_8px_0px_rgba(34,34,34,0.02)] shrink-0 w-full md:w-[300px] lg:w-[338px]">
                  <div className="content-stretch flex flex-col gap-[28px] items-center relative shrink-0 w-full">
                    <div className="overflow-clip relative shrink-0 size-[80px]">
                      <div className="absolute bg-[#e6faef] h-[62.136px] left-[18.64px] rounded-[5.649px] top-[8.54px] w-[43.495px]" />
                      <div className="absolute left-[38.06px] size-[33.814px] top-[30.29px]">
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 34 34"
                        >
                          <circle
                            cx="16.9072"
                            cy="16.9072"
                            fill="white"
                            fillOpacity="0.1"
                            r="14.7396"
                            stroke="#35C156"
                            strokeWidth="4.33517"
                          />
                        </svg>
                      </div>
                      <div className="absolute h-0 left-[24.85px] top-[16.31px] w-[31.068px]">
                        <svg
                          className="block w-full h-[2px]"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 33 2"
                        >
                          <path
                            d="M0.776699 0.776699H31.8447"
                            stroke="#AAEFAC"
                            strokeLinecap="round"
                            strokeWidth="1.5534"
                          />
                        </svg>
                      </div>
                      <div className="absolute h-0 left-[24.85px] top-[21.75px] w-[24.078px]">
                        <svg
                          className="block w-full h-[2px]"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 26 2"
                        >
                          <path
                            d="M0.776699 0.776699H24.8544"
                            stroke="#AAEFAC"
                            strokeLinecap="round"
                            strokeWidth="1.5534"
                          />
                        </svg>
                      </div>
                      <div className="absolute h-0 left-[24.85px] top-[27.18px] w-[13.204px]">
                        <svg
                          className="block w-full h-[2px]"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 15 2"
                        >
                          <path
                            d="M0.776699 0.776699H13.9806"
                            stroke="#AAEFAC"
                            strokeLinecap="round"
                            strokeWidth="1.5534"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[16px] items-center not-italic relative shrink-0 text-center w-full">
                      <p className="font-['Pretendard',sans-serif] font-semibold md:font-bold leading-[1.3] md:leading-[21.426px] relative shrink-0 text-[16px] md:text-[15.304px] text-neutral-950 w-full">
                        2. 건강 상태 분석
                      </p>
                      <div className="font-['Pretendard',sans-serif] leading-[1.3] relative shrink-0 text-[#666666] text-[14px] w-full">
                        <p className="mb-0">식사, 복약, 수면, 통증 여부 등</p>
                        <p className="mb-0">대화 속 건강 데이터를 분석하고</p>
                        <p>
                          '아프다', '외롭다' 같은 위험 신호를 즉시 감지합니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-white box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-[28px] py-[20px] relative rounded-[20px] shadow-[-4px_0px_8px_0px_rgba(34,34,34,0.02),4px_0px_8px_0px_rgba(34,34,34,0.02),0px_4px_8px_0px_rgba(34,34,34,0.02)] shrink-0 w-full md:w-[300px] lg:w-[338px]">
                  <div className="content-stretch flex flex-col gap-[28px] items-center relative shrink-0 w-full">
                    <div className="relative shrink-0 size-[80px]">
                      <svg
                        className="block size-full"
                        fill="none"
                        preserveAspectRatio="none"
                        viewBox="0 0 80 80"
                      >
                        <path
                          d={svgPaths.p26c6f700}
                          stroke="#35C156"
                          strokeWidth="9.29461"
                        />
                        <path d={svgPaths.pd686c00} fill="#35C156" />
                      </svg>
                    </div>
                    <div className="content-stretch flex flex-col gap-[16px] items-center not-italic relative shrink-0 text-center w-full">
                      <p className="font-['Pretendard',sans-serif] font-semibold md:font-bold leading-[1.3] md:leading-[21.426px] relative shrink-0 text-[16px] md:text-[15.304px] text-neutral-950 w-full">
                        3. 자녀에게 리포트
                      </p>
                      <div className="font-['Pretendard',sans-serif] leading-[1.3] relative shrink-0 text-[#666666] text-[14px] w-full">
                        <p className="mb-0">분석된 부모님의 일일 건강 상태를</p>
                        <p>
                          자녀분의 스마트폰 앱을 통해 간편하고 보기 쉬운
                          리포트로 매일 전달해 드립니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Feature Section - Mobile */}
      <section className="md:hidden bg-neutral-50 relative size-full feature-mobile">
        <div className="flex flex-row items-center size-full">
          <div className="box-border content-stretch flex gap-[10px] items-center px-[16px] py-[60px] relative size-full">
            <div className="basis-0 content-stretch flex flex-col gap-[32px] grow items-center min-h-px min-w-px relative shrink-0">
              <div className="content-stretch flex flex-col gap-[32px] items-center relative shrink-0 w-full">
                <div className="content-stretch flex flex-col gap-[16px] items-start leading-[0] not-italic relative shrink-0 text-center w-full">
                  <div className="font-['Pretendard',sans-serif] font-bold leading-[1.3] relative shrink-0 text-[26px] text-neutral-950 w-full">
                    <p className="mb-0">손안에서 확인하는</p>
                    <p>부모님 건강 리포트</p>
                  </div>
                  <div className="font-['Pretendard',sans-serif] leading-[1.3] relative shrink-0 text-[#666666] text-[14px] w-full">
                    <p className="mb-0">
                      바쁜 일상 속에서도 터치 한 번으로 부모님의 건강 상태를
                    </p>
                    <p>언제 어디서든 쉽고 빠르게 확인할 수 있습니다.</p>
                  </div>
                </div>

                <div className="content-stretch flex flex-col gap-[16px] items-center justify-center relative shrink-0 w-[249.398px]">
                  {/* Feature 1 */}
                  <div className="content-stretch flex gap-[11.398px] items-center relative shrink-0">
                    <div className="relative shrink-0 size-[22px]">
                      <svg
                        className="block size-full"
                        fill="none"
                        preserveAspectRatio="none"
                        viewBox="0 0 22 22"
                      >
                        <circle
                          cx="11.4781"
                          cy="10.5217"
                          fill="#E6FAEF"
                          r="7.65217"
                        />
                        <path
                          d={svgPaths.pc334d40}
                          stroke="#35C156"
                          strokeLinecap="round"
                          strokeWidth="1.43478"
                        />
                      </svg>
                    </div>
                    <p className="font-['Pretendard',sans-serif] leading-[1.3] not-italic relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre">
                      오늘의 컨디션, 식사, 복약 정보 요약
                    </p>
                  </div>

                  {/* Feature 2 */}
                  <div className="content-stretch flex gap-[11.398px] items-center relative shrink-0">
                    <div className="relative shrink-0 size-[22px]">
                      <svg
                        className="block size-full"
                        fill="none"
                        preserveAspectRatio="none"
                        viewBox="0 0 22 22"
                      >
                        <path d={svgPaths.p16213500} fill="#E6FAEF" />
                        <path
                          d="M11 7.6522V12.4348"
                          stroke="#35C156"
                          strokeLinecap="round"
                          strokeWidth="0.956522"
                        />
                        <path
                          d="M11 14.3478V14.3479"
                          stroke="#35C156"
                          strokeLinecap="round"
                          strokeWidth="0.956522"
                        />
                      </svg>
                    </div>
                    <p className="font-['Pretendard',sans-serif] leading-[1.3] not-italic relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre">
                      AI가 감지한 건강 위험 신호 즉시 알림
                    </p>
                  </div>

                  {/* Feature 3 */}
                  <div className="content-stretch flex gap-[11.398px] items-center relative shrink-0 w-full">
                    <div className="overflow-clip relative shrink-0 size-[22px]">
                      <div className="absolute bg-[#e6faef] h-[11.478px] left-[3.83px] rounded-[1.913px] top-[5.74px] w-[15.304px]" />
                      <div className="absolute bg-[#89e38b] left-[5.74px] size-[0.957px] top-[8.61px]" />
                      <div className="absolute bg-[#89e38b] left-[8.61px] size-[0.957px] top-[8.61px]" />
                      <div className="absolute bg-[#89e38b] left-[11.48px] size-[0.957px] top-[8.61px]" />
                      <div className="absolute bg-[#89e38b] left-[14.35px] size-[0.957px] top-[8.61px]" />
                      <div className="absolute bg-[#89e38b] left-[17.22px] size-[0.957px] top-[8.61px]" />
                      <div className="absolute bg-black h-[1.913px] left-[16.26px] rounded-[1.913px] top-[4.78px] w-[0.957px]" />
                      <div className="absolute bg-black h-[1.913px] left-[5.74px] rounded-[1.913px] top-[4.78px] w-[0.957px]" />
                    </div>
                    <p className="font-['Pretendard',sans-serif] leading-[1.3] not-italic relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre">
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
                    src="./parent-health-report-mobile-preview.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Feature Section - Desktop */}
      <section className="hidden md:block relative shrink-0 w-full bg-white feature-desktop">
        <div className="size-full">
          <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-[100px] lg:px-[312px] py-[90px] lg:py-[100px] relative w-full">
            <div className="content-stretch flex flex-col lg:flex-row gap-[80px] lg:gap-[194px] items-start lg:items-center relative shrink-0 w-full justify-center">
              <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full lg:w-[345.739px]">
                <div className="content-stretch flex flex-col gap-[16px] items-start leading-[1.3] not-italic relative shrink-0 w-full">
                  <div className="font-['Pretendard',sans-serif] font-bold text-[30px] lg:text-[32px] text-neutral-950 w-full">
                    <p className="mb-0">손안에서 확인하는</p>
                    <p>부모님 건강 리포트</p>
                  </div>
                  <p className="font-['Pretendard',sans-serif] relative shrink-0 text-[#666666] text-[14px] w-full">
                    바쁜 일상 속에서도 터치 한 번으로 부모님의 건강 상태를 언제
                    어디서든 쉽고 빠르게 확인할 수 있습니다.
                  </p>
                </div>

                <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                  {/* Feature 1 */}
                  <div className="content-stretch flex gap-[11.398px] items-center relative shrink-0">
                    <div className="relative shrink-0 size-[22px]">
                      <svg
                        className="block size-full"
                        fill="none"
                        preserveAspectRatio="none"
                        viewBox="0 0 22 22"
                      >
                        <circle
                          cx="11.4781"
                          cy="10.5217"
                          fill="#E6FAEF"
                          r="7.65217"
                        />
                        <path
                          d={svgPaths.pc334d40}
                          stroke="#35C156"
                          strokeLinecap="round"
                          strokeWidth="1.43478"
                        />
                      </svg>
                    </div>
                    <p className="font-['Pretendard',sans-serif] leading-[1.3] not-italic relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre">
                      오늘의 컨디션, 식사, 복약 정보 요약
                    </p>
                  </div>

                  {/* Feature 2 */}
                  <div className="content-stretch flex gap-[11.398px] items-center relative shrink-0">
                    <div className="relative shrink-0 size-[22px]">
                      <svg
                        className="block size-full"
                        fill="none"
                        preserveAspectRatio="none"
                        viewBox="0 0 22 22"
                      >
                        <path d={svgPaths.p16213500} fill="#E6FAEF" />
                        <path
                          d="M11 7.6522V12.4348"
                          stroke="#35C156"
                          strokeLinecap="round"
                          strokeWidth="0.956522"
                        />
                        <path
                          d="M11 14.3478V14.3479"
                          stroke="#35C156"
                          strokeLinecap="round"
                          strokeWidth="0.956522"
                        />
                      </svg>
                    </div>
                    <p className="font-['Pretendard',sans-serif] leading-[1.3] not-italic relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre">
                      AI가 감지한 건강 위험 신호 즉시 알림
                    </p>
                  </div>

                  {/* Feature 3 */}
                  <div className="content-stretch flex gap-[11.398px] items-center relative shrink-0 w-full">
                    <div className="overflow-clip relative shrink-0 size-[22px]">
                      <div className="absolute bg-[#e6faef] h-[11.478px] left-[3.83px] rounded-[1.913px] top-[5.74px] w-[15.304px]" />
                      <div className="absolute bg-[#89e38b] left-[5.74px] size-[0.957px] top-[8.61px]" />
                      <div className="absolute bg-[#89e38b] left-[8.61px] size-[0.957px] top-[8.61px]" />
                      <div className="absolute bg-[#89e38b] left-[11.48px] size-[0.957px] top-[8.61px]" />
                      <div className="absolute bg-[#89e38b] left-[14.35px] size-[0.957px] top-[8.61px]" />
                      <div className="absolute bg-[#89e38b] left-[17.22px] size-[0.957px] top-[8.61px]" />
                      <div className="absolute bg-black h-[1.913px] left-[16.26px] rounded-[1.913px] top-[4.78px] w-[0.957px]" />
                      <div className="absolute bg-black h-[1.913px] left-[5.74px] rounded-[1.913px] top-[4.78px] w-[0.957px]" />
                    </div>
                    <p className="font-['Pretendard',sans-serif] leading-[1.3] not-italic relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre">
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
                    src="./parent-health-report-mobile-preview.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="box-border content-stretch flex flex-col gap-[10px] items-start py-[60px] md:py-[90px] lg:py-[100px] relative shrink-0 w-full bg-white overflow-hidden"
      >
        <div className="content-stretch flex flex-col gap-[32px] md:gap-[42px] items-center relative shrink-0 w-full">
          <div className="font-['Pretendard',sans-serif] font-bold leading-[1.3] not-italic relative shrink-0 text-[26px] md:text-[30px] lg:text-[32px] text-black text-center w-full px-4 md:px-[100px]">
            <p className="mb-0 md:hidden">메디케어콜과</p>
            <p className="md:hidden">함께하는 분들의 이야기</p>
            <p className="hidden md:block">
              메디케어콜과 함께하는 분들의 이야기
            </p>
          </div>

          {/* Mobile: Horizontal Scroll Testimonials */}
          <div className="md:hidden relative w-full">
            <div
              className="flex gap-[12px] overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth px-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              onScroll={(e) => {
                const scrollLeft = e.currentTarget.scrollLeft;
                const cardWidth = e.currentTarget.scrollWidth / 3;
                const newIndex = Math.round(scrollLeft / cardWidth);
                setCurrentTestimonial(newIndex);
              }}
            >
              {/* Testimonial 1 */}
              <div className="bg-[#ececec] box-border content-stretch flex flex-col gap-[24px] items-end justify-end leading-[1.3] not-italic px-[16px] py-[24px] relative rounded-[11.13px] shrink-0 text-[14px] w-[280px] snap-center">
                <p className="font-['Pretendard',sans-serif] font-medium relative shrink-0 text-[#666666] w-full">
                  "지방에 계신 어머니와 매일 통화하기가 어려웠는데, 이젠 매일
                  아침 앱으로 컨디션을 확인하니 마음이 놓여요. 얼마 전엔 AI가
                  어지럽다는 말씀을 캐치해서 바로 연락드릴 수 있었어요. 정말
                  든든한 아들 노릇을 대신해주는 것 같아요."
                </p>
                <p className="font-['Pretendard',sans-serif] relative shrink-0 text-[#afafaf] text-[12px] text-nowrap whitespace-pre">
                  - 40대 직장인 김 O O 님 -
                </p>
              </div>

              {/* Testimonial 2 - Highlighted */}
              <div className="bg-[#35c156] box-border content-stretch flex flex-col gap-[24px] items-end justify-end leading-[1.3] not-italic px-[16px] py-[24px] relative rounded-[11.13px] shadow-[-4px_0px_16px_0px_rgba(34,34,34,0.04),4px_0px_16px_0px_rgba(34,34,34,0.04),0px_4px_16px_0px_rgba(34,34,34,0.04)] shrink-0 text-[14px] w-[280px] snap-center">
                <p className="font-['Pretendard',sans-serif] relative shrink-0 text-white w-full">
                  "지방에 계신 어머니와 매일 통화하기가 어려웠는데, 이젠 매일
                  아침 앱으로 컨디션을 확인하니 마음이 놓여요. 얼마 전엔 AI가
                  어지럽다는 말씀을 캐치해서 바로 연락드릴 수 있었어요. 정말
                  든든한 아들 노릇을 대신해주는 것 같아요."
                </p>
                <p className="font-['Pretendard',sans-serif] font-medium relative shrink-0 text-[#e6faef] text-nowrap whitespace-pre">
                  - 40대 직장인 김 O O 님 -
                </p>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-[#ececec] box-border content-stretch flex flex-col gap-[24px] items-end justify-end leading-[1.3] not-italic px-[16px] py-[24px] relative rounded-[11.13px] shrink-0 text-[14px] w-[280px] snap-center">
                <p className="font-['Pretendard',sans-serif] font-medium relative shrink-0 text-[#666666] w-full">
                  "지방에 계신 어머니와 매일 통화하기가 어려웠는데, 이젠 매일
                  아침 앱으로 컨디션을 확인하니 마음이 놓여요. 얼마 전엔 AI가
                  어지럽다는 말씀을 캐치해서 바로 연락드릴 수 있었어요. 정말
                  든든한 아들 노릇을 대신해주는 것 같아요."
                </p>
                <p className="font-['Pretendard',sans-serif] relative shrink-0 text-[#afafaf] text-[12px] text-nowrap whitespace-pre">
                  - 40대 직장인 김 O O 님 -
                </p>
              </div>
            </div>

            {/* Mobile Pagination Dots */}
            <div className="flex gap-2 justify-center mt-6">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentTestimonial(index);
                    const container = document.querySelector(
                      ".md\\:hidden .overflow-x-auto"
                    ) as HTMLElement;
                    if (container) {
                      const cardWidth = 280 + 12; // card width + gap
                      container.scrollTo({
                        left: cardWidth * index,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentTestimonial === index
                      ? "bg-[#35c156] w-6"
                      : "bg-[#d2d2d2]"
                  }`}
                  aria-label={`후기 ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop: Horizontal Scroll Testimonials */}
          <div className="hidden md:block relative w-full">
            <div className="max-w-[1400px] mx-auto px-[100px]">
              <div
                ref={testimonialRef}
                className="flex gap-[40px] overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                onScroll={(e) => {
                  const scrollLeft = e.currentTarget.scrollLeft;
                  const cardWidth = e.currentTarget.scrollWidth / 3;
                  const newIndex = Math.round(scrollLeft / cardWidth);
                  if (newIndex !== currentTestimonial) {
                    setCurrentTestimonial(newIndex);
                  }
                }}
              >
                {/* Testimonial 1 - Lighter */}
                <div className="bg-[#ececec] box-border content-stretch flex flex-col gap-[30px] md:gap-[40px] items-end justify-end leading-[1.3] not-italic px-[30px] md:px-[36px] py-[35px] md:py-[40px] relative rounded-[11.13px] shrink-0 w-[350px] lg:w-[400px] snap-center">
                  <p className="font-['Pretendard',sans-serif] font-medium relative shrink-0 text-[#666666] text-[14px] md:text-[16px] w-full">
                    "지방에 계신 어머니와 매일 통화하기가 어려웠는데, 이젠 매일
                    아침 앱으로 컨디션을 확인하니 마음이 놓여요. 얼마 전엔 AI가
                    어지럽다는 말씀을 캐치해서 바로 연락드릴 수 있었어요. 정말
                    든든한 아들 노릇을 대신해주는 것 같아요."
                  </p>
                  <p className="font-['Pretendard',sans-serif] relative shrink-0 text-[#afafaf] text-[12px] text-nowrap whitespace-pre">
                    - 40대 직장인 김 O O 님 -
                  </p>
                </div>

                {/* Testimonial 2 - Highlighted */}
                <div className="bg-[#35c156] box-border content-stretch flex flex-col gap-[30px] md:gap-[40px] items-end justify-end leading-[1.3] not-italic px-[30px] md:px-[36px] py-[35px] md:py-[40px] relative rounded-[11.13px] shadow-[-4px_0px_16px_0px_rgba(34,34,34,0.04),4px_0px_16px_0px_rgba(34,34,34,0.04),0px_4px_16px_0px_rgba(34,34,34,0.04)] shrink-0 w-[350px] lg:w-[400px] snap-center">
                  <p className="font-['Pretendard',sans-serif] relative shrink-0 text-[18px] md:text-[20px] text-white w-full">
                    "지방에 계신 어머니와 매일 통화하기가 어려웠는데, 이젠 매일
                    아침 앱으로 컨디션을 확인하니 마음이 놓여요. 얼마 전엔 AI가
                    어지럽다는 말씀을 캐치해서 바로 연락드릴 수 있었어요. 정말
                    든든한 아들 노릇을 대신해주는 것 같아요."
                  </p>
                  <p className="font-['Pretendard',sans-serif] font-medium relative shrink-0 text-[#e6faef] text-[14px] md:text-[16px] text-nowrap whitespace-pre">
                    - 40대 직장인 김 O O 님 -
                  </p>
                </div>

                {/* Testimonial 3 - Lighter */}
                <div className="bg-[#ececec] box-border content-stretch flex flex-col gap-[30px] md:gap-[40px] items-end justify-end leading-[1.3] not-italic px-[30px] md:px-[36px] py-[35px] md:py-[40px] relative rounded-[11.13px] shrink-0 w-[350px] lg:w-[400px] snap-center">
                  <p className="font-['Pretendard',sans-serif] font-medium relative shrink-0 text-[#666666] text-[14px] md:text-[16px] w-full">
                    "지방에 계신 어머니와 매일 통화하기가 어려웠는데, 이젠 매일
                    아침 앱으로 컨디션을 확인하니 마음이 놓여요. 얼마 전엔 AI가
                    어지럽다는 말씀을 캐치해서 바로 연락드릴 수 있었어요. 정말
                    든든한 아들 노릇을 대신해주는 것 같아요."
                  </p>
                  <p className="font-['Pretendard',sans-serif] relative shrink-0 text-[#afafaf] text-[12px] text-nowrap whitespace-pre">
                    - 40대 직장인 김 O O 님 -
                  </p>
                </div>
              </div>

              {/* Desktop Pagination Dots */}
              <div className="flex gap-2 justify-center mt-6">
                {[0, 1, 2].map((index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentTestimonial === index
                        ? "bg-[#35c156] w-6"
                        : "bg-[#d2d2d2]"
                    }`}
                    aria-label={`후기 ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-white relative shrink-0 w-full">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-4 md:px-[100px] lg:px-[440px] py-[60px] md:py-[90px] lg:py-[100px] relative w-full">
            <div className="basis-0 content-stretch flex flex-col gap-[32px] md:gap-[70px] lg:gap-[80px] grow items-center min-h-px min-w-px relative shrink-0">
              <div className="content-stretch flex flex-col gap-[20px] md:gap-[27px] items-end relative shrink-0 w-full">
                <div className="font-['Pretendard',sans-serif] font-bold leading-[1.3] not-italic relative shrink-0 text-[#313131] text-[26px] md:text-[30px] lg:text-[32px] text-center w-full">
                  <p className="mb-0">더 늦기 전에,</p>
                  <p className="mb-0 md:hidden">부모님께 스마트한 안부를</p>
                  <p className="md:hidden">선물하세요</p>
                  <p className="hidden md:block">
                    부모님께 스마트한 안부를 선물하세요
                  </p>
                </div>
                <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
                  <p className="font-['Pretendard',sans-serif] leading-[1.3] not-italic relative shrink-0 text-[#666666] text-[14px] md:text-[18px] text-center w-full md:whitespace-pre">
                    <span className="md:hidden">궁금하신 점을 남겨주시면</span>
                    <span className="md:hidden">
                      <br />
                    </span>
                    <span className="md:hidden">
                      전문 컨설턴트가 친절하게 상담해 드리곘습니다.
                    </span>
                    <span className="hidden md:inline">
                      궁금하신 점을 남겨주시면 전문 컨설턴트가 친절하게 상담해
                      드리곘습니다.
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
                    >
                      <div className="content-stretch flex flex-col gap-[50px] md:gap-[50px] h-full items-start relative shrink-0 w-full">
                        <div className="content-stretch flex flex-col gap-[24px] md:gap-[36px] items-start relative shrink-0 w-full">
                          {/* Name Field */}
                          <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                            <div className="flex flex-col font-['Pretendard',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#454545] text-[18px] w-full">
                              <p className="leading-[1.3]">
                                <span>자녀분 성함 </span>
                                <span className="text-[#10d266]">(필수)</span>
                              </p>
                            </div>
                            <div className="bg-white h-[58px] relative rounded-[14px] shrink-0 w-full">
                              <div
                                aria-hidden="true"
                                className="absolute border-[#d2d2d2] border-[1.2px] border-solid inset-0 pointer-events-none rounded-[14px]"
                              />
                              <div className="flex flex-row items-center size-full">
                                <input
                                  type="text"
                                  value={formData.name}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      name: e.target.value,
                                    })
                                  }
                                  className="box-border content-stretch flex gap-[10px] h-[58px] items-center px-[16px] py-[14px] relative w-full bg-transparent border-0 outline-none font-['Pretendard',sans-serif] font-medium text-[16px] text-black placeholder:text-[#afafaf]"
                                  placeholder="성함을 입력해주세요"
                                  required
                                />
                              </div>
                            </div>
                          </div>

                          {/* Phone Field */}
                          <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                            <div className="flex flex-col font-['Pretendard',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#454545] text-[18px] w-full">
                              <p className="leading-[1.3]">
                                <span>연락처 </span>
                                <span className="text-[#10d266]">(필수)</span>
                              </p>
                            </div>
                            <div className="bg-white h-[58px] relative rounded-[14px] shrink-0 w-full">
                              <div
                                aria-hidden="true"
                                className="absolute border-[#d2d2d2] border-[1.2px] border-solid inset-0 pointer-events-none rounded-[14px]"
                              />
                              <div className="flex flex-row items-center size-full">
                                <input
                                  type="tel"
                                  value={formData.phone}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      phone: e.target.value,
                                    })
                                  }
                                  className="box-border content-stretch flex gap-[10px] h-[58px] items-center px-[16px] py-[14px] relative w-full bg-transparent border-0 outline-none font-['Pretendard',sans-serif] font-medium text-[16px] text-black placeholder:text-[#afafaf]"
                                  placeholder="'-'없이 숫자만 입력해주세요"
                                  required
                                />
                              </div>
                            </div>
                          </div>

                          {/* Email Field */}
                          <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                            <div className="flex flex-col font-['Pretendard',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#454545] text-[18px] w-full">
                              <p className="leading-[1.3]">
                                <span>이메일 </span>
                                <span className="text-[#10d266]">(필수)</span>
                              </p>
                            </div>
                            <div className="bg-white h-[58px] relative rounded-[14px] shrink-0 w-full">
                              <div
                                aria-hidden="true"
                                className="absolute border-[#d2d2d2] border-[1.2px] border-solid inset-0 pointer-events-none rounded-[14px]"
                              />
                              <div className="flex flex-row items-center size-full">
                                <input
                                  type="email"
                                  value={formData.email}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      email: e.target.value,
                                    })
                                  }
                                  className="box-border content-stretch flex gap-[10px] h-[58px] items-center px-[16px] py-[14px] relative w-full bg-transparent border-0 outline-none font-['Pretendard',sans-serif] font-medium text-[16px] text-black placeholder:text-[#afafaf]"
                                  placeholder="답변 받으실 이메일 주소 입력해주세요"
                                  required
                                />
                              </div>
                            </div>
                          </div>

                          {/* Message Field */}
                          <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                            <div className="flex flex-col font-['Pretendard',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#454545] text-[18px] w-full">
                              <p className="leading-[1.3]">
                                <span>문의 내용 </span>
                                <span className="text-[#8a8a8a]">(선택)</span>
                              </p>
                            </div>
                            <div className="bg-white h-[134px] md:h-[199px] relative rounded-[14px] shrink-0 w-full">
                              <div
                                aria-hidden="true"
                                className="absolute border-[#d2d2d2] border-[1.2px] border-solid inset-0 pointer-events-none rounded-[14px]"
                              />
                              <div className="size-full">
                                <textarea
                                  value={formData.message}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      message: e.target.value,
                                    })
                                  }
                                  className="box-border content-stretch flex gap-[10px] h-full items-start px-[16px] py-[14px] relative w-full bg-transparent border-0 outline-none font-['Pretendard',sans-serif] font-medium text-[16px] text-black placeholder:text-[#afafaf] resize-none"
                                  placeholder="서비스에 대해 궁금한 점을 자유롭게 남겨주세요."
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-[#35c156] relative rounded-[10px] shrink-0 w-full hover:bg-[#00a350] transition-all disabled:opacity-50 disabled:cursor-not-allowed border-0 cursor-pointer"
                        >
                          <div className="flex flex-row items-center justify-center size-full">
                            <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[20px] md:px-[26px] py-[14px] md:py-[16px] relative w-full">
                              <p className="font-['Pretendard',sans-serif] font-semibold leading-[1.3] not-italic relative shrink-0 text-[18px] md:text-[20px] text-neutral-50 text-nowrap whitespace-pre">
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

      {/* Footer */}
      <footer className="bg-neutral-50 relative shrink-0 w-full">
        <div className="size-full">
          <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-4 md:px-[60px] lg:px-[120px] py-[32px] md:py-[60px] lg:py-[70px] relative w-full">
            <div className="content-stretch flex flex-col gap-[20px] md:gap-[52px] items-start relative shrink-0 w-full mx-auto">
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                <div className="content-stretch flex h-[19px] items-center relative shrink-0 w-[134px]">
                  <div className="basis-0 grow h-[19.473px] min-h-px min-w-px relative shrink-0">
                    <img
                      alt="메디케어콜 로고"
                      className="absolute bg-clip-padding border-0 border-[transparent] border-solid box-border inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
                      src="./medicare.png"
                    />
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
                <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                  <p className="font-['Pretendard',sans-serif] font-medium leading-[1.3] md:leading-[1.5] not-italic relative shrink-0 text-[#6f7176] text-[14px] md:text-[16px] lg:text-[18px] text-nowrap whitespace-pre">
                    © 2025 Medicare Call. All Rights Reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
