import { useQuery } from "@tanstack/react-query";
import { fetchFiscalYearByIdService, fetchFiscalYearsService } from "../services/apis";
const moduleQueryKey = 'fiscalYears'
export function useFiscalYears() {
  const queryData = useQuery({
    queryKey: [moduleQueryKey],
    queryFn: fetchFiscalYearsService,
    refetchOnMount: true,
    enabled: true,
    staleTime: Infinity // keep data fresh for this period (1 min.)
  })

  return queryData;
}
export function useFiscalYear(id) {
  return useQuery({
    queryKey: [moduleQueryKey, { id }],
    queryFn: () => fetchFiscalYearByIdService(id),
    enabled: !!id,
    staleTime: Infinity
  })
}
