import { useMutation, useQueryClient } from "@tanstack/react-query";


 
import { deleteCampuseservice, storeCampuseservice, updateCampuseservice } from "../services/apis";

import { queryClient } from "@/lib/queryClient";

const moduleQueryKey='campuses'
export function useStoreCampusMutation() {
 
  return useMutation({
    mutationFn: storeCampuseservice,
    onSuccess: ({data}) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })
      // queryClient.invalidateQueries({ queryKey: ['campuses',{id:data?.id} ] })
      // console.log("I am   useStoreCampusMutation Success",data.id)
   
    },
    onError: (error) => {
      console.log("I am   useStoreCampusMutation Error")
     // toast.error(error.response.data.message)
    }
  })
}
export function useUpdateCampusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCampuseservice, // This should call your API to update the campus
    onSuccess: ({ data: updatedCampus }) => {
      // Update the specific campus in the cache
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })
     

      console.log('Campus updated in cache');
    },
    onError: (error) => {
      console.error('Error updating campus:', error);
    },
  });
}
export function useDeleteCampusMutation() {
 
  return useMutation({
    mutationFn: deleteCampuseservice,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })
     
    },
    onError: (error) => {
      console.log("I am   useDeleteCampusMutation Error")
    }
  })
}
