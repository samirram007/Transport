import { useMutation, useQueryClient } from "@tanstack/react-query";



import { deleteFiscalYearService, storeFiscalYearService, updateFiscalYearService } from "../services/apis";

import { queryClient } from "@/lib/queryClient";

const moduleQueryKey = 'fiscalYears'
export function useStoreFiscalYearMutation() {

  return useMutation({
    mutationFn: storeFiscalYearService,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['userInitialValues'] })
      queryClient.invalidateQueries({ queryKey: 'students' })
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })
      // queryClient.invalidateQueries({ queryKey: ['fiscalyears',{id:data?.id} ] })
      // console.log("I am   useStoreFiscalYearMutation Success",data.id)

    },
    onError: (error) => {
      console.log("I am   useStoreFiscalYearMutation Error")
      // toast.error(error.response.data.message)
    }
  })
}
export function useUpdateFiscalYearMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFiscalYearService, // This should call your API to update the fiscalyear
    onSuccess: ({ data: updatedFiscalYear }) => {
      // Update the specific fiscalyear in the cache
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })



      console.log('FiscalYear updated in cache');
    },
    onError: (error) => {
      console.error('Error updating fiscalyear:', error);
    },
  });
}
export function useDeleteFiscalYearMutation() {

  return useMutation({
    mutationFn: deleteFiscalYearService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })

    },
    onError: (error) => {
      console.log("I am   useDeleteFiscalYearMutation Error")
    }
  })
}

export function useSwitchFiscalYearMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: switchFiscalYearService, // This should call your API to update the fiscalyear
    onSuccess: ({ data: updatedFiscalYear }) => {
      // Update the specific fiscalyear in the cache
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })


      console.log('FiscalYear updated in cache');
    },
    onError: (error) => {
      console.error('Error updating fiscalyear:', error);
    },
  });
}
