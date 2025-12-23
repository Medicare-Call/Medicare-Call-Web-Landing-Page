import { useEffect, useRef, useState, useMemo } from "react";
import { testimonials } from "../../constants/testimonials";

const CARD_TRANSITION_DURATION = 500;
const VISIBLE_LENGTH = testimonials.length;
const INITIAL_INDEX = 1;
const JUMP_TRIGGER_INDEX_FORWARD = VISIBLE_LENGTH + 1;
const JUMP_TRIGGER_INDEX_BACKWARD = 0;

const MobileTestimonial = () => {
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

export default MobileTestimonial;
