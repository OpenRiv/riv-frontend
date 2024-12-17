import { FolderSimplePlus } from "@phosphor-icons/react";
import List from "../../../component/button/List";
import ServerProfile from "../../../component/card/ServerProfile";
import { useRecoilState, useSetRecoilState } from "recoil";
import { sectionState } from "../state/state";

export default function SideSection({ guildId }: Props) {
  const svName: string = localStorage.getItem("svName") || "Empty";
  const svIcon: string =
    localStorage.getItem("svIcon") || "assets/riv/riv_face.webp";

  const [isMinuteSection] = useRecoilState(sectionState);
  const setSectionState = useSetRecoilState(sectionState);

  const handleSavedMinutesClick = () => {
    setSectionState(true);
  };

  const handleManualClick = () => {
    setSectionState(false);
  };

  return (
    <section className="max-sm:hidden min-w-[20rem] min-h-screen max-h-full bg-gray-03 flex flex-col items-center">
      <ServerProfile
        className="my-[2rem]"
        guildId={guildId}
        svName={svName}
        svIcon={svIcon}
      />
      <div className="ml-[3.5rem] flex flex-col gap-[1.5rem] w-full">
        <List
          isAct={isMinuteSection}
          icon={<FolderSimplePlus size={32} weight="fill" />}
          text="저장된 회의록"
          onClick={handleSavedMinutesClick}
        />
        <List
          isAct={!isMinuteSection}
          icon={<FolderSimplePlus size={32} weight="fill" />}
          text="사용 설명서"
          onClick={handleManualClick}
        />
      </div>
    </section>
  );
}

interface Props {
  guildId: string;
}
