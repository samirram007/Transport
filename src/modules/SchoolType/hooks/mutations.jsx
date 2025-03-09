import { useMutation, useQueryClient } from "@tanstack/react-query";


 
import { deleteSchoolTypeService, storeSchoolTypeService, updateSchoolTypeService } from "../services/apis";

import { queryClient } from "@/lib/queryClient";
const moduleQueryKey='schoolTypes'
export function useStoreSchoolTypeMutation() {
 
  return useMutation({
    mutationFn: storeSchoolTypeService,
    onSuccess: ({data}) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })
     
   
    },
    onError: (error) => {
      console.log("I am   useStoreSchoolTypeMutation Error")
     // toast.error(error.response.data.message)
    }
  })
}
export function useUpdateSchoolTypeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSchoolTypeService, // This should call your API to update the school
    onSuccess: ({ data: updatedSchoolType }) => {
      // Update the specific school in the cache
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })
     

      console.log('SchoolType updated in cache');
    },
    onError: (error) => {
      console.error('Error updating school:', error);
    },
  });
}
export function useDeleteSchoolTypeMutation() {
 
  return useMutation({
    mutationFn: deleteSchoolTypeService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })
     
    },
    onError: (error) => {
      console.log("I am   useDeleteSchoolTypeMutation Error")
    }
  })
}
