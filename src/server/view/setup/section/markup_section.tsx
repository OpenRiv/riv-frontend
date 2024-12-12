import { X } from "lucide-react";
import RivEditor from "../../../component/editor";
import { FloppyDiskBack } from "@phosphor-icons/react";
import { formatDate } from "../utils/formatDate";
import useMarkUp from "./hook/useMarkup";

export default function MarkUpSection({ recodingId, toggleSheet }: Props) {
  const {
    data,
    isLoading,
    title,
    handleTitleChange,
    handleTextChange,
    handleSave,
  } = useMarkUp({ recodingId, toggleSheet });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="my-[1.5rem] ml-[2.2rem] mr-[1.5rem] flex flex-row items-start justify-between">
        <div className="">
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="text-[1.25rem] font-bold text-gray-09 bg-transparent border-gray-07 outline-none"
            placeholder="회의록 제목 입력"
          />
          <p className="text-[1rem] font-medium text-gray-07">
            {formatDate(data?.createdAt || "")}
          </p>
        </div>
        <button onClick={toggleSheet} className="text-gray-07">
          <X size={32} />
        </button>
      </div>
      <RivEditor content={data?.text} onChange={handleTextChange} />{" "}
      <div className="flex justify-end mr-[2rem]">
        <button
          onClick={handleSave}
          className="w-[6rem] py-[0.4rem] justify-center px-[0.5rem] flex flex-row items-center rounded-full text-white text-[0.7rem] bg-[#576DEF]"
        >
          <FloppyDiskBack weight="fill" className="size-[1rem] mr-[0.25rem]" />
          회의록 저장
        </button>
      </div>
    </>
  );
}

interface Props {
  recodingId: number;
  toggleSheet: VoidFunction;
}
