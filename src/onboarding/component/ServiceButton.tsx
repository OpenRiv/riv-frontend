import { cn } from "../../common/utils/cn";

export default function ServiceButton({
  className = "",
  text = "",
  icon = "",
  iconSize = "1.2rem",
  ...props
}: ServiceButtonProps) {
  return (
    <button
      className={cn(
        "bg-slate-600 px-[1rem] py-[0.5rem] rounded-md text-white font-medium flex items-center justify-center hover:brightness-75 transition duration-500 ease-in-out",
        className
      )}
      {...props}
    >
      {icon && (
        <img
          src={icon}
          style={{ width: iconSize, height: "auto" }}
          className="inline mr-[0.5rem]"
        />
      )}
      {text}
    </button>
  );
}

interface ServiceButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  text?: string;
  icon?: string;
  iconSize?: string;
}
