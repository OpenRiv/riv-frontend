import { DotsThree } from "@phosphor-icons/react";
import { useDeleteRecoding } from "../../hook/mutation/use_delete_recoding";
import { toast } from "react-toastify";

export default function MinuteCard({
  title,
  preview,
  date,
  recordingId,
  onSheet,
}: MinuteCardProps) {
  const textStyle = "font-regular text-[0.8rem]";

  const { mutate: deleteRecoding } = useDeleteRecoding();

  const handleDelete = (recodingId: number) => {
    deleteRecoding(
      { recodingId },
      {
        onSuccess: () => {
          toast.success("회의록이 삭제되었습니다.");
          window.location.reload();
        },
        onError: (error) => {
          console.error("삭제 실패:", error);
          toast.error("삭제에 실패했습니다.");
        },
      }
    );
  };

  return (
    <div className="relative w-full">
      <div className="bg-[#383A45] text-gray-07 w-full h-[9rem] rounded-[0.9rem] space-y-[0.7rem] flex flex-col justify-center pl-[1.5rem]">
        <h1 className="font-bold text-gray-09 text-[1.2rem]">{title}</h1>
        <p className={textStyle}>{preview}</p>
        <p className={textStyle}>{date}</p>
      </div>
      <div className="absolute top-[0.5rem] right-[0.75rem] group flex flex-col items-end">
        <DotsThree
          weight="bold"
          className="size-[1.75rem] text-gray-07 group-hover:text-gray-09"
        />
        <div className="group-hover:block hidden rounded-[0.8rem] bg-gray-02 text-gray-07 min-w-[6rem] h-[4.5rem]">
          <div className="h-full flex flex-col justify-center items-center text-[0.8rem] gap-[0.2rem]">
            <button
              onClick={onSheet}
              className="hover:brightness-150 w-full h-full pt-[0.8rem] pr-[0.8rem]"
            >
              수정하기
            </button>
            <button
              onClick={() => handleDelete(recordingId)}
              className="hover:brightness-75 text-red-01 w-full h-full pb-[0.8rem] pr-[0.8rem]"
            >
              삭제하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MinuteCardProps {
  title: string;
  preview: string;
  date: string;
  onSheet: VoidFunction;
  recordingId: number;
}
