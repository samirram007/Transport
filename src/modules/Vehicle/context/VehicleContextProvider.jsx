import moment from "moment";
import { createContext, useState } from "react";
import { useDeleteVehicleMutation, useStoreVehicleMutation, useUpdateVehicleMutation } from "../hooks/mutations";



export const VehicleContext = createContext({

    selectedVehicle: null,
    setSelectedVehicle: () => { },
    isModalOpen: false,
    setModalOpen: () => { },
    action: false,
    setAction: () => { },
    isProcessing: false,
    setIsProcessing: () => { },
    handleMutation: () => { },
});

export const VehicleContextProvider = ({ children, entryMode = 'create', selectedData = null }) => {
    const vehicleStoreMutation = useStoreVehicleMutation()
    const vehicleUpdateMutation = useUpdateVehicleMutation()
    const vehicleDeleteMutation = useDeleteVehicleMutation()
    const [isModalOpen, setModalOpen] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [action, _setAction] = useState(entryMode)
    const [selectedVehicle, setSelectedVehicle] = useState(selectedData ?? {
        name: 'New Vehicle',
        registration_no: '',
        registration_date: null,
        registration_valid_date: '',
        chassis_no: '',
        engine_no: '',
        color: '',
        capacity: 50, 
        insurance_id: null,
        vehicleTypeId: 1, 

    });
    const setAction = (value) => {
        _setAction(value)

    }

    const handleMutation = async (values) => {

        if (action === 'create') {
            vehicleStoreMutation.mutateAsync(values)
        } else if (action === 'edit') {
            vehicleUpdateMutation.mutateAsync(values).then(() => {
                setModalOpen(false)
                // setSelectedVehicle(values)
            })
        } else if (action === 'delete') {
            vehicleDeleteMutation.mutateAsync(values)
                .then(() => {
                    setModalOpen(false)
                    // setSelectedVehicle(values)
                })
        }
        else {
            console.info('Invalid entry mode')
        }
        return Promise.resolve()
    }
    return (<VehicleContext value={
        {
            selectedVehicle, setSelectedVehicle,
            entryMode, action, setAction,
            handleMutation,
            isModalOpen, setModalOpen,
            isProcessing, setIsProcessing,
        }
    }>
        {children}
    </VehicleContext>
    );
};

export default VehicleContextProvider;