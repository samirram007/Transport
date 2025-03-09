import { useMutation, useQueryClient } from "@tanstack/react-query";


 
import { deleteDesignationService, storeDesignationService, updateDesignationService } from "../services/apis";

import { queryClient } from "@/lib/queryClient";

const moduleQueryKey='designations'
export function useStoreDesignationMutation() {
 
  return useMutation({
    mutationFn: storeDesignationService,
    onSuccess: ({data}) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })
      // queryClient.invalidateQueries({ queryKey: ['designations',{id:data?.id} ] })
      // console.log("I am   useStoreDesignationMutation Success",data.id)
   
    },
    onError: (error) => {
      console.log("I am   useStoreDesignationMutation Error")
     // toast.error(error.response.data.message)
    }
  })
}
export function useUpdateDesignationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDesignationService, // This should call your API to update the designation
    onSuccess: ({ data: updatedDesignation }) => {
      // Update the specific designation in the cache
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })
     

      console.log('Designation updated in cache');
    },
    onError: (error) => {
      console.error('Error updating designation:', error);
    },
  });
}
export function useDeleteDesignationMutation() {
 
  return useMutation({
    mutationFn: deleteDesignationService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })
     
    },
    onError: (error) => {
      console.log("I am   useDeleteDesignationMutation Error")
    }
  })
}
