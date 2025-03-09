import { useQuery } from "@tanstack/react-query"
import { fetchFeeService, fetchFeesService, fetchSearchRiderForFeesService } from "../services/apis"


export function useFees(payload) {

  return useQuery({
    queryKey: ['fees', 'filter', payload],
    queryFn: () => fetchFeesService(payload),
    staleTime: 1000 * 60,
    enabled: !!payload
  })
}
export function useFee(id) {
  return useQuery({
    queryKey: ['fees', id],
    queryFn: () => fetchFeeService(id),
  })
}
export function useSearchRiderForFees(payload) {
  return useQuery({
    queryKey: ['searchRiderForFees', payload],
    queryFn: () => fetchSearchRiderForFeesService(payload),
    enabled: !!payload?.text?.length
  })
}


