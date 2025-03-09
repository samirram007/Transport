import { useQuery } from "@tanstack/react-query";
import { fetchIncomeGroupByIdService, fetchIncomeGroupsService } from "../services/apis";
const moduleQueryKey='incomeGroups'

export function useIncomeGroups() {
  const queryData= useQuery({
    queryKey: [moduleQueryKey],
    queryFn: fetchIncomeGroupsService,
    refetchOnMount: true,
    enabled: true,
    staleTime: Infinity // keep data fresh for this period (1 min.)
  })
 
  return queryData;
}


 export function useIncomeGroup(id) {
    return useQuery({
      queryKey: [moduleQueryKey,{id}],
      queryFn: ()=>fetchIncomeGroupByIdService(id),
      enabled: !!id,
      staleTime:Infinity
    })
  }
