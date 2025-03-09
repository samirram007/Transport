import { useMutation, useQueryClient } from "@tanstack/react-query";


 
import { deleteAddressService, storeAddressService, updateAddressService } from "../services/apis";

import { queryClient } from "@/lib/queryClient";
export function useStoreAddressMutation() {
 
  return useMutation({
    mutationFn: storeAddressService,
    onSuccess: ({data}) => {
      queryClient.invalidateQueries({ queryKey: ['addresses' ] })
      
   
    },
    onError: (error) => {
      console.log("I am   useStoreAddressMutation Error")
     // toast.error(error.response.data.message)
    }
  })
}
export function useUpdateAddressMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAddressService, // This should call your API to update the address
    onSuccess: ({ data: updatedAddress }) => {
      // Update the specific address in the cache
      queryClient.invalidateQueries({ queryKey: ['addresses' ] })
     

      console.log('School updated in cache');
    },
    onError: (error) => {
      console.error('Error updating school:', error);
    },
  });
}
export function useDeleteSchoolMutation() {
 
  return useMutation({
    mutationFn: deleteAddressService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] })
     
    },
    onError: (error) => {
      console.log("I am   useDeleteSchoolMutation Error")
    }
  })
}
