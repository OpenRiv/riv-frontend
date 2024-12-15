import { useCodeListener } from "../../../common/view/main/hook/useCodeListener";
import ServerSection from "./section/server_section";
import TitleSection from "./section/title_section";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ServerPage() {
  useCodeListener();

  return (
    <>
      <TitleSection />
      <ServerSection />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
