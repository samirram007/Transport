import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useFormModal } from "../../../contexts/FormModalProvider";
import { queryClient } from "../../../utils/queryClient";
import { deleteJourneyTypeService, storeJourneyTypeService, updateJourneyTypeService } from "../services/apis";


export function useStoreJourneyTypeMutation() {
  const navigate = useNavigate()
  const { setOpen } = useFormModal()
  return useMutation({
    mutationFn: storeJourneyTypeService,
    onSuccess: (data) => {

      queryClient.invalidateQueries({ queryKey: ['journey_types'] })
      toast.success(data.message);
      navigate("/journey_types", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message)
      //  navigate("/school_types/create", { replace: true })


    }
  })
}
export function useUpdateJourneyTypeMutation() {
  const navigate = useNavigate()
  const { setOpen } = useFormModal()
  return useMutation({
    mutationFn: updateJourneyTypeService,
    onSuccess: (data) => {

      queryClient.invalidateQueries({ queryKey: ['journey_types'] })
      toast.success(data.message);
      navigate("/journey_types", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message)
      // navigate("/journey_types/create", { replace: true })


    }
  })
}
export function useDeleteJourneyTypeMutation() {

  const navigate = useNavigate()
  const { setOpen } = useFormModal()
  return useMutation({
    mutationFn: deleteJourneyTypeService,
    onSuccess: (data) => {

      queryClient.invalidateQueries({ queryKey: ['journey_types'] })
      toast.success(data.message);
      navigate("/journey_types", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message)
      // navigate("/journey_types/create", { replace: true })


    }
  })
}