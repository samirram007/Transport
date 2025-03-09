import { useMutation, useQueryClient } from "@tanstack/react-query";


 
import { deleteExpenseGroupService, storeExpenseGroupService, updateExpenseGroupService } from "../services/apis";

import { queryClient } from "@/lib/queryClient";
const moduleQueryKey='expenseGroups'
export function useStoreExpenseGroupMutation() {
 
  return useMutation({
    mutationFn: storeExpenseGroupService,
    onSuccess: ({data}) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })
     
   
    },
    onError: (error) => {
      console.log("I am   useStoreExpenseGroupMutation Error")
     // toast.error(error.response.data.message)
    }
  })
}
export function useUpdateExpenseGroupMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateExpenseGroupService, // This should call your API to update the school
    onSuccess: ({ data: updatedExpenseGroup }) => {
      // Update the specific school in the cache
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })
     

      console.log('ExpenseGroup updated in cache');
    },
    onError: (error) => {
      console.error('Error updating school:', error);
    },
  });
}
export function useDeleteExpenseGroupMutation() {
 
  return useMutation({
    mutationFn: deleteExpenseGroupService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })
     
    },
    onError: (error) => {
      console.log("I am   useDeleteExpenseGroupMutation Error")
    }
  })
}
