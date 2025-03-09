import { useMutation } from "@tanstack/react-query";


import { useNavigate, useParams } from "react-router";
 
import { storeGuardian, storeRiderFee, storeRiderService, updateGuardian,   updateRiderFee, updateRiderService } from "../services/apis";

import { toast } from "sonner";
import { useFormModal } from "../../../contexts/FormModalProvider";
import { queryClient } from "@/lib/queryClient";
const moduleQueryKey='riders'
export function useStoreRiderMutation() {
  
  return useMutation({
    mutationFn: storeRiderService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })
     
      
    },
    onError: (error) => {
    
    }
  })
}
export function useUpdateRiderMutation() {
 
  return useMutation({
    mutationFn: updateRiderService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })
       
    },
    onError: (error) => {
     
    }
  })
}
export function useStoreRiderGuardianMutation() {
  const Rider_id = useParams('id')
  const navigate = useNavigate()
  return useMutation({
    mutationFn: storeGuardian,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey, Rider_id] }) 

    },
    onError: (error) => {
      toast.error(error.response.data.message)
    }
  })
}
export function useUpdateRiderGuardianMutation() {
  const Rider_id = useParams('id')
  const navigate = useNavigate()

  return useMutation({
    mutationFn: updateGuardian,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey, Rider_id] })
      toast.success(data.message);
      navigate(`/Riders/edit/${Rider_id.id}`, { replace: true })
    },
    onError: (error) => {
      toast.error(error.response.data.message)
    }
  })
}
export function useStoreRiderAddressMutation() {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: storeRider,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })
      toast.success(data.message);
      navigate("/Riders", { replace: true })
    },
    onError: (error) => {
      toast.error(error.response.data.message)
    }
  })
}
export function useUpdateRiderAddressMutation() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: updateRider,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [moduleQueryKey] })
      toast.success(data.message);
      navigate("/Riders", { replace: true })
    },
    onError: (error) => {
      toast.error(error.response.data.message)
    }
  })
}


export function useStoreRiderFeeMutation() {
  const { setOpen } = useFormModal()
  // console.log('aaa')
  return useMutation({
    mutationFn: storeRiderFee,
    onSuccess: (data) => {

      //queryClient.invalidateQueries()
      //  queryClient.invalidateQueries({ queryKey: ['Riders'] })
      //  queryClient.invalidateQueries({ queryKey: ['Rider_session_fees'] })
      queryClient.refetchQueries({ queryKey: [moduleQueryKey] })
      queryClient.refetchQueries({ queryKey: ['Rider_session_fees'] })
      setOpen(prev => !prev)
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response.data.message)
    }
  })
}
export function useUpdateRiderFeeMutation(param) {

  const navigate = useNavigate()
  return useMutation({
    mutationFn: updateRiderFee,
    onSuccess: (data) => {

      queryClient.invalidateQueries()
      //  queryClient.invalidateQueries({ queryKey: ['Rider_session_fees',param] })
      //  queryClient.invalidateQueries({ queryKey: ['Rider_session_fees'] })
      //  queryClient.invalidateQueries({ queryKey: ['Riders'] })
      toast.success(data.message);
      // navigate(`/Riders/info/${btoa(Rider_id.id)}`, { replace: true })
    },
    onError: (error) => {
      toast.error(error.response.data.message)
    }
  })
}