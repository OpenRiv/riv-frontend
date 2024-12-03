import { useState } from "react";
import { FunnelSimple, SortAscending } from "@phosphor-icons/react";
import Filter from "../../../component/button/filter";
import SearchBar from "../../../component/input/search_bar";
import MinuteCard from "../../../component/card/minute_card";
import { ListView } from "../../../component/list/listview";
import { categories, sortItems } from "../../../component/list/list_type";
import { useGetServerIdChannels } from "../../../hook/query/use_get_servers_id_channels";
import { useId } from "../../../../common/hook/route/useId";
import {
  textInfoList,
  useGetServerChannelsId,
} from "../../../hook/query/use_get_server_channels_id";
import { formatDate } from "../utils/formatDate";
import MarkUpSection from "./markup_section";

export default function MinuteSection() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [recodingId, setRecodingId] = useState(0);

  const toggleSheet = () => {
    setIsSheetOpen((prev) => !prev);
  };

  const updateRecodingId = (newRecordingId: number) => {
    setRecodingId(newRecordingId);
  };

  const id = useId();
  const serverId: string = id ?? "";
  const { data } = useGetServerIdChannels({ serverId });
  const channelId: number = data ?? 0;
  const { data: minute } = useGetServerChannelsId({
    channelId: channelId,
    size: 10,
    page: 0,
  });

  const minutes: textInfoList[] | undefined = minute?.data.textInfoList;

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
        {minutes?.map((minute, index) => (
          <MinuteCard
            key={index}
            recordingId={minute.recodingId}
            title={minute.title}
            preview={minute.subtext}
            date={formatDate(minute.createdAt)}
            onSheet={() => {
              toggleSheet();
              updateRecodingId(minute.recodingId);
            }}
          />
        ))}
      </section>

      <div
        className={`fixed top-0 right-0 h-full w-2/5 bg-gray-04 shadow-lg transform transition-transform duration-500 ease-in-out ${
          isSheetOpen ? "translate-x-0" : "translate-x-full"
        } z-20`}
      >
        {recodingId && (
          <MarkUpSection toggleSheet={toggleSheet} recodingId={recodingId} />
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
