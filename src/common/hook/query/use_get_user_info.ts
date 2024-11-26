import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../../api/discord/get/get_user_info";

export const useUserInfo = () => {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
  });
};
