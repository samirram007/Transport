import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useFormModal } from "../../../contexts/FormModalProvider";
import { queryClient } from "../../../utils/queryClient";
import { deletePromotionService, storePromotionService, updatePromotionService } from "../services/apis";


export function useStorePromotionMutation() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: storePromotionService,
    onSuccess: (data) => {

      queryClient.invalidateQueries({ queryKey: ['promotions'] })
      toast.success(data.message);
      navigate("/promotions", { replace: true })

    },
    onError: (error) => {
      toast.error(error.response.data.message)
      //  navigate("/school_types/create", { replace: true })


    }
  })
}
export function useUpdatePromotionMutation() {
  const navigate = useNavigate()
  const { setOpen } = useFormModal()
  return useMutation({
    mutationFn: updatePromotionService,
    onSuccess: (data) => {

      queryClient.invalidateQueries({ queryKey: ['promotions'] })
      toast.success(data.message);
      navigate("/promotions", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message)
      // navigate("/promotions/create", { replace: true })


    }
  })
}
export function useDeletePromotionMutation() {

  const navigate = useNavigate()
  const { setOpen } = useFormModal()
  return useMutation({
    mutationFn: deletePromotionService,
    onSuccess: (data) => {

      queryClient.invalidateQueries({ queryKey: ['promotions'] })
      toast.success(data.message);
      navigate("/promotions", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message)
      // navigate("/promotions/create", { replace: true })


    }
  })
}