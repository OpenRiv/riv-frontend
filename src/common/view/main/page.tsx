import ServiceButton from "../../../onboarding/component/service_button";
import Riv from "../../component/riv/riv";
import { handleOnboarding } from "./utils/handle_onboarding";
import { useCodeListener } from "./hook/useCodeListener";

export default function MainPage() {
  useCodeListener();

  return (
    <section className="w-screen h-screen flex flex-row items-center justify-center bg-[#EEF9FC] max-md:flex-col">
      {/* 리브 이미지*/}
      <Riv className="w-[20rem] mr-[4rem] max-md:mr-0 max-md:w-[16rem] max-md:mb-[2rem]" />
      <div className="flex flex-col gap-[1.75rem]">
        {/* 소개문구 섹션*/}
        <IntroSection />
        {/* 버튼 섹션*/}
        <ButtonSection />
      </div>
    </section>
  );
}

function IntroSection() {
  const pTextStyle: string =
    "text-[1rem] text-gray-06 leading-[1.25rem] max-md:hidden";
  return (
    <div className="flex flex-col max-md:items-center">
      <h1 className="text-[2.5rem] leading-[2rem] font-semibold">
        생각은 회의에,
      </h1>
      <h1 className="mb-[0.75rem] text-[2.5rem] font-bold bg-gradient-to-r from-text-left to-text-right bg-clip-text text-transparent">
        기록은 RIV에 맡기세요!
      </h1>
      <p className={pTextStyle}>
        Riv는 AI 기술을 통해 어렵고, 복잡하고, 귀찮았던 우리의 회의를
      </p>
      <p className={pTextStyle}>
        쉽고, 간편하고, 즐거운 회의로 바꿔줍니다. Riv와 함께 우리의 세상을
        바꿔나가고 싶지 않나요?
      </p>
      <p className={pTextStyle}>
        Riv는 오픈소스 프로젝트입니다. 우리 함께 열려있는 협업 세상을
        만들어봐요!
      </p>
    </div>
  );
}

function ButtonSection() {
  // 디스코드 온보딩 URL
  const onboardUrl = `${
    import.meta.env.VITE_API_URL
  }oauth2/authorization/discord`;
  return (
    <div className="flex flex-row items-start gap-[1rem] max-sm:flex-col max-sm:items-center">
      <ServiceButton
        text="Add to Discord"
        icon="/assets/icon/discord.svg"
        className="bg-gradient-to-br from-discord-left to-discord-right px-[1.4rem]"
        iconSize="0.8rem"
        onClick={() => handleOnboarding({ url: onboardUrl })}
      />
      <ServiceButton
        text="View on Github"
        icon="/assets/icon/github.svg"
        className="bg-gradient-to-br from-github-left via-github-center to-github-right"
        iconSize="1.2rem"
        onClick={() => window.open("https://github.com/OpenRiv", "_blank")}
      />
    </div>
  );
}
