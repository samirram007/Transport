import { createContext, useState } from "react";
import { useDeleteIncomeGroupMutation, useStoreIncomeGroupMutation, useUpdateIncomeGroupMutation } from "../hooks/mutations";



export const IncomeGroupContext = createContext({
    data: [],
    fetchedData: {},
    selectedIncomeGroup: null,
    setSelectedIncomeGroup: () => { },
    isModalOpen: false,
    setModalOpen: () => { },
    action: false,
    setAction: () => { },
    isProcessing: false,
    setIsProcessing: () => { },
    handleMutation: () => { },
});

export const IncomeGroupContextProvider = ({ children, entryMode = 'create', selectedData = null }) => {
    const incomeGroupStoreMutation = useStoreIncomeGroupMutation()
    const incomeGroupUpdateMutation = useUpdateIncomeGroupMutation()
    const incomeGroupDeleteMutation = useDeleteIncomeGroupMutation()
    const [isModalOpen, setModalOpen] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [action, _setAction] = useState(entryMode)
    const [selectedIncomeGroup, setSelectedIncomeGroup] = useState(selectedData ?? {
        name: 'New Type',
      

    });
    const setAction = (value) => {
        _setAction(value)

    }

    const handleMutation = async (values) => {

        if (action === 'create') {
            incomeGroupStoreMutation.mutateAsync(values)
        } else if (action === 'edit') {
            incomeGroupUpdateMutation.mutateAsync(values).then(() => {
                setModalOpen(false)
                // setSelectedIncomeGroupType(values)
            })
        } else if (action === 'delete') {
            incomeGroupDeleteMutation.mutateAsync(values)
            .then(() => {
                setModalOpen(false)
                // setSelectedIncomeGroupType(values)
            })
        }
        else {
            console.info('Invalid entry mode')
        }
        return Promise.resolve()
    }
    return (<IncomeGroupContext value={
        {
            selectedIncomeGroup, setSelectedIncomeGroup,
            entryMode, action,setAction,
            handleMutation,
            isModalOpen, setModalOpen,
            isProcessing, setIsProcessing,
        }
    }>
        {children}
    </IncomeGroupContext>
    );
};

export default IncomeGroupContextProvider;