import { useQuery } from "@tanstack/react-query";
import { fetchVehicleTypeByIdService, fetchVehicleTypesService } from "../services/apis";
const moduleQueryKey = 'vehicleTypes'

export function useVehicleTypes() {
  const queryData = useQuery({
    queryKey: [moduleQueryKey],
    queryFn: fetchVehicleTypesService,
    refetchOnMount: true,
    enabled: true,
    staleTime: Infinity // keep data fresh for this period (1 min.)
  })

  return queryData;
}


export function useVehicleType(id) {
  return useQuery({
    queryKey: [moduleQueryKey, { id }],
    queryFn: () => fetchVehicleTypeByIdService(id),
    enabled: !!id,
    staleTime: Infinity
  })
}
