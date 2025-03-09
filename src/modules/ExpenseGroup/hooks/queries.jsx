import { useQuery } from "@tanstack/react-query";
import { fetchExpenseGroupByIdService, fetchExpenseGroupsService } from "../services/apis";
const moduleQueryKey='expenseGroups'

export function useExpenseGroups() {
  const queryData= useQuery({
    queryKey: [moduleQueryKey],
    queryFn: fetchExpenseGroupsService,
    refetchOnMount: true,
    enabled: true,
    staleTime: Infinity // keep data fresh for this period (1 min.)
  })
 
  return queryData;
}


 export function useExpenseGroup(id) {
    return useQuery({
      queryKey: [moduleQueryKey,{id}],
      queryFn: ()=>fetchExpenseGroupByIdService(id),
      enabled: !!id,
      staleTime:Infinity
    })
  }
