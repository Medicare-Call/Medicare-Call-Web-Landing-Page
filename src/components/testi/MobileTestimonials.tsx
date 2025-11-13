import { useEffect, useRef, useState, useMemo } from "react";

const testimonials = [
  {
    id: 0,
    text: "지방에 계신 어머니와 매일 통화하기가 어려웠는데, 이젠 매일 아침 앱으로 컨디션을 확인하니 마음이 놓여요. 얼마 전엔 AI가 어지럽다는 말씀을 캐치해서 바로 연락드릴 수 있었어요. 정말 든든한 아들 노릇을 대신해주는 것 같아요.",
    author: "- 40대 직장인 김 O O 님 -",
  },
  {
    id: 1,
    text: "부모님과 떨어져 사는 외동딸이다 보니 늘 마음이 쓰였어요. 메디케어콜을 쓰고 나서는 ‘어제 잠은 잘 주무셨는지, 식사는 하셨는지’ 같은 기본 정보가 매일 정리돼서 너무 좋습니다. 특히 그날따라 기운 없다는 답변이 있을 때 바로 알림이 뜨는 기능이 정말 유용해요.",
    author: "- 50대 주부 이 O O 님 -",
  },
  {
    id: 2,
    text: "맞벌이라 하루가 어떻게 지나가는지도 모르는데, 부모님 건강까지 챙기려니 늘 죄송했죠. 그런데 메디케어콜을 이용하고부터는 아침·점심·저녁마다 부모님 상태가 자동으로 요약돼서 오니까 부담이 확 줄었어요. 챙김의 수준이 달라졌습니다.",
    author: "- 50대  직정인 강 O O 님 -",
  },
  {
    id: 3,
    text: "아버지가 당뇨가 있어서 식사나 혈당 체크가 늘 신경 쓰였어요. 이제는 AI가 매일 전화로 물어보고, 답변을 정리해서 보내주니 제가 직접 챙기는 것보다 더 꼼꼼하다는 생각이 듭니다. 특히 복약 여부 누락됐을 때 빨리 알려주는 기능이 정말 도움이 돼요.",
    author: "- 40대 직장인 박 O O 님 -",
  },
  {
    id: 4,
    text: "부모님이 혼자 지내시다 보니 마음이 늘 불편했는데, 메디케어콜이 시작된 뒤로는 한결 편안해졌어요. 제가 못 묻는 질문들을 AI가 대신 챙겨주고, 부모님도 ‘전화 받고 얘기하니까 좋다’고 하셔서 오히려 더 자주 소통하는 느낌이에요.",
    author: "- 50대 직장인 윤 O O 님 -",
  },
  {
    id: 5,
    text: "해외에 있다 보니 한국에 계신 부모님 건강이 늘 걱정이었어요. 시차 때문에 전화도 자주 못 드렸는데, 메디케어콜을 통해 매일 상태가 정리돼 오니까 정말 큰 힘이 됩니다. 이상 징후 있으면 알림으로 바로 알려주는 기능 덕분에 마음이 한결 놓여요.",
    author: "- 해외 거주중인  50대 신 O O 님 -",
  },
];

const CARD_TRANSITION_DURATION = 500;
const VISIBLE_LENGTH = testimonials.length;
const INITIAL_INDEX = 1;
const JUMP_TRIGGER_INDEX_FORWARD = VISIBLE_LENGTH + 1;
const JUMP_TRIGGER_INDEX_BACKWARD = 0;

const MobileTestimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(INITIAL_INDEX);
  const [isJumping, setIsJumping] = useState(false);
  const autoScrollPaused = useRef(false);
  const pauseTimer = useRef<number | null>(null);

  const infiniteTestimonials = useMemo(() => {
    const lastItem = testimonials[VISIBLE_LENGTH - 1];
    const firstItem = testimonials[0];
    const secondItem = testimonials[1];
    return [lastItem, ...testimonials, firstItem, secondItem];
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (!autoScrollPaused.current && !isJumping) {
        setIndex((prev) => prev + 1);
      }
    }, 3000);
    return () => window.clearInterval(interval);
  }, [isJumping]);

  const calculateScrollTarget = (
    targetElement: HTMLElement,
    container: HTMLElement
  ): number => {
    const cardOffset = targetElement.offsetLeft;
    const cardWidth = targetElement.offsetWidth;
    const containerWidth = container.offsetWidth;
    return cardOffset + cardWidth / 2 - containerWidth / 2;
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    if (isJumping && index === INITIAL_INDEX) {
      const resetTimeout = window.setTimeout(() => {
        setIsJumping(false);
      }, 10);
      return () => window.clearTimeout(resetTimeout);
    }

    const targetCard = container.querySelector(`[data-index="${index}"]`);
    if (!(targetCard instanceof HTMLElement)) return;

    if (index === JUMP_TRIGGER_INDEX_FORWARD) {
      const scrollTarget = calculateScrollTarget(targetCard, container);
      container.scrollTo({
        left: scrollTarget,
        behavior: "smooth",
      });

      const jumpTimeout = window.setTimeout(() => {
        setIsJumping(true);
        const realFirstCard = container.querySelector(
          `[data-index="${INITIAL_INDEX}"]`
        );
        if (realFirstCard instanceof HTMLElement) {
          const jumpTarget = calculateScrollTarget(realFirstCard, container);
          container.scrollLeft = jumpTarget;
        }
        setIndex(INITIAL_INDEX);
      }, CARD_TRANSITION_DURATION + 100);

      return () => window.clearTimeout(jumpTimeout);
    }

    if (index > JUMP_TRIGGER_INDEX_FORWARD) {
      setIsJumping(true);
      const realFirstCard = container.querySelector(
        `[data-index="${INITIAL_INDEX}"]`
      );
      if (realFirstCard instanceof HTMLElement) {
        const jumpTarget = calculateScrollTarget(realFirstCard, container);
        container.scrollLeft = jumpTarget;
      }
      setIndex(INITIAL_INDEX);
      return;
    }

    if (index >= INITIAL_INDEX && index <= VISIBLE_LENGTH) {
      const scrollTarget = calculateScrollTarget(targetCard, container);
      container.scrollTo({
        left: scrollTarget,
        behavior: "smooth",
      });
    }
  }, [index, isJumping]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollTimeout: number | null = null;
    const DEBOUNCE_TIME = 200;

    const handleScroll = () => {
      autoScrollPaused.current = true;

      if (scrollTimeout) window.clearTimeout(scrollTimeout);

      scrollTimeout = window.setTimeout(() => {
        const center = container.scrollLeft + container.clientWidth / 2;
        let newIndex = INITIAL_INDEX;
        let minDistance = Infinity;

        infiniteTestimonials.forEach((_, i) => {
          const card = container.querySelector(`[data-index="${i}"]`);
          if (card instanceof HTMLElement) {
            const cardCenter = card.offsetLeft + card.clientWidth / 2;
            const distance = Math.abs(center - cardCenter);
            if (distance < minDistance) {
              minDistance = distance;
              newIndex = i;
            }
          }
        });

        if (newIndex === JUMP_TRIGGER_INDEX_BACKWARD) {
          setIsJumping(true);
          const realLastCard = container.querySelector(
            `[data-index="${VISIBLE_LENGTH}"]`
          );
          if (realLastCard instanceof HTMLElement) {
            const jumpTarget = calculateScrollTarget(realLastCard, container);
            container.scrollLeft = jumpTarget;
          }
          setIndex(VISIBLE_LENGTH);
        } else if (newIndex === JUMP_TRIGGER_INDEX_FORWARD) {
          setIsJumping(true);
          const realFirstCard = container.querySelector(
            `[data-index="${INITIAL_INDEX}"]`
          );
          if (realFirstCard instanceof HTMLElement) {
            const jumpTarget = calculateScrollTarget(realFirstCard, container);
            container.scrollLeft = jumpTarget;
          }
          setIndex(INITIAL_INDEX);
        } else {
          setIndex(newIndex);
        }

        if (pauseTimer.current) window.clearTimeout(pauseTimer.current);
        pauseTimer.current = window.setTimeout(() => {
          autoScrollPaused.current = false;
        }, 3000);
      }, DEBOUNCE_TIME);
    };

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) window.clearTimeout(scrollTimeout);
    };
  }, [infiniteTestimonials.length]);

  const centeredIndex = index;

  return (
    <div className="md:hidden w-full relative">
      <div
        ref={scrollRef}
        className="flex overflow-x-scroll snap-x snap-mandatory scrollbar-hide px-4"
        style={{ gap: "40px", scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {infiniteTestimonials.map((item, i) => {
          const isCenter = centeredIndex === i;
          const transitionDuration = isJumping
            ? "0ms"
            : `${CARD_TRANSITION_DURATION}ms`;

          return (
            <div
              key={item.id + "-" + i}
              data-index={i}
              className="snap-center flex-none rounded-[12px] px-4 py-6 min-w-[calc(100vw-48px)] max-w-[calc(100vw-48px)]"
              style={{
                transition: `all ${transitionDuration}`,
                backgroundColor: isCenter ? "#35c156" : "#ececec",
              }}
            >
              <div
                style={{
                  transition: `all ${transitionDuration}`,
                  transform: isCenter ? "scale(1.05)" : "scale(0.95)",
                  margin: "0 16px",
                }}
              >
                <p
                  className="mb-6 whitespace-normal break-all text-[14px]"
                  style={{
                    transition: `all ${transitionDuration}`,
                    color: isCenter ? "#fff" : "#666",
                  }}
                >
                  “{item.text}”
                </p>

                <p
                  className="text-[14px] text-right font-medium"
                  style={{
                    transition: `all ${transitionDuration}`,
                    color: isCenter ? "#e6faef" : "#afafaf",
                  }}
                >
                  {item.author}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MobileTestimonials;
