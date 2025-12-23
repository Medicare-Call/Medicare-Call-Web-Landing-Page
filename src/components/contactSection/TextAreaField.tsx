import type React from "react";
import type { TextAreaFieldProps } from "../../types/types";

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  name,
  value,
  placeholder,
  required,
  onChange,
}) => {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <div
        style={{
          fontSize: "var(--b01-font-size)",
          lineHeight: "var(--b01-line-height)",
          fontWeight: "var(--b01-m-weight)",
        }}
        className="flex flex-col font-['Pretendard',sans-serif] justify-center not-italic relative shrink-0 text-[var(--mc-gray-6)] w-full"
      >
        <p>
          <span>{label} </span>
          <span
            className={
              required ? "text-[var(--mc-main-color)]" : "text-[var(--mc-gray-4)]"
            }
          >
            {required ? "(필수)" : "(선택)"}
          </span>
        </p>
      </div>
      <div className="bg-white h-[134px] md:h-[199px] relative rounded-[14px] shrink-0 w-full">
        <div
          aria-hidden="true"
          className="absolute border-[#d2d2d2] border-[1.2px] border-solid inset-0 pointer-events-none rounded-[14px]"
        />
        <div className="size-full">
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            style={{
              fontSize: "var(--b02-font-size)",
              lineHeight: "var(--b02-line-height)",
              fontWeight: "var(--b02-m-weight)",
            }}
            className="box-border content-stretch flex gap-[10px] h-full items-start px-[16px] py-[14px] relative w-full
           border border-[var(--mc-gray-2)]
           hover:bg-[var(--mc-gray-1)]
           hover:border-[var(--mc-gray-4)]
           focus:border-[var(--mc-main-color)]
           focus:bg-transparent
           focus:hover:border-[var(--mc-main-color)]
           focus:hover:bg-transparent
           outline-none
           font-['Pretendard',sans-serif]
           text-[var(--mc-gray-10)] placeholder:text-[var(--mc-gray-3)]
           resize-none rounded-[14px]"
            placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  );
};

export default TextAreaField;
