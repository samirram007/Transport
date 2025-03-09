import { useMutation } from "@tanstack/react-query";


import { useNavigate } from "react-router";
import { queryClient } from "../../../utils/queryClient";
import { storeTeacher, updateTeacher } from "../services/apis";

import { toast } from "sonner";
export function useStoreTeacherMutation() {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: storeTeacher,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] })
      toast.success(data.message);
      navigate("/teachers", { replace: true })
    },
    onError: (error) => {
      toast.error(error.response.data.message)
    }
  })
}
export function useUpdateTeacherMutation() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: updateTeacher,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] })
      toast.success(data.message);
      navigate("/teachers", { replace: true })
    },
    onError: (error) => {
      toast.error(error.response.data.message)
    }
  })
}
