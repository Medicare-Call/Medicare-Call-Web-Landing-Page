import { useEffect, useRef, useState, useMemo } from "react";

const testimonials = [
  {
    id: 0,
    text: "1지방에 계신 어머니와 매일 통화하기가 어려웠는데, 이제 매일 아침 앱으로 컨디션을 확인하니 마음이 놓여요. 얼마 전엔 AI가 어지럽다는 말씀을 캐치해서 바로 연락드릴 수 있었어요. 정말 든든한 아들 노릇을 대신해주는 것 같아요.",
    author: "- 40대 직장인 김 O O 님 -",
  },
  {
    id: 1,
    text: "2AI가 어머니의 목소리 톤을 분석해 건강 이상 신호를 알려줘서, 평소보다 훨씬 빠르게 대응할 수 있었어요. 정말 든든한 서비스예요.",
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
const SWIPE_THRESHOLD = 50;

const DesktopTestimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(INITIAL_INDEX);
  const [isJumping, setIsJumping] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const dragStartX = useRef(0);
  const dragMoved = useRef(0);

  const autoScrollPaused = useRef(false);
  const pauseTimer = useRef<number | null>(null);

  const infiniteTestimonials = useMemo(() => {
    const lastItem = testimonials[VISIBLE_LENGTH - 1];
    const firstItem = testimonials[0];
    const secondItem = testimonials[1];
    return [lastItem, ...testimonials, firstItem, secondItem];
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!autoScrollPaused.current && !isJumping && !isDragging) {
        setIndex((prev) => prev + 1);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isJumping, isDragging]);

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
      const resetTimeout = setTimeout(() => {
        setIsJumping(false);
      }, 10);
      return () => clearTimeout(resetTimeout);
    }

    const targetCard = container.querySelector(`[data-index="${index}"]`);
    if (!(targetCard instanceof HTMLElement)) return;

    if (index === JUMP_TRIGGER_INDEX_FORWARD) {
      targetCard.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });

      const jumpTimeout = setTimeout(() => {
        setIsJumping(true);
        const realFirstCard = container.querySelector(
          `[data-index="${INITIAL_INDEX}"]`
        );
        if (realFirstCard instanceof HTMLElement) {
          const scrollTarget = calculateScrollTarget(realFirstCard, container);
          container.scrollLeft = scrollTarget;
        }
        setIndex(INITIAL_INDEX);
      }, CARD_TRANSITION_DURATION + 100);

      return () => clearTimeout(jumpTimeout);
    }

    if (index === JUMP_TRIGGER_INDEX_BACKWARD) {
      setIsJumping(true);
      const realLastCard = container.querySelector(
        `[data-index="${VISIBLE_LENGTH}"]`
      );
      if (realLastCard instanceof HTMLElement) {
        const scrollTarget = calculateScrollTarget(realLastCard, container);
        container.scrollLeft = scrollTarget;
      }
      setIndex(VISIBLE_LENGTH);
      return;
    }

    if (index > JUMP_TRIGGER_INDEX_FORWARD) {
      setIsJumping(true);
      const realFirstCard = container.querySelector(
        `[data-index="${INITIAL_INDEX}"]`
      );
      if (realFirstCard instanceof HTMLElement) {
        const scrollTarget = calculateScrollTarget(realFirstCard, container);
        container.scrollLeft = scrollTarget;
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

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragMoved.current = 0;
    e.currentTarget.style.userSelect = "none";
    e.currentTarget.style.cursor = "grabbing";
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    dragMoved.current = e.clientX - dragStartX.current;
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);

    e.currentTarget.style.userSelect = "auto";
    e.currentTarget.style.cursor = "grab";

    const finalDragDistance = dragMoved.current;

    if (Math.abs(finalDragDistance) > SWIPE_THRESHOLD) {
      if (finalDragDistance < 0) {
        setIndex((prev) => prev + 1);
      } else {
        setIndex((prev) => prev - 1);
      }
    }

    autoScrollPaused.current = true;
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => {
      autoScrollPaused.current = false;
    }, 3000);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      handleMouseUp(e);
    }
  };

  const centeredIndex = index;

  return (
    <div className="hidden md:flex w-full justify-center">
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="flex overflow-hidden scrollbar-hide px-[10vw] gap-[40px] items-center h-[247px]"
        style={{
          cursor: "grab",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
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
              className="flex-none rounded-[16px] px-[36px] py-[40px] overflow-hidden min-w-[556px] max-w-[556px]"
              style={{
                transition: `all ${transitionDuration}`,
                backgroundColor: isCenter ? "#35c156" : "#ececec",
                color: isCenter ? "#ffffff" : "#666666",
                transform: isCenter ? "scale(1.05)" : "scale(0.95)",
                height: isCenter ? "235px" : "209px",
              }}
            >
              <div
                className="flex flex-col justify-between h-full"
                style={{ borderRadius: "11.13px" }}
              >
                <p
                  className="whitespace-normal break-all"
                  style={{
                    color: isCenter ? "#ffffff" : "#666666",
                    fontSize: isCenter ? "20px" : "16px",
                    transition: `all ${transitionDuration}`,
                  }}
                >
                  “{item.text}”
                </p>
                <p
                  className="text-right"
                  style={{
                    color: isCenter ? "#e6faef" : "#afafaf",
                    fontSize: isCenter ? "16px" : "12px",
                    transition: `all ${transitionDuration}`,
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

export default DesktopTestimonials;
