import { useState, useEffect } from "react";

interface WindowSize {
  width: number;
}

export const useHeight = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};
