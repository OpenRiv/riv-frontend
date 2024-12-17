import { ReactNode } from "react";
import { cn } from "../../../common/utils/cn";

interface ListProps {
  isAct?: boolean;
  icon: ReactNode;
  text: string;
  className?: string;
  onClick?: VoidFunction;
}

export default function List({
  isAct = false,
  icon,
  text,
  className = "",
  onClick = () => {},
}: ListProps) {
  const defaultColor = isAct ? "text-gray-09" : "text-gray-07";
  return (
    <div
      onClick={onClick}
      className={cn(
        className,
        defaultColor,
        "flex items-center h-fit cursor-pointer hover:text-gray-09"
      )}
    >
      <span className="mr-[1.25rem]">{icon}</span>
      <span className="font-medium text-[1.2rem]">{text}</span>
    </div>
  );
}
