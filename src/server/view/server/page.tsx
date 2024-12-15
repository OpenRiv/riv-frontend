import RivToast from "../../../common/component/toast/rivToast";
import ServerSection from "./section/server_section";
import TitleSection from "./section/title_section";

export default function ServerPage() {
  return (
    <>
      <TitleSection />
      <ServerSection />
      <RivToast />
    </>
  );
}
