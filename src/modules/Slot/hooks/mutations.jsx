import { useMutation, useQueryClient } from "@tanstack/react-query";


 
import { deleteSlotService, storeSlotService, updateSlotService } from "../services/apis";

import { queryClient } from "@/lib/queryClient";

const moduleQueryKey='slots'
export function useStoreSlotMutation() {
 
  return useMutation({
    mutationFn: storeSlotService,
    onSuccess: ({data}) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })
      // queryClient.invalidateQueries({ queryKey: ['slots',{id:data?.id} ] })
      // console.log("I am   useStoreSlotMutation Success",data.id)
   
    },
    onError: (error) => {
      console.log("I am   useStoreSlotMutation Error")
     // toast.error(error.response.data.message)
    }
  })
}
export function useUpdateSlotMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSlotService, // This should call your API to update the slot
    onSuccess: ({ data: updatedSlot }) => {
      // Update the specific slot in the cache
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })
     

      console.log('Slot updated in cache');
    },
    onError: (error) => {
      console.error('Error updating slot:', error);
    },
  });
}
export function useDeleteSlotMutation() {
 
  return useMutation({
    mutationFn: deleteSlotService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })
     
    },
    onError: (error) => {
      console.log("I am   useDeleteSlotMutation Error")
    }
  })
}
