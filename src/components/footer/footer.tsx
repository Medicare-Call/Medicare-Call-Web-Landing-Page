const Footer = () => {
  return (
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
                    src="/images/medicare.png"
                  />
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                <p
                  style={{
                    fontSize: "var(--b03-font-size)",
                    lineHeight: "var(--b03-line-height)",
                    fontWeight: "var(--b03-m-weight)",
                  }}
                  className="font-['Pretendard',sans-serif] md:text-[var(--b02-font-size)] md:leading-[var(--b02-line-height)] md:font-[var(--b02-m-weight)] lg:text-[var(--b01-font-size)] lg:leading-[var(--b01-line-height)] lg:font-[var(--b01-m-weight)] not-italic relative shrink-0 text-[var(--mc-gray-5)] text-nowrap whitespace-pre"
                >
                  © 2025 Medicare Call. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
