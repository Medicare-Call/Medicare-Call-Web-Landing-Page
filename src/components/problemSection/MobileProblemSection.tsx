import { mobileProblemCards } from "../../constants/problemCards";

const MobileProblemSection = () => {

  return (
    <section
      id="problem"
      className="md:hidden relative shrink-0 w-full bg-white"
    >
      <div className="flex flex-row items-center size-full">
        <div className="box-border flex gap-[10px] items-center px-[16px] py-[60px] relative size-full">
          <div className="flex flex-col gap-[52px] grow items-start w-full">
            {/* 헤더 문구 */}
            <div className="flex flex-col gap-[20px] items-start text-center w-full">
              <div
                style={{
                  fontSize: "var(--t03-font-size)",
                  lineHeight: "var(--t03-line-height)",
                  fontWeight: "var(--t03-b-weight)",
                }}
                className="font-['Pretendard',sans-serif] text-[#313131] w-full"
              >
                <p className="mb-0">혹시, 이런 걱정 하고</p>
                <p>계신가요?</p>
              </div>
              <div
                style={{
                  fontSize: "var(--b02-font-size)",
                  lineHeight: "var(--b02-line-height)",
                  fontWeight: "var(--b02-r-weight)",
                }}
                className="font-['Pretendard',sans-serif] text-[var(--mc-gray-5)] w-full"
              >
                <p className="mb-0">부모님을 사랑하는 마음만큼,</p>
                <p className="mb-0">현실의 벽은 높기만 합니다.</p>
                <p className="mb-0">
                  메디케어콜은 자녀분들의 이런 깊은 고민에서
                </p>
                <p>시작되었습니다.</p>
              </div>
            </div>

            {/* 카드 목록 */}
            <div className="flex flex-col gap-[12px] w-full">
              {mobileProblemCards.map((card, idx) => (
                <div
                  key={idx}
                  className="relative h-[192px] rounded-[10px] w-full"
                >
                  {/* 배경 이미지 */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
                    <img
                      src={card.img}
                      alt={card.alt}
                      className="absolute w-full h-full object-cover"
                    />
                  </div>

                  {/* 내용 */}
                  <div className="flex flex-col justify-center size-full p-[20px]">
                    <div className="flex flex-col gap-[24px] items-start z-10">
                      <div
                        style={{
                          fontSize: "var(--b02-font-size)",
                          lineHeight: "var(--b02-line-height)",
                          fontWeight: "var(--b02-r-weight)",
                        }}
                        className="text-white font-['Pretendard',sans-serif]"
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
                            fontSize: "var(--t02-font-size)",
                            lineHeight: "var(--t02-line-height)",
                            fontWeight: "var(--t02-weight)",
                          }}
                          className="text-[var(--mc-main-color)]"
                        >
                          {card.value}
                        </p>
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

export default MobileProblemSection;
