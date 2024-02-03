import { getTags } from "@/actions/wallpaper";
import { useQuery } from "@tanstack/react-query";

export const useTagsQuery = () => {
  return useQuery({
    queryKey: ["getTags"],
    queryFn: async () => getTags(),
  });
};
