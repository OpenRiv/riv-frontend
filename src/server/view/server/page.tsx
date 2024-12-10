import { useGuildIdListener } from "./hook/use_guild_id_listener";
import ServerSection from "./section/server_section";
import TitleSection from "./section/title_section";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ServerPage() {
  useGuildIdListener(); // 리브 봇 추가 창에서 guildId가 저장이 되면 해당 guildId를 관리자서버에 전송

  return (
    <>
      <TitleSection />
      <ServerSection />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
