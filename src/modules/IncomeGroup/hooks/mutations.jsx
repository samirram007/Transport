import { useMutation, useQueryClient } from "@tanstack/react-query";


 
import { deleteIncomeGroupService, storeIncomeGroupService, updateIncomeGroupService } from "../services/apis";

import { queryClient } from "@/lib/queryClient";
const moduleQueryKey='incomeGroups'
export function useStoreIncomeGroupMutation() {
 
  return useMutation({
    mutationFn: storeIncomeGroupService,
    onSuccess: ({data}) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })
     
   
    },
    onError: (error) => {
      console.log("I am   useStoreIncomeGroupMutation Error")
     // toast.error(error.response.data.message)
    }
  })
}
export function useUpdateIncomeGroupMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateIncomeGroupService, // This should call your API to update the school
    onSuccess: ({ data: updatedIncomeGroup }) => {
      // Update the specific school in the cache
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })
     

      console.log('IncomeGroup updated in cache');
    },
    onError: (error) => {
      console.error('Error updating school:', error);
    },
  });
}
export function useDeleteIncomeGroupMutation() {
 
  return useMutation({
    mutationFn: deleteIncomeGroupService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })
     
    },
    onError: (error) => {
      console.log("I am   useDeleteIncomeGroupMutation Error")
    }
  })
}
