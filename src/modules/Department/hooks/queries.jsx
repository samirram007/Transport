import { useQuery } from "@tanstack/react-query";
import { fetchDepartmentByIdService, fetchDepartmentsService } from "../services/apis";
const moduleQueryKey = 'departments'
export function useDepartments() {
  const queryData = useQuery({
    queryKey: [moduleQueryKey],
    queryFn: fetchDepartmentsService,
    refetchOnMount: true,
    enabled: true,
    staleTime: Infinity // keep data fresh for this period (1 min.)
  })

  return queryData;
}
export function useDepartment(id) {
  return useQuery({
    queryKey: [moduleQueryKey, { id }],
    queryFn: () => fetchDepartmentByIdService(id),
    enabled: !!id,
    staleTime: Infinity
  })
}
