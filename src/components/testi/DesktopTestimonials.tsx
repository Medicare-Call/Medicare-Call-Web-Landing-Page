import { useEffect, useRef, useState, useMemo } from "react";

// 원본 후기 데이터
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

const CARD_TRANSITION_DURATION = 500; // 카드 스타일 애니메이션 시간 (ms)
const VISIBLE_LENGTH = testimonials.length; // 5 (실제 아이템 개수: 1~5)
const INITIAL_INDEX = 1; // [0] (Fake Last) 다음인 실제 첫 번째 항목의 인덱스 (Item 0)
const JUMP_TRIGGER_INDEX_FORWARD = VISIBLE_LENGTH + 1; // 6 (Fake Item 0)
const JUMP_TRIGGER_INDEX_BACKWARD = 0; // 0 (Fake Item 4)
const SWIPE_THRESHOLD = 50; // 드래그로 슬라이드를 넘기는 최소 거리 (px)

const DesktopTestimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(INITIAL_INDEX);
  const [isJumping, setIsJumping] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // 마우스 드래그 상태를 추적하기 위한 Ref
  const dragStartX = useRef(0);
  const dragMoved = useRef(0);

  // 수동 스크롤/자동 롤링 제어 변수
  const autoScrollPaused = useRef(false);
  const pauseTimer = useRef<number | null>(null);

  // [무한 캐러셀 핵심] 배열 확장
  const infiniteTestimonials = useMemo(() => {
    const lastItem = testimonials[VISIBLE_LENGTH - 1]; // Item 4
    const firstItem = testimonials[0]; // Item 0
    const secondItem = testimonials[1]; // Item 1

    // 구조: [Item 4 (F, i=0), Item 0-4 (R, i=1~5), Item 0 (F, i=6), Item 1 (F, i=7)]
    return [lastItem, ...testimonials, firstItem, secondItem];
  }, []);

  // -------------------------
  // 1. 자동 롤링 (Timer)
  // -------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      if (!autoScrollPaused.current && !isJumping && !isDragging) {
        setIndex((prev) => prev + 1);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isJumping, isDragging]);

  // -------------------------
  // 2. Scroll and Jump Logic (index 변경 시 실행)
  // -------------------------
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // A. JUMP RESET (점프 완료 후 transition 재활성화)
    if (isJumping && index === INITIAL_INDEX) {
      const resetTimeout = setTimeout(() => {
        setIsJumping(false);
      }, 10);
      return () => clearTimeout(resetTimeout);
    }

    const targetCard = container.querySelector(`[data-index="${index}"]`);
    if (!targetCard) return;

    // B. FORWARD JUMP (index 6 -> index 1)
    if (index === JUMP_TRIGGER_INDEX_FORWARD) {
      targetCard.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });

      const jumpTimeout = setTimeout(() => {
        setIsJumping(true); // transition 비활성화

        const realFirstCard = container.querySelector(
          `[data-index="${INITIAL_INDEX}"]`
        );
        if (realFirstCard) {
          realFirstCard.scrollIntoView({
            behavior: "auto",
            block: "nearest",
            inline: "center",
          });
        }
        setIndex(INITIAL_INDEX); // Index를 1로 리셋
      }, CARD_TRANSITION_DURATION + 100);

      return () => clearTimeout(jumpTimeout);
    }

    // C. BACKWARD JUMP CATCH (index 0 -> index 5)
    if (index === JUMP_TRIGGER_INDEX_BACKWARD) {
      setIsJumping(true);
      const realLastCard = container.querySelector(
        `[data-index="${VISIBLE_LENGTH}"]`
      ); // Index 5
      if (realLastCard) {
        realLastCard.scrollIntoView({
          behavior: "auto",
          block: "nearest",
          inline: "center",
        });
      }
      setIndex(VISIBLE_LENGTH); // Index를 5로 세팅
      return;
    }

    // D. INSTANT JUMP CATCH (Interval이 너무 빨라 index 7로 넘어간 경우)
    if (index > JUMP_TRIGGER_INDEX_FORWARD) {
      setIsJumping(true);
      const realFirstCard = container.querySelector(
        `[data-index="${INITIAL_INDEX}"]`
      );
      if (realFirstCard) {
        realFirstCard.scrollIntoView({
          behavior: "auto",
          block: "nearest",
          inline: "center",
        });
      }
      setIndex(INITIAL_INDEX);
      return;
    }

    // E. NORMAL SCROLL (Index 1 through 5, and controlled manual movement)
    if (
      index >= JUMP_TRIGGER_INDEX_BACKWARD &&
      index <= JUMP_TRIGGER_INDEX_FORWARD
    ) {
      // 자동 롤링/수동 드래그 완료 시 smooth scroll 실행
      targetCard.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [index, isJumping]);

  // -------------------------
  // 3. 마우스 드래그/스와이프 핸들러
  // -------------------------
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragMoved.current = 0;
    // 드래그 중 텍스트 선택 방지
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

    // 드래그 해제 후 스타일 복구
    e.currentTarget.style.userSelect = "auto";
    e.currentTarget.style.cursor = "grab";

    const finalDragDistance = dragMoved.current;

    if (Math.abs(finalDragDistance) > SWIPE_THRESHOLD) {
      // Swiped Left (finalDragDistance < 0): 다음 항목 (오른쪽)으로 이동
      if (finalDragDistance < 0) {
        setIndex((prev) => prev + 1);

        // Swiped Right (finalDragDistance > 0): 이전 항목 (왼쪽)으로 이동
      } else {
        setIndex((prev) => prev - 1);
      }
    }

    // Pause auto-scroll briefly after manual interaction
    autoScrollPaused.current = true;
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => {
      autoScrollPaused.current = false;
    }, 3000);
  };

  // onMouseLeave는 마우스 버튼을 누른 상태에서 컨테이너를 벗어났을 때도
  // 마우스 업 이벤트를 처리하도록 합니다.
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      handleMouseUp(e);
    }
  };

  const centeredIndex = index;

  return (
    <div className="hidden md:flex w-full justify-center">
      {" "}
      <div
        ref={scrollRef}
        // 네이티브 스크롤 및 스냅 비활성화 (JS 제어)
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
        {" "}
        {infiniteTestimonials.map((item, i) => {
          const isCenter = centeredIndex === i;

          // isJumping 상태에 따라 transition 속성을 동적으로 설정합니다.
          const transitionDuration = isJumping
            ? "0ms"
            : `${CARD_TRANSITION_DURATION}ms`;

          return (
            <div
              key={item.id + "-" + i} // 고유 키
              data-index={i} // 스크롤 로직에서 사용할 데이터 속성
              // snap-center 및 scroll-mx-10 제거 (JS 제어이므로 불필요)
              className="flex-none rounded-[16px] px-[36px] py-[40px] overflow-hidden min-w-[556px] max-w-[556px]"
              style={{
                transition: `all ${transitionDuration}`,
                backgroundColor: isCenter ? "#35c156" : "#ececec",
                color: isCenter ? "#ffffff" : "#666666",
                transform: isCenter ? "scale(1.05)" : "scale(0.95)",
                height: isCenter ? "235px" : "209px",
              }}
            >
              {" "}
              <div
                className="flex flex-col justify-between h-full"
                style={{ borderRadius: "11.13px" }}
              >
                {" "}
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
