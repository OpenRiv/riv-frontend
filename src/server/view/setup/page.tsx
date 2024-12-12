import { useId } from "../../../common/hook/route/useId";
import { useGetServersServer } from "../../hook/query/use_get_servers_server";
import MinuteSection from "./section/minute_section";
import SideSection from "./section/side_section";
import "react-toastify/dist/ReactToastify.css";
import RivToast from "../../../common/component/toast/rivToast";

export default function SetupPage() {
  const id = useId();
  const { data, isLoading, isError } = useGetServersServer({
    serverUnique: id,
    isRiv: true,
  });

  const serverId: number = data || 0;

  return (
    <>
      <div className="flex flex-row h-full bg-gray-04">
        <SideSection />
        {isLoading || isError ? <></> : <MinuteSection serverId={serverId} />}
      </div>
      <RivToast />
    </>
  );
}
