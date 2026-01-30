import { useQuery } from "@tanstack/react-query"
import { fetchFeeService, fetchFeesService, fetchSearchRiderForFeesService } from "../services/apis"


export function useFees(payload) {
  const { fiscalYearId, from, to } = payload
  return useQuery({
    queryKey: ['fees', { fiscalYearId }],
    queryFn: () => fetchFeesService({ fiscalYearId }),
    staleTime: 1000,
    enabled: !!payload,
    select: (data) => {
      const mData = data?.data ?? []
      const filteredData = mData.filter((item) => {
        const feeDate = new Date(item.feeDate)
        const fromDate = new Date(from)
        const toDate = new Date(to)
        return feeDate >= fromDate && feeDate <= toDate
      })
      return {
        ...data,
        data: filteredData,
      }
    }
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


