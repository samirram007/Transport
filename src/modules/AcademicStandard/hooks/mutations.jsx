import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useFormModal } from "../../../contexts/FormModalProvider";
import { queryClient } from "../../../utils/queryClient";
import { deleteAcademicStandardService, storeAcademicStandardService, updateAcademicStandardService } from "../services/apis";


export function useStoreAcademicStandardMutation() {
  const navigate = useNavigate()
  const { setOpen } = useFormModal()
  return useMutation({
    mutationFn: storeAcademicStandardService,
    onSuccess: (data) => {

      queryClient.invalidateQueries({ queryKey: ['academic_standards'] })
      toast.success(data.message);
      navigate("/academic_standards", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message)
      //  navigate("/school_types/create", { replace: true })


    }
  })
}
export function useUpdateAcademicStandardMutation() {
  // const navigate = useNavigate()
  const { setOpen } = useFormModal()
  return useMutation({
    mutationFn: updateAcademicStandardService,
    onSuccess: (data) => {

      queryClient.invalidateQueries({ queryKey: ['academic_standards'] })
      toast.success(data.message);
      // navigate("/academic_standards", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message)
      // navigate("/academic_standards/create", { replace: true })


    }
  })
}
export function useDeleteAcademicStandardMutation() {

  const navigate = useNavigate()
  const { setOpen } = useFormModal()
  return useMutation({
    mutationFn: deleteAcademicStandardService,
    onSuccess: (data) => {

      queryClient.invalidateQueries({ queryKey: ['academic_standards'] })
      toast.success(data.message);
      navigate("/academic_standards", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message)
      // navigate("/academic_standards/create", { replace: true })


    }
  })
}