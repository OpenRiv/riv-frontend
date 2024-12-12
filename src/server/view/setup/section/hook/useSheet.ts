import { useState } from "react";

export default function useSheet() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const toggleSheet = () => {
    setIsSheetOpen((prev) => !prev);
  };

  return {
    isSheetOpen,
    toggleSheet,
  };
}
