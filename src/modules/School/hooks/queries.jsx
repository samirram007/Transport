import { useQuery } from "@tanstack/react-query";
import { fetchSchoolByIdService, fetchSchoolsService } from "../services/apis";
const moduleQueryKey = 'schools'
export function useSchools() {
  const queryData = useQuery({
    queryKey: [moduleQueryKey],
    queryFn: fetchSchoolsService,
    refetchOnMount: true,
    enabled: true,
    staleTime: Infinity // keep data fresh for this period (1 min.)
  })

  return queryData;
}
export function useSchool(id) {
  return useQuery({
    queryKey: [moduleQueryKey, { id }],
    queryFn: () => fetchSchoolByIdService(id),
    enabled: !!id,
    staleTime: Infinity
  })
}
