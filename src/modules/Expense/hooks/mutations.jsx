import { useMutation } from "@tanstack/react-query";


import { queryClient } from "../../../utils/queryClient";
import { deleteExpense, storeExpense, updateExpense } from "../services/apis";

import { toast } from "sonner";
import { useFormModal } from "../../../contexts/FormModalProvider";
export function useStoreExpenseMutation() {
  // const navigate = useNavigate()
  const { setOpen } = useFormModal()
  return useMutation({
    mutationFn: storeExpense,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
      toast.success(data.message);
      //navigate("/expenses", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message)
    }
  })
}
export function useUpdateExpenseMutation() {
  //const navigate = useNavigate()
  const { setOpen } = useFormModal()
  return useMutation({
    mutationFn: updateExpense,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
      toast.success(data.message);
      // navigate("/expenses", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message)
    }
  })
}
export function useDeleteExpenseMutation() {
  // const navigate = useNavigate()
  const { setOpen } = useFormModal()
  return useMutation({
    mutationFn: deleteExpense,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
      toast.success(data.message);
      // navigate("/expenses", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message)
    }
  })
}