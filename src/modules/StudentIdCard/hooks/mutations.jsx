import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useFormModal } from "../../../contexts/FormModalProvider";
import { queryClient } from "../../../utils/queryClient";
import { deleteStudentIdCardService, storeStudentIdCardService, updateStudentIdCardService } from "../services/apis";


export function useStoreStudentIdCardMutation() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: storeStudentIdCardService,
    onSuccess: (data) => {

      queryClient.invalidateQueries({ queryKey: ['student_id_cards'] })
      toast.success(data.message);
      navigate("/student_id_cards", { replace: true })

    },
    onError: (error) => {
      toast.error(error.response.data.message)
      //  navigate("/school_types/create", { replace: true })


    }
  })
}
export function useUpdateStudentIdCardMutation() {
  const navigate = useNavigate()
  const { setOpen } = useFormModal()
  return useMutation({
    mutationFn: updateStudentIdCardService,
    onSuccess: (data) => {

      queryClient.invalidateQueries({ queryKey: ['student_id_cards'] })
      toast.success(data.message);
      navigate("/student_id_cards", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message)
      // navigate("/student_id_cards/create", { replace: true })


    }
  })
}
export function useDeleteStudentIdCardMutation() {

  const navigate = useNavigate()
  const { setOpen } = useFormModal()
  return useMutation({
    mutationFn: deleteStudentIdCardService,
    onSuccess: (data) => {

      queryClient.invalidateQueries({ queryKey: ['student_id_cards'] })
      toast.success(data.message);
      navigate("/student_id_cards", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message)
      // navigate("/student_id_cards/create", { replace: true })


    }
  })
}