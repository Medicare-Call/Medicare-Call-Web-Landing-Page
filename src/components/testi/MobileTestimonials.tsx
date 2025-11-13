import { useEffect, useRef, useState, useMemo } from "react";

const testimonials = [
  {
    id: 0,
    text: "지방에 계신 어머니와 매일 통화하기가 어려웠는데, 이제 매일 아침 앱으로 컨디션을 확인하니 마음이 놓여요. 얼마 전엔 AI가 어지럽다는 말씀을 캐치해서 바로 연락드릴 수 있었어요. 정말 든든한 아들 노릇을 대신해주는 것 같아요.",
    author: "- 40대 직장인 김 O O 님 -",
  },
  {
    id: 1,
    text: "AI가 어머니의 목소리 톤을 분석해 건강 이상 신호를 알려줘서, 평소보다 훨씬 빠르게 대응할 수 있었어요. 정말 든든한 서비스예요.",
    author: "- 40대 직장인 이 O O 님 -",
  },
  {
    id: 2,
    text: "3매일 전화드리기 어려웠는데, 이제는 앱으로 부모님 상태를 바로 확인할 수 있어서 훨씬 편해요.",
    author: "- 50대 자녀 정 O O 님 -",
  },
  {
    id: 3,
    text: "4매일 전화드리기 어려웠는데, 이제는 앱으로 부모님 상태를 바로 확인할 수 있어서 훨씬 편해요.",
    author: "- 50대 자녀 정 O O 님 -",
  },
  {
    id: 4,
    text: "5매일 전화드리기 어려웠는데, 이제는 앱으로 부모님 상태를 바로 확인할 수 있어서 훨씬 편해요.",
    author: "- 50대 자녀 정 O O 님 -",
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
