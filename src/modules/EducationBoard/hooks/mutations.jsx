import { useMutation, useQueryClient } from "@tanstack/react-query";



import { deleteEducationBoardService, storeEducationBoardService, updateEducationBoardService } from "../services/apis";

import { queryClient } from "@/lib/queryClient";
const moduleQueryKey = 'educationBoards'
export function useStoreEducationBoardMutation() {
  return useMutation({
    mutationFn: storeEducationBoardService,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })
    },
    onError: (error) => {
      console.log("I am   useStoreEducationBoardMutation Error")
      // toast.error(error.response.data.message)
    }
  })
}
export function useUpdateEducationBoardMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEducationBoardService, // This should call your API to update the school
    onSuccess: ({ data: updatedEducationBoard }) => {
      // Update the specific school in the cache
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })


      console.log('EducationBoard updated in cache');
    },
    onError: (error) => {
      console.error('Error updating school:', error);
    },
  });
}
export function useDeleteEducationBoardMutation() {

  return useMutation({
    mutationFn: deleteEducationBoardService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })

    },
    onError: (error) => {
      console.log("I am   useDeleteEducationBoardMutation Error")
    }
  })
}
