import { useQuery } from "@tanstack/react-query";
import { fetchVehicleByIdService, fetchVehiclesService } from "../services/apis";
const moduleQueryKey = 'vehicles'
export function useVehicles() {
  const queryData = useQuery({
    queryKey: [moduleQueryKey],
    queryFn: fetchVehiclesService,
    refetchOnMount: true,
    enabled: true,
    staleTime: Infinity // keep data fresh for this period (1 min.)
  })

  return queryData;
}
export function useVehicle(id) {
  return useQuery({
    queryKey: [moduleQueryKey, { id }],
    queryFn: () => fetchVehicleByIdService(id),
    enabled: !!id,
    staleTime: Infinity
  })
}
