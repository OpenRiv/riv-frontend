import RivFace from "../component/riv/riv_face";
import { Avatar, AvatarFallback, AvatarImage } from "../component/radix/avator";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <section className="w-full h-[4rem] bg-gray-03 px-[2rem]">
      <section className="max-w-full h-full mx-[1rem] flex flex-row items-center justify-between">
        <div
          className="flex flex-row items-center gap-[1rem] cursor-pointer"
          onClick={() => navigate(`/server`)}
        >
          <RivFace className="size-[2rem]" />
          <p className="text-gray-09 font-black text-[1.25rem]">RIV</p>
        </div>
        <div className="flex flex-row items-center gap-[0.5rem]">
          <Avatar className="size-[2rem]">
            <AvatarImage src={"https://picsum.photos/id/222/700/500"} />
            <AvatarFallback className="text-white bg-gray-03 text-[1.75rem] font-semibold">
              "리브"
            </AvatarFallback>
          </Avatar>
          <p className="text-gray-09">리브</p>
        </div>
      </section>
    </section>
  );
}
