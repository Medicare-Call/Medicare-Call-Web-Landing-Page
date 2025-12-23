import { desktopProblemCards } from "../../constants/problemCards";

const DesktopProblemSection = () => {

  return (
    <section className="hidden md:block relative shrink-0 w-full bg-white">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-[100px] lg:px-[192px] py-[100px] lg:py-[120px] relative w-full">
          <div className="content-stretch flex flex-col gap-[70px] lg:gap-[79px] items-center relative shrink-0 w-full">
            <div className="content-stretch flex flex-col gap-[27px] items-start relative shrink-0 w-full max-w-[432px]">
              <div
                style={{
                  fontSize: "var(--t02-font-size)",
                  lineHeight: "var(--t02-line-height)",
                  fontWeight: "var(--t02-weight)",
                }}
                className="font-['Pretendard',sans-serif] not-italic relative shrink-0 text-[var(--mc-gray-8)] text-center w-full"
              >
                <p>혹시, 이런 걱정 하고 계신가요?</p>
              </div>
              <div
                style={{
                  fontSize: "var(--b01-font-size)",
                  lineHeight: "var(--b01-line-height)",
                  fontWeight: "var(--b01-r-weight)",
                }}
                className="content-stretch flex flex-col font-['Pretendard',sans-serif] gap-[10px] items-center not-italic relative shrink-0 text-[var(--mc-gray-5)] text-center w-full"
              >
                <p className="relative shrink-0">
                  부모님을 사랑하는 마음만큼, 현실의 벽은 높기만 합니다.
                </p>
                <p className="relative shrink-0">
                  메디케어콜은 자녀분들의 이런 깊은 고민에서 시작되었습니다.
                </p>
              </div>
            </div>

            <div className="content-stretch flex flex-row gap-[33px] items-stretch justify-center relative shrink-0 w-full">
              {desktopProblemCards.map((card, idx) => (
                <div
                  key={idx}
                  className="relative h-[450px] max-w-[330px] lg:h-[480px] flex-1 rounded-[20px] overflow-hidden"
                >
                  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    <img
                      src={card.img}
                      alt={card.alt}
                      className="absolute w-full h-full object-cover"
                    />
                  </div>

                  {/* 내용 */}
                  <div className="relative z-10 flex flex-col justify-between h-full p-[30px]">
                    <div
                      style={{
                        fontSize: "var(--t05-font-size)",
                        lineHeight: "var(--t05-line-height)",
                        fontWeight: "var(--t05-sb-weight)",
                      }}
                      className="text-white font-['Pretendard',sans-serif] text-left"
                    >
                      <p className="mb-0">{card.title1}</p>
                      <p>{card.title2}</p>
                    </div>
                    <div className="flex flex-col gap-[8px] items-start">
                      <p
                        style={{
                          fontSize: "var(--b03-font-size)",
                          lineHeight: "var(--b03-line-height)",
                          fontWeight: "var(--b03-r-weight)",
                        }}
                        className="text-[var(--mc-gray-2)]"
                      >
                        {card.subtitle}
                      </p>
                      <p
                        style={{
                          fontSize: "var(--t01-font-size)",
                          lineHeight: "var(--t01-line-height)",
                          fontWeight: "var(--t01-weight)",
                        }}
                        className="text-[var(--mc-main-color)] whitespace-pre-line"
                      >
                        {card.value}
                      </p>
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

export default DesktopProblemSection;
