import { createContext, useState } from "react";
import { useDeleteVehicleTypeMutation, useStoreVehicleTypeMutation, useUpdateVehicleTypeMutation } from "../hooks/mutations";



export const VehicleTypeContext = createContext({

    selectedVehicleType: null,
    setSelectedVehicleType: () => { },
    isModalOpen: false,
    setModalOpen: () => { },
    action: false,
    setAction: () => { },
    isProcessing: false,
    setIsProcessing: () => { },
    handleMutation: () => { },
});

export const VehicleTypeContextProvider = ({ children, entryMode = 'create', selectedData = null }) => {
    const vehicleTypeStoreMutation = useStoreVehicleTypeMutation()
    const vehicleTypeUpdateMutation = useUpdateVehicleTypeMutation()
    const vehicleTypeDeleteMutation = useDeleteVehicleTypeMutation()
    const [isModalOpen, setModalOpen] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [action, _setAction] = useState(entryMode)
    const [selectedVehicleType, setSelectedVehicleType] = useState(selectedData ?? {
        name: 'New Type',


    });
    const setAction = (value) => {
        _setAction(value)

    }

    const handleMutation = async (values) => {

        if (action === 'create') {
            vehicleTypeStoreMutation.mutateAsync(values)
        } else if (action === 'edit') {
            vehicleTypeUpdateMutation.mutateAsync(values).then(() => {
                setModalOpen(false)
                // setSelectedVehicleTypeType(values)
            })
        } else if (action === 'delete') {
            vehicleTypeDeleteMutation.mutateAsync(values)
                .then(() => {
                    setModalOpen(false)
                    // setSelectedVehicleTypeType(values)
                })
        }
        else {
            console.info('Invalid entry mode')
        }
        return Promise.resolve()
    }
    return (<VehicleTypeContext value={
        {
            selectedVehicleType, setSelectedVehicleType,
            entryMode, action, setAction,
            handleMutation,
            isModalOpen, setModalOpen,
            isProcessing, setIsProcessing,
        }
    }>
        {children}
    </VehicleTypeContext>
    );
};

export default VehicleTypeContextProvider;