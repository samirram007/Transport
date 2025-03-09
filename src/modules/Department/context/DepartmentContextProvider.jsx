import { createContext, useState } from "react";
import { useDeleteDepartmentMutation, useStoreDepartmentMutation, useUpdateDepartmentMutation } from "../hooks/mutations";



export const DepartmentContext = createContext({
    data: [],
    fetchedData: {},
    selectedDepartment: null,
    setSelectedDepartment: () => { },
    isModalOpen: false,
    setModalOpen: () => { },
    action: false,
    setAction: () => { },
    isProcessing: false,
    setIsProcessing: () => { },
    handleMutation: () => { },
});

export const DepartmentContextProvider = ({ children, entryMode = 'create', selectedData = null }) => {
    const departmentStoreMutation = useStoreDepartmentMutation()
    const departmentUpdateMutation = useUpdateDepartmentMutation()
    const departmentDeleteMutation = useDeleteDepartmentMutation()
    const [isModalOpen, setModalOpen] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [action, _setAction] = useState(entryMode)
    const [selectedDepartment, setSelectedDepartment] = useState(selectedData ?? {
        name: 'New Department', 

    });
    const setAction = (value) => {
        _setAction(value)

    }

    const handleMutation = async (values) => {

        if (action === 'create') {
            departmentStoreMutation.mutateAsync(values)
        } else if (action === 'edit') {
            departmentUpdateMutation.mutateAsync(values).then(() => {
                setModalOpen(false)
                // setSelectedDepartment(values)
            })
        } else if (action === 'delete') {
            departmentDeleteMutation.mutateAsync(values)
            .then(() => {
                setModalOpen(false)
                // setSelectedDepartment(values)
            })
        }
        else {
            console.info('Invalid entry mode')
        }
        return Promise.resolve()
    }
    return (<DepartmentContext value={
        {
            selectedDepartment, setSelectedDepartment,
            entryMode, action,setAction,
            handleMutation,
            isModalOpen, setModalOpen,
            isProcessing, setIsProcessing,
        }
    }>
        {children}
    </DepartmentContext>
    );
};

export default DepartmentContextProvider;