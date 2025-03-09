import { useMutation, useQueryClient } from "@tanstack/react-query";


 
import { deleteSchoolService, storeSchoolService, updateSchoolService } from "../services/apis";

import { queryClient } from "@/lib/queryClient";

const moduleQueryKey='schools'
export function useStoreSchoolMutation() {
 
  return useMutation({
    mutationFn: storeSchoolService,
    onSuccess: ({data}) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })
      // queryClient.invalidateQueries({ queryKey: ['schools',{id:data?.id} ] })
      // console.log("I am   useStoreSchoolMutation Success",data.id)
   
    },
    onError: (error) => {
      console.log("I am   useStoreSchoolMutation Error")
     // toast.error(error.response.data.message)
    }
  })
}
export function useUpdateSchoolMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSchoolService, // This should call your API to update the school
    onSuccess: ({ data: updatedSchool }) => {
      // Update the specific school in the cache
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })
     

      console.log('School updated in cache');
    },
    onError: (error) => {
      console.error('Error updating school:', error);
    },
  });
}
export function useDeleteSchoolMutation() {
 
  return useMutation({
    mutationFn: deleteSchoolService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })
     
    },
    onError: (error) => {
      console.log("I am   useDeleteSchoolMutation Error")
    }
  })
}
