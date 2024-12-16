import Riv from "../../../../common/component/riv/Riv";

export default function TitleSection() {
  return (
    <div className="flex items-end justify-center h-[6rem] mb-[2rem] text-gray-09 text-[1.4rem]">
      <span>
        <Riv className="h-[4.5rem] mr-[1rem] mt-[1.25rem]" />
      </span>
      <span className="mb-[0.5rem]">
        <span className="font-bold">Riv와 함께할 서버</span>
        <span className="font-normal">를 선택해주세요</span>
      </span>
    </div>
  );
}
