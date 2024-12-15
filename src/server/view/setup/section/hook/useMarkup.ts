import { useEffect, useState } from "react";
import { usePatchRecoding } from "../../../../hook/mutation/usePatchRecording";
import { useGetRecodingId } from "../../../../hook/query/useGetRecordingId";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  recodingId: number;
  toggleSheet: VoidFunction;
  channelId: number;
}

export default function useMarkUp({
  recodingId,
  channelId,
  toggleSheet,
}: Props) {
  const queryClient = useQueryClient();
  const { data, isLoading } = useGetRecodingId({ recodingId });
  const { mutate: patchRecoding } = usePatchRecoding();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    if (data) {
      setTitle(data.title || ""); // title 동기화
      setText(data.text || ""); // text 동기화
    }
  }, [data]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTextChange = (newText: string) => {
    setText(newText); // 에디터에서 변경된 텍스트를 상태에 저장
  };

  const handleSave = () => {
    patchRecoding(
      { recodingId, title, text },
      {
        onSuccess: () => {
          toast.success("회의록이 수정되었습니다.");
          toggleSheet();
          queryClient.invalidateQueries({
            queryKey: ["servers-channels-channelId", channelId],
          });
        },
        onError: () => {
          toast.error("수정에 실패했습니다.");
        },
      }
    );
  };

  return {
    data,
    isLoading,
    title,
    handleTitleChange,
    handleTextChange,
    handleSave,
  };
}
