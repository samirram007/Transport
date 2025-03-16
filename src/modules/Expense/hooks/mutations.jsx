import { useMutation } from "@tanstack/react-query";




import { deleteExpenseService, storeExpenseService, updateExpenseService } from "../services/apis";


import { queryClient } from "@/lib/queryClient";
const moduleQueryKey = 'expenses'
export function useStoreExpenseMutation() {

  return useMutation({
    mutationFn: storeExpenseService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })


    },
    onError: (error) => {

    }
  })
} 

export function useUpdateExpenseMutation() {

  return useMutation({
    mutationFn: updateExpenseService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })

    },
    onError: (error) => {

    }
  })
}
export function useDeleteExpenseMutation() {

  return useMutation({
    mutationFn: deleteExpenseService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })

    },
    onError: (error) => {

    }
  })
}