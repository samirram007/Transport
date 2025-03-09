import { useQuery } from "@tanstack/react-query";
import { fetchDesignationByIdService, fetchDesignationsService } from "../services/apis";
const moduleQueryKey = 'designations'
export function useDesignations() {
  const queryData = useQuery({
    queryKey: [moduleQueryKey],
    queryFn: fetchDesignationsService,
    refetchOnMount: true,
    enabled: true,
    staleTime: Infinity // keep data fresh for this period (1 min.)
  })

  return queryData;
}
export function useDesignation(id) {
  return useQuery({
    queryKey: [moduleQueryKey, { id }],
    queryFn: () => fetchDesignationByIdService(id),
    enabled: !!id,
    staleTime: Infinity
  })
}
