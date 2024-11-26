import { useEffect } from "react";

export default function useCode() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const codeParam = params.get("code");

    if (codeParam) {
      // 부모 창으로 메시지 전달
      if (window.opener) {
        console.log("open");
        window.opener.postMessage(
          { authCode: codeParam }, // 전달 데이터
          window.location.origin // 같은 origin만 허용
        );

        // 새 창 닫기
        window.close();
      } else {
        console.error("No parent window found. Unable to send auth code.");
      }
    }
  }, []);

  return null; // UI는 필요 없음
}
