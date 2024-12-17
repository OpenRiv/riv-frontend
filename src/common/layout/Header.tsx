import RivFace from "../component/riv/RivFace";
import { Avatar, AvatarFallback, AvatarImage } from "../component/radix/Avator";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../hook/query/useGetUserInfo";

export default function Header() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useUserInfo();

  if (isLoading) {
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
          <div className="flex flex-row items-center gap-[0.5rem]"></div>
        </section>
      </section>
    );
  }

  if (isError) {
    navigate("/");
  }

  return (
    <section className="w-full h-[4rem] bg-gray-03 px-[2rem]">
      <section className="max-w-full h-full mx-[1rem] flex flex-row items-center justify-between">
        <div
          className="flex rounded-[0.2rem] flex-row items-center gap-[1rem] cursor-pointer py-[1rem] px-[0.5rem] hover:bg-slate-700"
          onClick={() => navigate(`/server`)}
        >
          <RivFace className="size-[2rem]" />
          <p className="text-gray-09 font-black text-[1.25rem]">RIV</p>
        </div>
        <div
          className="rounded-[0.2rem] flex flex-row items-center gap-[0.5rem] cursor-pointer hover:bg-slate-700 py-[1rem] px-[0.5rem]"
          onClick={() => {
            window.open(`discord://`, "_blank", "noopener, noreferrer");
          }}
        >
          <Avatar className="size-[2rem]">
            <AvatarImage
              src={
                data?.avatar
                  ? `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`
                  : "https://cdn.discordapp.com/embed/avatars/0.png"
              }
            />
            <AvatarFallback className="text-white bg-gray-03 text-[1.75rem] font-semibold"></AvatarFallback>
          </Avatar>
          <p className="text-gray-09">{data && data.global_name}</p>
        </div>
      </section>
    </section>
  );
}
