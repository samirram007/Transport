import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useFormModal } from "../../../contexts/FormModalProvider";
import { queryClient } from "../../../utils/queryClient";
import { deleteSectionService, storeSectionService, updateSectionService } from "../services/apis";


export function useStoreSectionMutation() {
  const navigate = useNavigate()
  const { setOpen } = useFormModal()
  return useMutation({
    mutationFn: storeSectionService,
    onSuccess: (data) => {

      queryClient.invalidateQueries({ queryKey: ['sections'] })
      toast.success(data.message);
      navigate("/sections", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message)
      //  navigate("/school_types/create", { replace: true })


    }
  })
}
export function useUpdateSectionMutation() {
  const navigate = useNavigate()
  const { setOpen } = useFormModal()
  return useMutation({
    mutationFn: updateSectionService,
    onSuccess: (data) => {

      queryClient.invalidateQueries({ queryKey: ['sections'] })
      toast.success(data.message);
      navigate("/sections", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message)
      // navigate("/sections/create", { replace: true })


    }
  })
}
export function useDeleteSectionMutation() {

  const navigate = useNavigate()
  const { setOpen } = useFormModal()
  return useMutation({
    mutationFn: deleteSectionService,
    onSuccess: (data) => {

      queryClient.invalidateQueries({ queryKey: ['sections'] })
      toast.success(data.message);
      navigate("/sections", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message)
      // navigate("/sections/create", { replace: true })


    }
  })
}