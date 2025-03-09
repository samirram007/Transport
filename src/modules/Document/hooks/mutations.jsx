import { useMutation } from "@tanstack/react-query";



 

import { queryClient } from "@/lib/queryClient";
import { toast } from "sonner";
import { deleteDocument, storeDocuments, updateDocument } from "../services/apis";
export function useStoreDocumentMutation() {

  return useMutation({
    mutationFn: storeDocuments,
    onSuccess: (data) => {

      queryClient.invalidateQueries({ queryKey: ['documents'] })
  

    },
    onError: (error) => {
 



    }
  })
}
export function useUpdateDocumentMutation() {

  return useMutation({
    mutationFn: updateDocument,
    onSuccess: (data) => {

      queryClient.invalidateQueries({ queryKey: ['documents'] })
      toast.success(data.message);
      //navigate("/documents", { replace: true })
    },
    onError: (error) => {
      toast.error(error.response.data.message)
      // navigate("/academic_sessions", { replace: true })


    }
  })
}

export function useDocumentDeleteMutation() {
  return useMutation({
    mutationFn: deleteDocument,
    onSuccess: (data) => {

      // toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['documents'] })
      toast("File deleted successfully", { transition: Flip });
      handleFilter(localStorage.imageFilter)

    },
    onError: (error) => {
      toast.error(error.response.data.message)
    }
  })
}

