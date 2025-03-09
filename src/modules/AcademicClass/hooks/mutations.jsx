import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/lib/queryClient";
import { deleteAcademicClassService, storeAcademicClassService, updateAcademicClassService } from "../services/apis";

const moduleQueryKey = 'academicClasses'
export function useStoreAcademicClassMutation() {

  return useMutation({
    mutationFn: storeAcademicClassService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })
    },
    onError: (error) => {



    }
  })
}
export function useUpdateAcademicClassMutation() {

  return useMutation({
    mutationFn: updateAcademicClassService,
    onSuccess: (data) => {

      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })

    },
    onError: (error) => {



    }
  })
}
export function useDeleteAcademicClassMutation() {

  return useMutation({
    mutationFn: deleteAcademicClassService,
    onSuccess: (data) => {

      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })

    },
    onError: (error) => {

      // navigate("/academic_classes/create", { replace: true })


    }
  })
}