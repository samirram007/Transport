import { useQuery } from "@tanstack/react-query";
import { fetchSlotByIdService, fetchSlotsService } from "../services/apis";
const moduleQueryKey = 'slots'
export function useSlots() {
  const queryData = useQuery({
    queryKey: [moduleQueryKey],
    queryFn: fetchSlotsService,
    refetchOnMount: true,
    enabled: true,
    staleTime: Infinity // keep data fresh for this period (1 min.)
  })

  return queryData;
}
export function useSlot(id) {
  return useQuery({
    queryKey: [moduleQueryKey, { id }],
    queryFn: () => fetchSlotByIdService(id),
    enabled: !!id,
    staleTime: Infinity
  })
}
