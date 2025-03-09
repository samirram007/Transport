import { useQuery } from "@tanstack/react-query";
import { fetchRiderById, fetchRiders } from "../services/apis";


export function useRiders(payload) {


  return useQuery({
    queryKey: ['riders'],
    queryFn: () => fetchRiders(payload),
    enabled: !!payload,
    refetchOnMount: true,
    staleTime: Infinity,

  })
}
export function useRider(id) {

  return useQuery({
    queryKey: ['riders', { id }],
    queryFn: () => fetchRiderById(id),
    staleTime: Infinity
  })
}

