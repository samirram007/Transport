import { useMutation } from "@tanstack/react-query";


 
 
import {   deleteFeeService, storeFeeService, updateFeeService } from "../services/apis";

 
import { useFormModal } from "../../../contexts/FormModalProvider";
import { queryClient } from "@/lib/queryClient";
const moduleQueryKey='fees'
export function useStoreFeeMutation() {
  
  return useMutation({
    mutationFn: storeFeeService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })
     
      
    },
    onError: (error) => {
    
    }
  })
} 

export function useUpdateFeeMutation() {
 
  return useMutation({
    mutationFn: updateFeeService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })
       
    },
    onError: (error) => {
     
    }
  })
}
export function useDeleteFeeMutation() {
 
  return useMutation({
    mutationFn: deleteFeeService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })
       
    },
    onError: (error) => {
     
    }
  })
}