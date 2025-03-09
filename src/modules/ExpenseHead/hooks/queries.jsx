import { useQuery } from "@tanstack/react-query"
import { useCallback } from "react"
import { fetchExpenseHeadById, fetchExpenseHeads } from "../services/apis"

 export function useExpenseHead(id) {
    return useQuery({
      queryKey: ['expense_heads',{id}],
      queryFn: ()=>fetchExpenseHeadById(id),
      staleTime:Infinity
    })
  }
export function useExpenseHeads(payload) {
  const filterCallbackFn = useCallback((data) => {

    if (!payload.expense_group_ids || payload.expense_group_ids.length === 0) {
      return { data: data.data }
    }
    return { data: data.data.filter(x => payload.expense_group_ids.includes(x.expense_group_id)) }


  }, [payload.isCurrent])

  return useQuery({
    queryKey: ['expense_heads'],
    queryFn: fetchExpenseHeads,
    staleTime: Infinity,
    enabled: !!payload,
    select: filterCallbackFn
  })
  }
