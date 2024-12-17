import { MagnifyingGlass } from "@phosphor-icons/react";
import { useSetRecoilState } from "recoil";
import { SearchState } from "../../view/setup/section/recoil/state";
import { useRef, useEffect, useState } from "react";

export default function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const setSearchInput = useSetRecoilState(SearchState);
  const [searchValue, setSearchValue] = useState<string>(""); // 로컬 상태
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // 디바운싱 핸들러
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    // 1초 뒤에 상태를 업데이트
    debounceRef.current = setTimeout(() => {
      setSearchInput(searchValue);
    }, 1000);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchValue, setSearchInput]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value); // 로컬 상태 업데이트
  };

  return (
    <div className="relative w-full text-gray-07">
      <input
        ref={inputRef}
        type="text"
        className="focus:border-gray-07 focus:border focus-border-[0.2rem] px-[3.5rem] w-full h-[3.5rem] rounded-[0.4rem] bg-gray-03"
        placeholder="회의내용 검색"
        onChange={handleInputChange} // 입력 이벤트 핸들러
      />
      <MagnifyingGlass className="size-[1.5rem] rotate-90 absolute left-[1.5rem] top-1/2 transform -translate-y-1/2 z-10" />
    </div>
  );
}
