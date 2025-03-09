import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useFormModal } from "../../../contexts/FormModalProvider";
import { queryClient } from "../../../utils/queryClient";
import { deleteSubjectGroupService, storeSubjectGroupService, updateSubjectGroupService } from "../services/apis";


export function useStoreSubjectGroupMutation() {
  const navigate = useNavigate()
  const { setOpen } = useFormModal()
  return useMutation({
    mutationFn: storeSubjectGroupService,
    onSuccess: (data) => {

      queryClient.invalidateQueries({ queryKey: ['subject_groups'] })
      toast.success(data.message);
      navigate("/subject_groups", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message)
      //  navigate("/school_types/create", { replace: true })


    }
  })
}
export function useUpdateSubjectGroupMutation() {
  const navigate = useNavigate()
  const { setOpen } = useFormModal()
  return useMutation({
    mutationFn: updateSubjectGroupService,
    onSuccess: (data) => {

      queryClient.invalidateQueries({ queryKey: ['subject_groups'] })
      toast.success(data.message);
      navigate("/subject_groups", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message)
      // navigate("/subject_groups/create", { replace: true })


    }
  })
}
export function useDeleteSubjectGroupMutation() {

  const navigate = useNavigate()
  const { setOpen } = useFormModal()
  return useMutation({
    mutationFn: deleteSubjectGroupService,
    onSuccess: (data) => {

      queryClient.invalidateQueries({ queryKey: ['subject_groups'] })
      toast.success(data.message);
      navigate("/subject_groups", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message)
      // navigate("/subject_groups/create", { replace: true })


    }
  })
}