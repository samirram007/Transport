import { useMutation, useQueryClient } from "@tanstack/react-query";



import { deleteOrganizationService, storeOrganizationService, updateOrganizationService } from "../services/apis";

import { queryClient } from "@/lib/queryClient";

const moduleQueryKey = 'organizations'
export function useStoreOrganizationMutation() {

  return useMutation({
    mutationFn: storeOrganizationService,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })
      // queryClient.invalidateQueries({ queryKey: ['organizations',{id:data?.id} ] })
      // console.log("I am   useStoreOrganizationMutation Success",data.id)

    },
    onError: (error) => {
      console.log("I am   useStoreOrganizationMutation Error")
      // toast.error(error.response.data.message)
    }
  })
}
export function useUpdateOrganizationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOrganizationService, // This should call your API to update the organization
    onSuccess: ({ data: updatedOrganization }) => {
      // Update the specific organization in the cache
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })


      console.log('Organization updated in cache');
    },
    onError: (error) => {
      console.error('Error updating organization:', error);
    },
  });
}
export function useDeleteOrganizationMutation() {

  return useMutation({
    mutationFn: deleteOrganizationService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })

    },
    onError: (error) => {
      console.log("I am   useDeleteOrganizationMutation Error")
    }
  })
}
