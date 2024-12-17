import { cn } from "../../../common/utils/cn";
import ServerToggle from "../button/ServerToggle";

export default function ListCurrent({ className, isDesc, handleDesc }: Props) {
  const sortItems: Item[] = [
    { name: "정렬 기준", isToggle: false },
    { name: "최근 날짜", isToggle: true },
    { name: "오래된 날짜", isToggle: true },
  ];

  return (
    <div
      className={cn(
        className,
        "rounded-2xl bg-gray-02 text-gray-07 py-[0.8rem] min-w-[10rem] h-fit"
      )}
    >
      {sortItems.map((item, index) => {
        const isActive = (index === 1 && isDesc) || (index === 2 && !isDesc);

        return (
          <div
            key={item.name + index}
            className={cn(
              item.className,
              `font-medium flex flex-row items-center gap-[2rem] justify-between cursor-pointer px-[1.1rem] py-[0.4rem]`
            )}
          >
            <div className="truncate whitespace-nowrap overflow-hidden">
              {item.name}
            </div>
            {item.isToggle && (
              <ServerToggle
                isActive={isActive}
                onToggle={() => handleDesc(index === 1)} // 최근 날짜 = true, 오래된 날짜 = false
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

interface Item {
  name: string;
  isToggle?: boolean;
  className?: string;
}

interface Props {
  className?: string;
  isDesc: boolean;
  handleDesc: (state: boolean) => void;
}

export { ListCurrent };
