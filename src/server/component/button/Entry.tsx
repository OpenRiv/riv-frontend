import { ButtonHTMLAttributes } from "react";
import { cn } from "../../../common/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isRiv?: boolean;
}

export default function Entry({
  isRiv = false,
  className,
  ...props
}: ButtonProps) {
  const dftBtnStyle =
    "w-[5.8125rem] h-[4.0625rem] rounded-[0.75rem] text-medium hover:brightness-50 text-gray-09 transition duration-200";
  const typeStyle = isRiv ? "bg-primary hover:" : "bg-gray-05";

  return (
    <button className={cn(className, dftBtnStyle, typeStyle, "")} {...props}>
      {isRiv ? "열기" : "초대"}
    </button>
  );
}
