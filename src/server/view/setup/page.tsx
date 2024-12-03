import MinuteSection from "./section/minute_section";
import SideSection from "./section/side_section";

export default function SetupPage() {
  return (
    <div className="flex flex-row h-full bg-gray-04">
      <SideSection />
      <MinuteSection />
    </div>
  );
}
