import { useQuery } from "@tanstack/react-query";
import { fetchFeeHeadByIdService, fetchFeeHeadsService } from "../services/apis";
const moduleQueryKey = 'feeHeads'

export function useFeeHeads() {
  const queryData = useQuery({
    queryKey: [moduleQueryKey],
    queryFn: fetchFeeHeadsService,
    refetchOnMount: true,
    enabled: true,
    staleTime: Infinity // keep data fresh for this period (1 min.)
  })

  return queryData;
}


export function useFeeHead(id) {
  return useQuery({
    queryKey: [moduleQueryKey, { id }],
    queryFn: () => fetchFeeHeadByIdService(id),
    enabled: !!id,
    staleTime: Infinity
  })
}
