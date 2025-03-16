import { useQuery } from "@tanstack/react-query"
import { fetchExpenseService, fetchExpensesService, fetchSearchRiderForExpensesService } from "../services/apis"


export function useExpenses(payload) {

  return useQuery({
    queryKey: ['expenses', 'filter', payload],
    queryFn: () => fetchExpensesService(payload),
    staleTime: 1000 * 60,
    enabled: !!payload
  })
}
export function useExpense(id) {
  return useQuery({
    queryKey: ['expenses', id],
    queryFn: () => fetchExpenseService(id),
  })
}
export function useSearchRiderForExpenses(payload) {
  return useQuery({
    queryKey: ['searchRiderForExpenses', payload],
    queryFn: () => fetchSearchRiderForExpensesService(payload),
    enabled: !!payload?.text?.length
  })
}


