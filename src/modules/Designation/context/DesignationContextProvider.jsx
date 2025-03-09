import { createContext, useState } from "react";
import { useDeleteDesignationMutation, useStoreDesignationMutation, useUpdateDesignationMutation } from "../hooks/mutations";



export const DesignationContext = createContext({
    data: [],
    fetchedData: {},
    selectedDesignation: null,
    setSelectedDesignation: () => { },
    isModalOpen: false,
    setModalOpen: () => { },
    action: false,
    setAction: () => { },
    isProcessing: false,
    setIsProcessing: () => { },
    handleMutation: () => { },
});

export const DesignationContextProvider = ({ children, entryMode = 'create', selectedData = null }) => {
    const designationStoreMutation = useStoreDesignationMutation()
    const designationUpdateMutation = useUpdateDesignationMutation()
    const designationDeleteMutation = useDeleteDesignationMutation()
    const [isModalOpen, setModalOpen] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [action, _setAction] = useState(entryMode)
    const [selectedDesignation, setSelectedDesignation] = useState(selectedData ?? {
        name: 'New Designation', 

    });
    const setAction = (value) => {
        _setAction(value)

    }

    const handleMutation = async (values) => {

        if (action === 'create') {
            designationStoreMutation.mutateAsync(values)
        } else if (action === 'edit') {
            designationUpdateMutation.mutateAsync(values).then(() => {
                setModalOpen(false)
                // setSelectedDesignation(values)
            })
        } else if (action === 'delete') {
            designationDeleteMutation.mutateAsync(values)
            .then(() => {
                setModalOpen(false)
                // setSelectedDesignation(values)
            })
        }
        else {
            console.info('Invalid entry mode')
        }
        return Promise.resolve()
    }
    return (<DesignationContext value={
        {
            selectedDesignation, setSelectedDesignation,
            entryMode, action,setAction,
            handleMutation,
            isModalOpen, setModalOpen,
            isProcessing, setIsProcessing,
        }
    }>
        {children}
    </DesignationContext>
    );
};

export default DesignationContextProvider;