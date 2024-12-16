import { MagnifyingGlass } from "@phosphor-icons/react";

export default function SearchBar() {
  return (
    <div className="relative w-full text-gray-07">
      <input
        type="text"
        className="focus:border-gray-07 focus:border focus-border-[0.2rem] px-[3.5rem] w-full h-[3.5rem] rounded-[0.4rem] bg-gray-03"
        placeholder="회의내용 검색"
      ></input>
      <MagnifyingGlass className="size-[1.5rem] rotate-90 absolute left-[1.5rem] top-1/2 transform -translate-y-1/2 z-10" />
    </div>
  );
}
