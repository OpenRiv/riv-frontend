import { useEffect, useState } from "react";
import { usePatchRecoding } from "../../../../hook/mutation/use_patch_recoding";
import { useGetRecodingId } from "../../../../hook/query/use_get_recoding_id";
import { toast } from "react-toastify";

interface Props {
  recodingId: number;
  toggleSheet: VoidFunction;
}

export default function useMarkUp({ recodingId, toggleSheet }: Props) {
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
          toast.success("회의록이 저장되었습니다.");
          toggleSheet();
          window.location.reload();
        },
        onError: () => {
          toast.error("저장에 실패했습니다.");
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
