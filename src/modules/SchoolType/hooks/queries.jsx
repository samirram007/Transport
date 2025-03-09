import { useQuery } from "@tanstack/react-query";
import { fetchSchoolTypeByIdService, fetchSchoolTypesService } from "../services/apis";
const moduleQueryKey='schoolTypes'

export function useSchoolTypes() {
  const queryData= useQuery({
    queryKey: [moduleQueryKey],
    queryFn: fetchSchoolTypesService,
    refetchOnMount: true,
    enabled: true,
    staleTime: Infinity // keep data fresh for this period (1 min.)
  })
 
  return queryData;
}


 export function useSchoolType(id) {
    return useQuery({
      queryKey: [moduleQueryKey,{id}],
      queryFn: ()=>fetchSchoolTypeByIdService(id),
      enabled: !!id,
      staleTime:Infinity
    })
  }
