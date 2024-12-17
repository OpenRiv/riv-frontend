import { useQuery } from "@tanstack/react-query";
import { client } from "../../../common/api/backend/client";

// 특정 recodingId와 channelId로 레코딩 정보를 조회하는 API 훅
export const useGetRecodingId = ({ recodingId }: Props) => {
  const getRecodingId = async ({ recodingId }: Props) => {
    const response = await client<RespType>({
      url: `/recoding/${recodingId}`,
      method: "get",
    });

    // 변환된 데이터 반환
    return transformResponse(response.data.data);
  };

  return useQuery({
    queryKey: ["get-recoding-id", recodingId],
    queryFn: () => getRecodingId({ recodingId }),
  });
};

// 날짜 및 시간 형식을 변환하는 함수
const transformResponse = (data: RespType["data"]) => {
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return {
      datePart: `${year}. ${month}. ${day}`,
      timePart: `${hours}:${minutes}`,
    };
  };

  // 시작 시간과 끝 시간 변환
  const start = formatDateTime(data.startTime);
  const end = formatDateTime(data.endTime);

  // 같은 날짜인지 확인
  const isSameDay = start.datePart === end.datePart;

  // 최종 형식화된 문자열
  const formattedDateTime = isSameDay
    ? `${start.datePart} ${start.timePart} ~ ${end.timePart}`
    : `${start.datePart} ${start.timePart} ~ ${end.datePart} ${end.timePart}`;

  // 반환할 데이터
  return {
    ...data,
    formattedDateTime,
  };
};

// Props와 RespType 타입
interface Props {
  recodingId: number;
}

interface RespType {
  status: number;
  code: string;
  message: string;
  data: {
    recodingId: number;
    title: string;
    text: string;
    createdAt: string;
    startTime: string;
    endTime: string;
  };
}
