import { useEffect, useRef, useState, useMemo } from "react";
import { testimonials } from "../../constants/testimonials";

const CARD_TRANSITION_DURATION = 500;
const VISIBLE_LENGTH = testimonials.length;
const INITIAL_INDEX = 1;
const JUMP_TRIGGER_INDEX_FORWARD = VISIBLE_LENGTH + 1;
const JUMP_TRIGGER_INDEX_BACKWARD = 0;
const SWIPE_THRESHOLD = 50;

const DesktopTestimonial = () => {
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

export default DesktopTestimonial;
