import { FolderSimplePlus } from "@phosphor-icons/react";
import List from "../../../component/button/list";
import ServerProfile from "../../../component/card/server_profile";

export default function SideSection() {
  return (
    <section className="min-w-[20rem] min-h-screen max-h-full bg-gray-03 flex flex-col items-center">
      <ServerProfile
        className="my-[2rem]"
        svName="INFOSSU"
        svIcon="/assets/mock_image/react.png"
      />
      <div className="ml-[3.5rem] flex flex-col gap-[1.5rem] w-full">
        <List
          isAct={true}
          icon={<FolderSimplePlus size={32} weight="fill" />}
          text="저장된 회의록"
        />
        <List
          isAct={false}
          icon={<FolderSimplePlus size={32} weight="fill" />}
          text="사용 설명서"
        />
      </div>
    </section>
  );
}
