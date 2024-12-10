import { useEffect } from "react";
import ServerSection from "./section/server_section";
import TitleSection from "./section/title_section";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ServerPage() {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { status, message } = event.data;

      if (status === "success") {
        toast.success(message);
      } else if (status === "error") {
        toast.error(message);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);
  return (
    <>
      <TitleSection />
      <ServerSection />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
