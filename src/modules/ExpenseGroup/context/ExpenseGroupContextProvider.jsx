import { createContext, useState } from "react";
import { useDeleteExpenseGroupMutation, useStoreExpenseGroupMutation, useUpdateExpenseGroupMutation } from "../hooks/mutations";



export const ExpenseGroupContext = createContext({
    data: [],
    fetchedData: {},
    selectedExpenseGroup: null,
    setSelectedExpenseGroup: () => { },
    isModalOpen: false,
    setModalOpen: () => { },
    action: false,
    setAction: () => { },
    isProcessing: false,
    setIsProcessing: () => { },
    handleMutation: () => { },
});

export const ExpenseGroupContextProvider = ({ children, entryMode = 'create', selectedData = null }) => {
    const expenseGroupStoreMutation = useStoreExpenseGroupMutation()
    const expenseGroupUpdateMutation = useUpdateExpenseGroupMutation()
    const expenseGroupDeleteMutation = useDeleteExpenseGroupMutation()
    const [isModalOpen, setModalOpen] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [action, _setAction] = useState(entryMode)
    const [selectedExpenseGroup, setSelectedExpenseGroup] = useState(selectedData ?? {
        name: 'New Type',
      

    });
    const setAction = (value) => {
        _setAction(value)

    }

    const handleMutation = async (values) => {

        if (action === 'create') {
            expenseGroupStoreMutation.mutateAsync(values)
        } else if (action === 'edit') {
            expenseGroupUpdateMutation.mutateAsync(values).then(() => {
                setModalOpen(false)
                // setSelectedExpenseGroupType(values)
            })
        } else if (action === 'delete') {
            expenseGroupDeleteMutation.mutateAsync(values)
            .then(() => {
                setModalOpen(false)
                // setSelectedExpenseGroupType(values)
            })
        }
        else {
            console.info('Invalid entry mode')
        }
        return Promise.resolve()
    }
    return (<ExpenseGroupContext value={
        {
            selectedExpenseGroup, setSelectedExpenseGroup,
            entryMode, action,setAction,
            handleMutation,
            isModalOpen, setModalOpen,
            isProcessing, setIsProcessing,
        }
    }>
        {children}
    </ExpenseGroupContext>
    );
};

export default ExpenseGroupContextProvider;