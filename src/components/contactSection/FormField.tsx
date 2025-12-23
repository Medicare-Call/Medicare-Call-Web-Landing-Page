import type React from "react";
import type { FormFieldProps } from "../../types/types";

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type,
  value,
  placeholder,
  required,
  error,
  onChange,
  onBlur,
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
              error
                ? "text-[var(--destructive)]"
                : required
                ? "text-[var(--mc-main-color)]"
                : "text-[var(--mc-gray-4)]"
            }
          >
            {required ? "(필수)" : "(선택)"}
          </span>
        </p>
      </div>
      <div className="bg-white h-[58px] relative rounded-[14px] shrink-0 w-full">
        <div
          aria-hidden="true"
          className={`absolute border-[#d2d2d2] border-[1.2px] border-solid inset-0 pointer-events-none rounded-[14px]`}
        />
        <div className="flex flex-row items-center size-full">
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            style={{
              fontSize: "var(--b02-font-size)",
              lineHeight: "var(--b02-line-height)",
              fontWeight: "var(--b02-m-weight)",
            }}
            className={`box-border content-stretch flex gap-[10px] h-[58px] items-center px-[16px] py-[14px] relative w-full
            bg-transparent
            border border-[var(--mc-gray-2)]
            hover:border-[var(--mc-gray-4)]
            hover:bg-[var(--mc-gray-1)]
            focus:border-[var(--mc-main-color)]
            focus:bg-transparent
            focus:hover:border-[var(--mc-main-color)]
            focus:hover:bg-transparent
            rounded-[14px]
            outline-none
            font-['Pretendard',sans-serif]
            placeholder:text-[var(--mc-gray-3)]
            ${error ? "text-[var(--mc-gray-3)]" : "text-[var(--mc-gray-10)]"}`}
            placeholder={placeholder}
            required={required}
          />
        </div>
      </div>
      {error && (
        <p
          style={{
            fontSize: "var(--b02-font-size)",
            lineHeight: "var(--b02-line-height)",
            fontWeight: "var(--b02-r-weight)",
          }}
          className="font-['Pretendard',sans-serif] text-[#FF8C8C] mt-[-8px]"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
