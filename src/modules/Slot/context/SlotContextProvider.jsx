import moment from "moment";
import { createContext, useState } from "react";
import { useDeleteSlotMutation, useStoreSlotMutation, useUpdateSlotMutation } from "../hooks/mutations";



export const SlotContext = createContext({
    
    selectedSlot: null,
    setSelectedSlot: () => { },
    isModalOpen: false,
    setModalOpen: () => { },
    action: false,
    setAction: () => { },
    isProcessing: false,
    setIsProcessing: () => { },
    handleMutation: () => { },
});

export const SlotContextProvider = ({ children, entryMode = 'create', selectedData = null }) => {
    const slotStoreMutation = useStoreSlotMutation()
    const slotUpdateMutation = useUpdateSlotMutation()
    const slotDeleteMutation = useDeleteSlotMutation()
    const [isModalOpen, setModalOpen] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [action, _setAction] = useState(entryMode)
    const [selectedSlot, setSelectedSlot] = useState(selectedData ?? {
        name: 'New Slot',
        slotType: 'pickup',
        vehicleId: 1,
        capacity:50,
        startTime: moment(new Date()).format('HH:MM'),
        endTime: moment(new Date()).format('HH:MM'),
        isActive: true,

    });
    const setAction = (value) => {
        _setAction(value)

    }

    const handleMutation = async (values) => {

        if (action === 'create') {
            slotStoreMutation.mutateAsync(values)
        } else if (action === 'edit') {
            slotUpdateMutation.mutateAsync(values).then(() => {
                setModalOpen(false)
                // setSelectedSlot(values)
            })
        } else if (action === 'delete') {
            slotDeleteMutation.mutateAsync(values)
            .then(() => {
                setModalOpen(false)
                // setSelectedSlot(values)
            })
        }
        else {
            console.info('Invalid entry mode')
        }
        return Promise.resolve()
    }
    return (<SlotContext value={
        {
            selectedSlot, setSelectedSlot,
            entryMode, action,setAction,
            handleMutation,
            isModalOpen, setModalOpen,
            isProcessing, setIsProcessing,
        }
    }>
        {children}
    </SlotContext>
    );
};

export default SlotContextProvider;