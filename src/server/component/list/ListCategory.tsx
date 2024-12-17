import { cn } from "../../../common/utils/cn";
import ServerToggle from "../button/ServerToggle";

export default function ListCategory({
  className,
  categories = [],
  category,
  handleCategory,
}: Props) {
  // 카테고리 유효성 검사 (null, undefined, 빈 문자열 제거)
  const validCategories = categories.filter(
    (catName) => typeof catName === "string" && catName.trim() !== ""
  );

  // "카테고리 선택" + 유효한 카테고리만 병합
  const mergedCategories: Item[] = [
    { name: "카테고리 선택", isToggle: false },
    ...validCategories.map((catName) => ({ name: catName, isToggle: true })),
  ];

  return (
    <div
      className={cn(
        className,
        "rounded-2xl bg-gray-02 text-gray-07 py-[0.8rem] min-w-[10rem] h-fit"
      )}
    >
      {mergedCategories.map((item, index) => {
        const isActive = category === item.name;

        return (
          <div
            key={item.name + index}
            className={cn(
              item.className,
              `font-medium flex flex-row items-center gap-[2rem] justify-between cursor-pointer px-[1.1rem] py-[0.4rem]`
            )}
            onClick={() => handleCategory(item.name)}
          >
            <div className="truncate whitespace-nowrap overflow-hidden">
              {item.name}
            </div>
            {item.isToggle && (
              <ServerToggle
                isActive={isActive}
                onToggle={() => handleCategory(item.name)}
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
  categories: string[];
  category: string;
  handleCategory: (state: string) => void;
}

export { ListCategory };
