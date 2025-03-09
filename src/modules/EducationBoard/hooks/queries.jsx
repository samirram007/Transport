import { useQuery } from "@tanstack/react-query";
import { fetchEducationBoardByIdService, fetchEducationBoardsService } from "../services/apis";
const moduleQueryKey='educationBoards'

export function useEducationBoards() {
  const queryData= useQuery({
    queryKey: [moduleQueryKey],
    queryFn: fetchEducationBoardsService,
    refetchOnMount: true,
    enabled: true,
    staleTime: Infinity // keep data fresh for this period (1 min.)
  })
 
  return queryData;
}


 export function useEducationBoard(id) {
    return useQuery({
      queryKey: [moduleQueryKey,{id}],
      queryFn: ()=>fetchEducationBoardByIdService(id),
      enabled: !!id,
      staleTime:Infinity
    })
  }
