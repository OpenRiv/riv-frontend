import { useState, useEffect } from "react";
import { useResize } from "../../common/hook/response/useResize";

export function useResServerCard() {
  const { width } = useResize();
  const [count, setCount] = useState<number>(3);

  useEffect(() => {
    if (width < 900) {
      setCount(1);
    } else if (width < 1440) {
      setCount(2);
    } else {
      setCount(3);
    }
  }, [width]);

  return { count };
}
