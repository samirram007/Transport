import { useQuery } from "@tanstack/react-query";
import { fetchExpenseHeadByIdService, fetchExpenseHeadsService } from "../services/apis";
const moduleQueryKey = 'expenseHeads'

export function useExpenseHeads() {
  const queryData = useQuery({
    queryKey: [moduleQueryKey],
    queryFn: fetchExpenseHeadsService,
    refetchOnMount: true,
    enabled: true,
    staleTime: Infinity // keep data fresh for this period (1 min.)
  })

  return queryData;
}


export function useExpenseHead(id) {
  return useQuery({
    queryKey: [moduleQueryKey, { id }],
    queryFn: () => fetchExpenseHeadByIdService(id),
    enabled: !!id,
    staleTime: Infinity
  })
}
