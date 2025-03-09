import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useFormModal } from "../../../contexts/FormModalProvider";
import { queryClient } from "../../../utils/queryClient";
import { deleteRoomService, storeRoomService, updateRoomService } from "../services/apis";


export function useStoreRoomMutation() {
  const navigate = useNavigate()
  const { setOpen } = useFormModal()
  return useMutation({
    mutationFn: storeRoomService,
    onSuccess: (data) => {

      queryClient.invalidateQueries({ queryKey: ['rooms'] })
      toast.success(data.message);
      navigate("/rooms", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message)
      //  navigate("/school_types/create", { replace: true })


    }
  })
}
export function useUpdateRoomMutation() {
  const navigate = useNavigate()
  const { setOpen } = useFormModal()
  return useMutation({
    mutationFn: updateRoomService,
    onSuccess: (data) => {

      queryClient.invalidateQueries({ queryKey: ['rooms'] })
      toast.success(data.message);
      navigate("/rooms", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message)
      // navigate("/rooms/create", { replace: true })


    }
  })
}
export function useDeleteRoomMutation() {

  const navigate = useNavigate()
  const { setOpen } = useFormModal()
  return useMutation({
    mutationFn: deleteRoomService,
    onSuccess: (data) => {

      queryClient.invalidateQueries({ queryKey: ['rooms'] })
      toast.success(data.message);
      navigate("/rooms", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message)
      // navigate("/rooms/create", { replace: true })


    }
  })
}