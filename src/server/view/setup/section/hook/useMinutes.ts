import { useRef, useCallback, useState } from "react";
import { useGetServerIdChannels } from "../../../../hook/query/use_get_servers_id_channels";
import { useGetServerChannelsId } from "../../../../hook/query/use_get_server_channels_id";

export default function useMinutes({ serverId }: Props) {
  const [recodingId, setRecodingId] = useState<number>(0);
  const observer = useRef<IntersectionObserver | null>(null);

  const updateRecodingId = (newRecordingId: number) => {
    setRecodingId(newRecordingId);
  };

  const { data: channelData } = useGetServerIdChannels({ serverId });
  const channelId: number = channelData ?? 0;

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useGetServerChannelsId({
      channelId,
      size: 5, // 페이지당 아이템 수
    });

  const minutes = data?.pages.flatMap((page) => page.data.textInfoList) ?? [];

  const lastMinuteRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage(); // 다음 페이지 데이터 로드
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  return {
    recodingId,
    updateRecodingId,
    minutes,
    lastMinuteRef,
    isFetching,
    isFetchingNextPage,
    channelId,
  };
}

interface Props {
  serverId: number;
}
