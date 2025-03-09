import { useMutation, useQueryClient } from "@tanstack/react-query";



import { deleteVehicleTypeService, storeVehicleTypeService, updateVehicleTypeService } from "../services/apis";

import { queryClient } from "@/lib/queryClient";
const moduleQueryKey = 'vehicleTypes'
export function useStoreVehicleTypeMutation() {

  return useMutation({
    mutationFn: storeVehicleTypeService,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })


    },
    onError: (error) => {
      console.log("I am   useStoreVehicleTypeMutation Error")
      // toast.error(error.response.data.message)
    }
  })
}
export function useUpdateVehicleTypeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateVehicleTypeService, // This should call your API to update the school
    onSuccess: ({ data: updatedVehicleType }) => {
      // Update the specific school in the cache
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })


      console.log('VehicleType updated in cache');
    },
    onError: (error) => {
      console.error('Error updating school:', error);
    },
  });
}
export function useDeleteVehicleTypeMutation() {

  return useMutation({
    mutationFn: deleteVehicleTypeService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })

    },
    onError: (error) => {
      console.log("I am   useDeleteVehicleTypeMutation Error")
    }
  })
}
