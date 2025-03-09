import { createContext, useState } from "react";
import { useDeleteSchoolTypeMutation, useStoreSchoolTypeMutation, useUpdateSchoolTypeMutation } from "../hooks/mutations";



export const SchoolTypeContext = createContext({
    
    selectedSchoolType: null,
    setSelectedSchoolType: () => { },
    isModalOpen: false,
    setModalOpen: () => { },
    action: false,
    setAction: () => { },
    isProcessing: false,
    setIsProcessing: () => { },
    handleMutation: () => { },
});

export const SchoolTypeContextProvider = ({ children, entryMode = 'create', selectedData = null }) => {
    const schoolTypeStoreMutation = useStoreSchoolTypeMutation()
    const schoolTypeUpdateMutation = useUpdateSchoolTypeMutation()
    const schoolTypeDeleteMutation = useDeleteSchoolTypeMutation()
    const [isModalOpen, setModalOpen] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [action, _setAction] = useState(entryMode)
    const [selectedSchoolType, setSelectedSchoolType] = useState(selectedData ?? {
        name: 'New Type',
      

    });
    const setAction = (value) => {
        _setAction(value)

    }

    const handleMutation = async (values) => {

        if (action === 'create') {
            schoolTypeStoreMutation.mutateAsync(values)
        } else if (action === 'edit') {
            schoolTypeUpdateMutation.mutateAsync(values).then(() => {
                setModalOpen(false)
                // setSelectedSchoolTypeType(values)
            })
        } else if (action === 'delete') {
            schoolTypeDeleteMutation.mutateAsync(values)
            .then(() => {
                setModalOpen(false)
                // setSelectedSchoolTypeType(values)
            })
        }
        else {
            console.info('Invalid entry mode')
        }
        return Promise.resolve()
    }
    return (<SchoolTypeContext value={
        {
            selectedSchoolType, setSelectedSchoolType,
            entryMode, action,setAction,
            handleMutation,
            isModalOpen, setModalOpen,
            isProcessing, setIsProcessing,
        }
    }>
        {children}
    </SchoolTypeContext>
    );
};

export default SchoolTypeContextProvider;