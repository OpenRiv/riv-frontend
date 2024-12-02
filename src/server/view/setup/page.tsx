// import { useId } from "../../../common/hook/route/useId";
import MinuteSection from "./section/minute_section";
import SideSection from "./section/side_section";

export default function SetupPage() {
  // const id = useId();
  return (
    <div className="flex flex-row h-full bg-gray-04">
      <SideSection />
      <MinuteSection />
    </div>
  );
}
