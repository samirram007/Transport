import { useQuery } from "@tanstack/react-query";
import { fetchUserProfileService } from "../services/apis";

export function useUserprofile() {


    return useQuery({
        queryKey: ['profile'],
        queryFn: fetchUserProfileService,
        enabled:true,
        refetchOnMount:true,
        staleTime: Infinity
        }
    )
}