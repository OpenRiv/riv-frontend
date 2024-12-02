import {
  FloppyDiskBack,
  FunnelSimple,
  SortAscending,
} from "@phosphor-icons/react";
import Filter from "../../../component/button/filter";
import SearchBar from "../../../component/input/search_bar";
import MinuteCard from "../../../component/card/minute_card";
import { Minutes } from "../const/mock_data";
import { ListView } from "../../../component/list/listview";
import { categories, sortItems } from "../../../component/list/list_type";
import { useState } from "react";
import { X } from "lucide-react";
import RivEditor from "../../../component/editor";

export default function MinuteSection() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const toggleSheet = () => {
    setIsSheetOpen((prev) => !prev);
  };

  const mockData = Minutes;
  return (
    <section className="w-full mx-[4rem] mt-[2.5rem] pr-[9rem] relative">
      <SearchBar />
      <div className="flex flex-row gap-5 mt-[1.5rem]">
        <Filter
          icon={<SortAscending className="size-[1.2rem]" weight="bold" />}
          text="정렬"
          content={<ListView items={sortItems} />}
        />
        <Filter
          icon={<FunnelSimple className="size-[1.2rem]" weight="bold" />}
          text="카테고리"
          content={<ListView items={categories} />}
        />
      </div>
      <section className="my-[2rem] gap-[1rem] flex flex-col">
        {mockData.map((minute, index) => (
          <MinuteCard
            key={index}
            title={minute.title}
            preview={minute.preview}
            date={minute.date}
            onSheet={toggleSheet}
          />
        ))}
      </section>

      <div
        className={`fixed top-0 right-0 h-full w-2/5 bg-gray-04 shadow-lg transform transition-transform duration-500 ease-in-out ${
          isSheetOpen ? "translate-x-0" : "translate-x-full"
        } z-20`}
      >
        <div className="my-[1.5rem] ml-[2.2rem] mr-[1.5rem] flex flex-row items-start justify-between">
          <div className="">
            <h1 className="text-[1.25rem] font-bold text-gray-09">
              {mockData[0].title}
            </h1>
            <p className="text-[1rem] font-medium text-gray-07">
              2024. 10. 17 19:40 ~ 22:00
            </p>
          </div>
          <button onClick={toggleSheet} className="text-gray-07">
            <X size={32} />
          </button>
        </div>
        <RivEditor content={mockData[0].content} />
        <div className="flex justify-end mr-[2rem]">
          <button className="w-[6rem] py-[0.4rem] justify-center px-[0.5rem] flex flex-row items-center rounded-full text-white text-[0.7rem] bg-[#576DEF]">
            <FloppyDiskBack
              weight="fill"
              className="size-[1rem] mr-[0.25rem]"
            />
            회의록 저장
          </button>
        </div>
      </div>

      {isSheetOpen && (
        <div
          onClick={toggleSheet}
          className="fixed inset-0 bg-black opacity-35 z-10"
        />
      )}
    </section>
  );
}
