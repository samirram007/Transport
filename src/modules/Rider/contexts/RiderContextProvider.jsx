import { useUserInitialValueDataContext } from "@/modules/UserInitialValue/context/features/useUserInitialValueDataContext";
import { createContext, useState } from "react";
import { useStoreRiderMutation, useUpdateRiderMutation } from "../hooks/mutations";



export const RiderContext = createContext({
    selectedRider: null,
    setSelectedRider: () => { },
    isModalOpen: false,
    setModalOpen: () => { },
    action: false,
    setAction: () => { },
    isProcessing: false,
    setIsProcessing: () => { },
    handleMutation: () => { },
});

export const RiderContextProvider = ({ children, entryMode = 'create', selectedData = null }) => {
    const { data: userInitialValuesData } = useUserInitialValueDataContext()
    // console.log(userInitialValuesData?.find(x=>x.key==='academicSessionId')?.value)
    const initialValues = {

        name: '',
        isActive: false,
        schoolId: 1,
        vehicleId: 1,
    }
    const RiderStoreMutation = useStoreRiderMutation()
    const RiderUpdateMutation = useUpdateRiderMutation()
    //  const RiderDeleteMutation = useDeleteRiderMutation()
    const [isModalOpen, setModalOpen] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [action, _setAction] = useState(entryMode)
    const [selectedRider, setSelectedRider] = useState(selectedData ?? {
        name: 'New Rider',
        code: '',
        riderType: 'student',
        email: '',
        contactNo: '',
        schoolId: 1,
        school_time: 'morning',
        vehicleId: 1,
        standard: 'nursery1',
        section: 'a',
        rollNo: '',
        monthly_charge: 700,
        status: 'active',
        riderSnapshotId: null,

        profileDocumentId: null,

    });

    const setAction = (value) => {
        _setAction(value)

    }
    const handleMutation = async (values) => {

        if (action === 'create') {
            RiderStoreMutation.mutateAsync(values)
        } else if (action === 'edit') {
            RiderUpdateMutation.mutateAsync(values).then(() => {
                setModalOpen(false)
                // setSelectedRider(values)
            })
        } else if (action === 'delete') {
            // RiderDeleteMutation.mutateAsync(values)
            //     .then(() => {
            //         setModalOpen(false)
            //         // setSelectedRider(values)
            //     })
        }
        else {
            console.info('Invalid entry mode')
        }
        return Promise.resolve()
    }
    return (<RiderContext value={
        {
            selectedRider, setSelectedRider,
            entryMode, action, setAction,
            handleMutation,
            isModalOpen, setModalOpen,
            isProcessing, setIsProcessing,

        }
    }>
        {children}
    </RiderContext>
    );
};

export default RiderContextProvider;