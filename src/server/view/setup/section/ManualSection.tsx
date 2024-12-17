import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "./css/manual-css.css";
import { Viewer } from "@toast-ui/react-editor";

export default function ManualSection() {
  const markdownContent: string = `
> **Riv**는 AI 기술을 통해 어렵고, 복잡하고, 귀찮았던 우리의 회의를  
> 쉽고, 간편하고, 즐거운 회의로 바꿔줍니다. Riv와 함께 우리의 세상을 바꿔나가고 싶지 않나요?  
> Riv는 오픈소스 프로젝트입니다. 우리 함께 열려있는 협업 세상을 만들어봐요!

## 📄 [**Riv 매뉴얼**](javascript:void(0))

### 📚 파트별 매뉴얼 세부  
- [**Riv Bot** - 디스코드 챗봇](https://github.com/OpenRiv/riv-bot)  
- [**Riv Frontend** - 관리자페이지 프론트엔드](https://github.com/OpenRiv/riv-frontend)  
- [**Riv Backend** - 관리자페이지 백엔드](https://github.com/OpenRiv/riv-backend)
  `;

  const handleManualClick = () => {
    window.open("/assets/riv/riv_manual.pdf", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="px-[2.5rem] py-[3rem]">
      <img src={`/assets/riv/riv_intro.webp`} />
      <div onClick={handleManualClick} style={{ cursor: "pointer" }}>
        <Viewer initialValue={markdownContent} />
      </div>
    </div>
  );
}
