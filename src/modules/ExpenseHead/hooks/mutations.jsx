import { useMutation, useQueryClient } from "@tanstack/react-query";



import { deleteExpenseHeadService, storeExpenseHeadService, updateExpenseHeadService } from "../services/apis";

import { queryClient } from "@/lib/queryClient";
const moduleQueryKey = 'expenseHeads'
export function useStoreExpenseHeadMutation() {

  return useMutation({
    mutationFn: storeExpenseHeadService,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })


    },
    onError: (error) => {
      console.log("I am   useStoreExpenseHeadMutation Error")
      // toast.error(error.response.data.message)
    }
  })
}
export function useUpdateExpenseHeadMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateExpenseHeadService, // This should call your API to update the school
    onSuccess: ({ data: updatedExpenseHead }) => {
      // Update the specific school in the cache
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })


      console.log('ExpenseHead updated in cache');
    },
    onError: (error) => {
      console.error('Error updating school:', error);
    },
  });
}
export function useDeleteExpenseHeadMutation() {

  return useMutation({
    mutationFn: deleteExpenseHeadService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })

    },
    onError: (error) => {
      console.log("I am   useDeleteExpenseHeadMutation Error")
    }
  })
}
