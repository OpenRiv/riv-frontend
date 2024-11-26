import { useEffect } from "react";

export default function useCode() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const codeParam = params.get("code");

    if (codeParam) {
      // 부모 창으로 메시지 전달
      if (window.opener) {
        console.log("Sending authCode to parent window");
        window.opener.postMessage(
          { authCode: codeParam }, // 전달할 데이터
          "*" // 모든 origin 허용 (부모 창에서 검증)
        );

        // 새 창 닫기
        window.close();
      } else {
        console.error("No parent window found. Unable to send auth code.");
      }
    }
  }, []);
}
