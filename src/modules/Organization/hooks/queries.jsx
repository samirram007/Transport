import { useQuery } from "@tanstack/react-query";
import { fetchOrganizationByIdService, fetchOrganizationsService } from "../services/apis";
const moduleQueryKey = 'organizations'
export function useOrganizations() {
  const queryData = useQuery({
    queryKey: [moduleQueryKey],
    queryFn: fetchOrganizationsService,
    refetchOnMount: true,
    enabled: true,
    staleTime: Infinity // keep data fresh for this period (1 min.)
  })

  return queryData;
}
export function useOrganization(id) {
  return useQuery({
    queryKey: [moduleQueryKey, { id }],
    queryFn: () => fetchOrganizationByIdService(id),
    enabled: !!id,
    staleTime: Infinity
  })
}
