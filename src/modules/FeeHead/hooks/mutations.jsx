import { useMutation, useQueryClient } from "@tanstack/react-query";



import { deleteFeeHeadService, storeFeeHeadService, updateFeeHeadService } from "../services/apis";

import { queryClient } from "@/lib/queryClient";
const moduleQueryKey = 'feeHeads'
export function useStoreFeeHeadMutation() {

  return useMutation({
    mutationFn: storeFeeHeadService,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })


    },
    onError: (error) => {
      console.log("I am   useStoreFeeHeadMutation Error")
      // toast.error(error.response.data.message)
    }
  })
}
export function useUpdateFeeHeadMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFeeHeadService, // This should call your API to update the school
    onSuccess: ({ data: updatedFeeHead }) => {
      // Update the specific school in the cache
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })


      console.log('FeeHead updated in cache');
    },
    onError: (error) => {
      console.error('Error updating school:', error);
    },
  });
}
export function useDeleteFeeHeadMutation() {

  return useMutation({
    mutationFn: deleteFeeHeadService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })

    },
    onError: (error) => {
      console.log("I am   useDeleteFeeHeadMutation Error")
    }
  })
}
