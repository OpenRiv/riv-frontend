import { useParams } from "react-router-dom";

export function useId() {
  const { id } = useParams<{ id: string }>();

  return { id };
}
