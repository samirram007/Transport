import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useFormModal } from "../../../contexts/FormModalProvider";
import { queryClient } from "../../../utils/queryClient";
import { deleteAdmissionService, storeAdmissionService, updateAdmissionService } from "../services/apis";


export function useStoreAdmissionMutation() {
  const navigate = useNavigate()
  const { setOpen } = useFormModal()
  return useMutation({
    mutationFn: storeAdmissionService,
    onSuccess: (data) => {

      queryClient.invalidateQueries({ queryKey: ['admissions'] })
      toast.success(data.message);
      navigate("/admissions", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message)
      //  navigate("/school_types/create", { replace: true })


    }
  })
}
export function useUpdateAdmissionMutation() {
  const navigate = useNavigate()
  const { setOpen } = useFormModal()
  return useMutation({
    mutationFn: updateAdmissionService,
    onSuccess: (data) => {

      queryClient.invalidateQueries({ queryKey: ['admissions'] })
      toast.success(data.message);
      navigate("/admissions", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message)
      // navigate("/admissions/create", { replace: true })


    }
  })
}
export function useDeleteAdmissionMutation() {

  const navigate = useNavigate()
  const { setOpen } = useFormModal()
  return useMutation({
    mutationFn: deleteAdmissionService,
    onSuccess: (data) => {

      queryClient.invalidateQueries({ queryKey: ['admissions'] })
      toast.success(data.message);
      navigate("/admissions", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message)
      // navigate("/admissions/create", { replace: true })


    }
  })
}