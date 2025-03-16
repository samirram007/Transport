import { createContext, useState } from "react";
import { useDeleteExpenseHeadMutation, useStoreExpenseHeadMutation, useUpdateExpenseHeadMutation } from "../hooks/mutations";



export const ExpenseHeadContext = createContext({
    data: [],
    fetchedData: {},
    selectedExpenseHead: null,
    setSelectedExpenseHead: () => { },
    isModalOpen: false,
    setModalOpen: () => { },
    action: false,
    setAction: () => { },
    isProcessing: false,
    setIsProcessing: () => { },
    handleMutation: () => { },
});

export const ExpenseHeadContextProvider = ({ children, entryMode = 'create', selectedData = null }) => {
    const expenseHeadStoreMutation = useStoreExpenseHeadMutation()
    const expenseHeadUpdateMutation = useUpdateExpenseHeadMutation()
    const expenseHeadDeleteMutation = useDeleteExpenseHeadMutation()
    const [isModalOpen, setModalOpen] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [action, _setAction] = useState(entryMode)
    const [selectedExpenseHead, setSelectedExpenseHead] = useState(selectedData ?? {
        name: 'New Type',
        expenseGroupId: 1


    });
    const setAction = (value) => {
        _setAction(value)

    }

    const handleMutation = async (values) => {

        if (action === 'create') {
            expenseHeadStoreMutation.mutateAsync(values)
        } else if (action === 'edit') {
            expenseHeadUpdateMutation.mutateAsync(values).then(() => {
                setModalOpen(false)
                // setSelectedExpenseHeadType(values)
            })
        } else if (action === 'delete') {
            expenseHeadDeleteMutation.mutateAsync(values)
                .then(() => {
                    setModalOpen(false)
                    // setSelectedExpenseHeadType(values)
                })
        }
        else {
            console.info('Invalid entry mode')
        }
        return Promise.resolve()
    }
    return (<ExpenseHeadContext value={
        {
            selectedExpenseHead, setSelectedExpenseHead,
            entryMode, action, setAction,
            handleMutation,
            isModalOpen, setModalOpen,
            isProcessing, setIsProcessing,
        }
    }>
        {children}
    </ExpenseHeadContext>
    );
};

export default ExpenseHeadContextProvider;