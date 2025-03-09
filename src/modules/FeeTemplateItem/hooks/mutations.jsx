import { useMutation } from "@tanstack/react-query";


import { useNavigate } from "react-router";
import { queryClient } from "../../../utils/queryClient";
import { deleteFeeTemplateItem, storeFeeTemplateItem, updateFeeTemplateItem } from "../services/apis";

import { toast } from "sonner";
import { useFormModal } from "../../../contexts/FormModalProvider";
export function useStoreFeeTemplateItemMutation() {
  const navigate = useNavigate()
  const { setOpen } = useFormModal()
  return useMutation({
    mutationFn: storeFeeTemplateItem,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['fee_template_items'] })
      toast.success(data.message);
      // navigate("/fee_templates", { replace: true })
      // setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message)
    }
  })
}
export function useUpdateFeeTemplateItemMutation() {

  return useMutation({
    mutationFn: updateFeeTemplateItem,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['fee_template_items'] })
      toast.success(data.message);
      // navigate("/fee_templates", { replace: true })
      //   setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message)
    }
  })
}
export function useDeleteFeeTemplateItemMutation() {
  const navigate = useNavigate()
  const { setOpen } = useFormModal()
  return useMutation({
    mutationFn: deleteFeeTemplateItem,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['fee_template_items'] })
      toast.success(data.message);
      // navigate("/fee_templates", { replace: true })
      // setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message)
    }
  })
}