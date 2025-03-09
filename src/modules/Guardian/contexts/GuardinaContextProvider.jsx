import { createContext, useState } from "react";
import { useDeleteGuardianMutation, useStoreGuardianMutation, useUpdateGuardianMutation } from "../hooks/mutations";



export const GuardianContext = createContext({
    data: [],
    fetchedData: {},
    selectedGuardian: null,
    setSelectedGuardian: () => { },
    isModalOpen: false,
    setModalOpen: () => { },
    action: false,
    setAction: () => { },
    isProcessing: false,
    setIsProcessing: () => { },
    handleMutation: () => { },
});

export const GuardianContextProvider = ({ children, entryMode = 'create', selectedData = null }) => {
    const guardianStoreMutation = useStoreGuardianMutation()
    const guardianUpdateMutation = useUpdateGuardianMutation()
    const guardianDeleteMutation = useDeleteGuardianMutation()
    const [isModalOpen, setModalOpen] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [action, _setAction] = useState(entryMode)
    const [selectedGuardian, setSelectedGuardian] = useState(selectedData ?? {
        name: 'New Type',
        userType:'guardian',
        guardianType:'Father',
        annualIncome:0,
        education:'',
        occupation:'',
        email:'',
        contactNo:'',
        earnings: '',

      

    });
    const setAction = (value) => {
        _setAction(value)

    }

    const handleMutation = async (values) => {

        if (action === 'create') {
            guardianStoreMutation.mutateAsync(values)
        } else if (action === 'edit') {
            guardianUpdateMutation.mutateAsync(values).then(() => {
                setModalOpen(false)
                // setSelectedGuardianType(values)
            })
        } else if (action === 'delete') {
            guardianDeleteMutation.mutateAsync(values)
            .then(() => {
                setModalOpen(false)
                // setSelectedGuardianType(values)
            })
        }
        else {
            console.info('Invalid entry mode')
        }
        return Promise.resolve()
    }
    return (<GuardianContext value={
        {
            selectedGuardian, setSelectedGuardian,
            entryMode, action,setAction,
            handleMutation,
            isModalOpen, setModalOpen,
            isProcessing, setIsProcessing,
        }
    }>
        {children}
    </GuardianContext>
    );
};
 
export default GuardinaContextProvider