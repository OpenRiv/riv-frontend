import { useState } from "react";
import ServerToggle from "../button/ServerToggle";
import { cn } from "../../../common/utils/cn";

function ListView({ items, className }: ListViewProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(1);

  const handleToggle = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  return (
    <div
      className={cn(
        className,
        "rounded-2xl bg-gray-02 text-gray-07  py-[0.8rem] min-w-[10rem] h-fit"
      )}
    >
      {items.map((item, index) => (
        <div
          key={item.name + index}
          className={cn(
            item.className,
            `font-medium flex flex-row items-center gap-[2.2rem] justify-between cursor-pointer px-[1.1rem] py-[0.4rem]`
          )}
        >
          {item.name}
          {item.isToggle && (
            <ServerToggle
              isActive={activeIndex === index}
              onToggle={() => handleToggle(index)}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export interface Item {
  name: string;
  isToggle?: boolean;
  className?: string;
}

interface ListViewProps {
  items: Item[];
  className?: string;
}

export { ListView };
