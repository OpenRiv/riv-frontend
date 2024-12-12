import { FunnelSimple, SortAscending } from "@phosphor-icons/react";
import Filter from "../../../component/button/filter";
import SearchBar from "../../../component/input/search_bar";
import MinuteCard from "../../../component/card/MinuteCard";
import { ListView } from "../../../component/list/listview";
import { categories, sortItems } from "../../../component/list/list_type";
import { formatDate } from "../utils/formatDate";
import MarkUpSection from "./MarkupSection";
import useSheet from "./hook/useSheet";
import useMinutes from "./hook/useMinutes";

export default function MinuteSection({ serverId }: Props) {
  const { isSheetOpen, toggleSheet } = useSheet();
  const {
    minutes,
    recodingId,
    channelId,
    updateRecodingId,
    lastMinuteRef,
    isFetchingNextPage,
  } = useMinutes({ serverId });

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
        className={`fixed top-0 right-0 h-full w-2/5 bg-gray-04 shadow-lg transform transition-transform duration-500 ease-in-out ${
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
