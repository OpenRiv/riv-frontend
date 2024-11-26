import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function useCode() {
  const [searchParams] = useSearchParams();
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // URL에서 "code" 파라미터 값을 읽기
    const codeParam = searchParams.get("code");
    if (codeParam) {
      setCode(codeParam);

      // 로컬 스토리지에 저장
      localStorage.setItem("authCode", codeParam);

      // 메인 페이지로 리다이렉트
      navigate("/", { replace: true });
    }
  }, [searchParams, navigate]);

  return {
    code,
  };
}
