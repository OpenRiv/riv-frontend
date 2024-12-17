import RivToast from "../../../common/component/toast/RivToast";
import ServerSection from "./section/ServerSection";
import TitleSection from "./section/TitleSection";

export default function ServerPage() {
  return (
    <>
      <TitleSection />
      <ServerSection />
      <RivToast />
    </>
  );
}
