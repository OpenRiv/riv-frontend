import { FunnelSimple, SortAscending } from "@phosphor-icons/react";
import Filter from "../../../component/button/Filter";
import SearchBar from "../../../component/input/SearchBar";
import MinuteCard from "../../../component/card/MinuteCard";
import { formatDate } from "../utils/formatDate";
import MarkUpSection from "./MarkupSection";
import useSheet from "./hook/useSheet";
import useMinutes from "./hook/useMinutes";
import ListCurrent from "../../../component/list/ListCurrent";
import { useGetServersChannelsIdCategory } from "../../../hook/query/useGetServersChannelsIdCategory";
import ListCategory from "../../../component/list/ListCategory";

export default function MinuteSection({ serverId }: Props) {
  const { isSheetOpen, toggleSheet } = useSheet();
  const {
    minutes,
    recodingId,
    isdesc,
    category,
    channelId,
    updateRecodingId,
    handleDesc,
    handleCategory,
    lastMinuteRef,
    isFetchingNextPage,
  } = useMinutes({ serverId });
  const { data, isLoading, isError } = useGetServersChannelsIdCategory({
    channelId,
  });

  const categories: string[] = data ?? [];

  return (
    <section className="w-full mx-[4rem] mt-[2.5rem] pr-[9rem] relative">
      <SearchBar />
      <div className="flex flex-row gap-5 mt-[1.5rem]">
        <Filter
          icon={<SortAscending className="size-[1.2rem]" weight="bold" />}
          text="정렬"
          content={<ListCurrent isDesc={isdesc} handleDesc={handleDesc} />}
        />
        <Filter
          icon={<FunnelSimple className="size-[1.2rem]" weight="bold" />}
          text="카테고리"
          content={
            !isLoading &&
            !isError && (
              <ListCategory
                category={category}
                categories={categories}
                handleCategory={handleCategory}
              />
            )
          }
        />
      </div>
      <section className="my-[2rem] gap-[1rem] flex flex-col">
        {minutes.map((minute, index) => {
          if (minutes.length === index + 1) {
            return (
              <div ref={lastMinuteRef} key={index}>
                <MinuteCard
                  channelId={channelId}
                  recordingId={minute.recodingId}
                  title={minute.title}
                  preview={minute.subtext}
                  date={formatDate(minute.createdAt)}
                  onSheet={() => {
                    toggleSheet();
                    updateRecodingId(minute.recodingId);
                  }}
                />
              </div>
            );
          } else {
            return (
              <MinuteCard
                key={index}
                channelId={channelId}
                recordingId={minute.recodingId}
                title={minute.title}
                preview={minute.subtext}
                date={formatDate(minute.createdAt)}
                onSheet={() => {
                  toggleSheet();
                  updateRecodingId(minute.recodingId);
                }}
              />
            );
          }
        })}
      </section>

      {isFetchingNextPage && <div className="text-center">로딩 중...</div>}

      <div
        className={`fixed top-0 right-0 h-full w-1/2 bg-gray-04 shadow-lg transform transition-transform duration-500 ease-in-out ${
          isSheetOpen ? "translate-x-0" : "translate-x-full"
        } z-20`}
      >
        {recodingId && (
          <MarkUpSection
            channelId={channelId}
            toggleSheet={toggleSheet}
            recodingId={recodingId}
          />
        )}
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

interface Props {
  serverId: number;
}
