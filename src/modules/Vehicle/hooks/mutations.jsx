import { useMutation, useQueryClient } from "@tanstack/react-query";



import { deleteVehicleService, storeVehicleService, updateVehicleService } from "../services/apis";

import { queryClient } from "@/lib/queryClient";

const moduleQueryKey = 'vehicles'
export function useStoreVehicleMutation() {

  return useMutation({
    mutationFn: storeVehicleService,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })
      // queryClient.invalidateQueries({ queryKey: ['vehicles',{id:data?.id} ] })
      // console.log("I am   useStoreVehicleMutation Success",data.id)

    },
    onError: (error) => {
      console.log("I am   useStoreVehicleMutation Error")
      // toast.error(error.response.data.message)
    }
  })
}
export function useUpdateVehicleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateVehicleService, // This should call your API to update the vehicle
    onSuccess: ({ data: updatedVehicle }) => {
      // Update the specific vehicle in the cache
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })


      console.log('Vehicle updated in cache');
    },
    onError: (error) => {
      console.error('Error updating vehicle:', error);
    },
  });
}
export function useDeleteVehicleMutation() {

  return useMutation({
    mutationFn: deleteVehicleService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })

    },
    onError: (error) => {
      console.log("I am   useDeleteVehicleMutation Error")
    }
  })
}
