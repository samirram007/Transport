import { useQuery } from "@tanstack/react-query";
import { fetchCampusByIdService, fetchCampusesService } from "../services/apis";
const moduleQueryKey = 'campuses'
export function useCampuses() {
  const queryData = useQuery({
    queryKey: [moduleQueryKey],
    queryFn: fetchCampusesService,
    refetchOnMount: true,
    enabled: true,
    staleTime: Infinity // keep data fresh for this period (1 min.)
  })

  return queryData;
}
export function useCampus(id) {
  return useQuery({
    queryKey: [moduleQueryKey, { id }],
    queryFn: () => fetchCampusByIdService(id),
    enabled: !!id,
    staleTime: Infinity
  })
}
