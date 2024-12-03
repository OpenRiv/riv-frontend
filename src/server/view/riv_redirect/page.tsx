import { useSearchParams } from "react-router-dom";
import { usePostServers } from "../../../common/hook/mutation/use_post_servers";
import { useEffect } from "react";

export default function RivRedirect() {
  const [searchParams] = useSearchParams(); // 쿼리 파라미터 읽기
  const id = searchParams.get("id"); // "id" 파라미터 추출
  const { mutate } = usePostServers();

  useEffect(() => {
    if (id) {
      mutate(id, {
        onSuccess: () => {
          // 부모 창으로 성공 메시지 전송
          window.opener.postMessage(
            { status: "success", message: "서버가 성공적으로 추가되었습니다!" },
            window.location.origin
          );
          window.close();
        },
        onError: () => {
          // 부모 창으로 실패 메시지 전송
          window.opener.postMessage(
            { status: "error", message: "서버 추가에 실패했습니다." },
            window.location.origin
          );
          window.close();
        },
      });
    }
  }, [id, mutate]);

  return <></>;
}
