import { useMutation, useQueryClient } from "@tanstack/react-query";


 
import { deleteDepartmentService, storeDepartmentService, updateDepartmentService } from "../services/apis";

import { queryClient } from "@/lib/queryClient";

const moduleQueryKey='departments'
export function useStoreDepartmentMutation() {
 
  return useMutation({
    mutationFn: storeDepartmentService,
    onSuccess: ({data}) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })
      // queryClient.invalidateQueries({ queryKey: ['departments',{id:data?.id} ] })
      // console.log("I am   useStoreDepartmentMutation Success",data.id)
   
    },
    onError: (error) => {
      console.log("I am   useStoreDepartmentMutation Error")
     // toast.error(error.response.data.message)
    }
  })
}
export function useUpdateDepartmentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDepartmentService, // This should call your API to update the department
    onSuccess: ({ data: updatedDepartment }) => {
      // Update the specific department in the cache
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })
     

      console.log('Department updated in cache');
    },
    onError: (error) => {
      console.error('Error updating department:', error);
    },
  });
}
export function useDeleteDepartmentMutation() {
 
  return useMutation({
    mutationFn: deleteDepartmentService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })
     
    },
    onError: (error) => {
      console.log("I am   useDeleteDepartmentMutation Error")
    }
  })
}
