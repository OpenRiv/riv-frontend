import { useId } from "../../../common/hook/route/useId";
import { useGetServersServer } from "../../hook/query/use_get_servers_server";
import MinuteSection from "./section/MinuteSection";
import SideSection from "./section/SideSection";
import "react-toastify/dist/ReactToastify.css";
import RivToast from "../../../common/component/toast/rivToast";
import { useRecoilState } from "recoil";
import { sectionState } from "./state/state";
import MenualSection from "./section/MenualSection";

export default function SetupPage() {
  const id = useId();
  const { data, isLoading, isError } = useGetServersServer({
    serverUnique: id,
    isRiv: true,
  });

  const [isMinuteSection] = useRecoilState(sectionState);

  const serverId: number = data || 0;

  return (
    <>
      <div className="flex flex-row h-full bg-gray-04">
        <SideSection guildId={id} />
        {!isMinuteSection || isLoading || isError ? (
          <></>
        ) : (
          <MinuteSection serverId={serverId} />
        )}
        {!isMinuteSection && <MenualSection />}
      </div>
      <RivToast />
    </>
  );
}
