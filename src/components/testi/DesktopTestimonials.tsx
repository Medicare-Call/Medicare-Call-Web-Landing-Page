import { useEffect, useRef, useState, useMemo } from "react";

const testimonials = [
  {
    id: 0,
    text: "지방에 계신 어머니와 매일 통화하기가 어려웠는데, 이젠 매일 아침 앱으로 컨디션을 확인하니 마음이 놓여요. 얼마 전엔 AI가 어지럽다는 말씀을 캐치해서 바로 연락드릴 수 있었어요. 정말 든든한 아들 노릇을 대신해주는 것 같아요.",
    author: "- 40대 직장인 김OO -",
  },
  {
    id: 1,
    text: "부모님과 떨어져 사는 외동딸이다 보니 늘 마음이 쓰였어요. 메디케어콜을 쓰고 나서는 ‘어제 잠은 잘 주무셨는지, 식사는 하셨는지’ 같은 기본 정보가 매일 정리돼서 너무 좋습니다. 특히 그날따라 기운 없다는 답변이 있을 때 바로 알림이 뜨는 기능이 정말 유용해요.",
    author: "- 50대 주부 이OO -",
  },
  {
    id: 2,
    text: "맞벌이라 하루가 어떻게 지나가는지도 모르는데, 부모님 건강까지 챙기려니 늘 죄송했죠. 그런데 메디케어콜을 이용하고부터는 아침·점심·저녁마다 부모님 상태가 자동으로 요약돼서 오니까 부담이 확 줄었어요. 챙김의 수준이 달라졌습니다.",
    author: "- 50대  직정인 강OO -",
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
      const scrollTarget = calculateScrollTarget(targetCard, container);
      container.scrollTo({
        left: scrollTarget,
        behavior: "smooth",
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
                    transition: `color ${transitionDuration}`,
                  }}
                >
                  "{item.text}"
                </p>
                <p
                  className="text-right"
                  style={{
                    color: isCenter ? "#e6faef" : "#afafaf",
                    fontSize: isCenter ? "16px" : "12px",
                    transition: `color ${transitionDuration}`,
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
