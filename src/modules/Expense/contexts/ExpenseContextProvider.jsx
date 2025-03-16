import { queryClient } from "@/lib/queryClient";
import { useUserInitialValueDataContext } from "@/modules/UserInitialValue/context/features/useUserInitialValueDataContext";
import moment from "moment";
import { createContext, useState } from "react";
import { useDeleteExpenseMutation, useStoreExpenseMutation, useUpdateExpenseMutation } from "../hooks/mutations";



export const ExpenseContext = createContext({
    selectedExpense: null,
    setSelectedExpense: () => { },

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

export const ExpenseContextProvider = ({ children, entryMode = 'create', selectedData = null }) => {
    const { data: userInitialValuesData } = useUserInitialValueDataContext()
    // console.log(userInitialValuesData?.find(x=>x.key==='academicSessionId')?.value)
    const initialValues = {

        expenseNo: 'New',
        voucherNo: '',
        expenseDate: moment().format('YYYY-MM-DD'),
        totalAmount: 700,
        paymentMode: 'cash',
        note: '',
        fiscalYearId: userInitialValuesData?.find(x => x.key === 'fiscalYearId')?.value ?? moment(new Date()).format('YYYY'),
        expenseItems: [
            // {
            //     expenseHeadId: 1,
            //     amount: 700,
            //     expenseHead: {
            //         id: 1, name: 'Salary'
            //     }
            // }
        ],

    }
    const ExpenseStoreMutation = useStoreExpenseMutation()
    const ExpenseUpdateMutation = useUpdateExpenseMutation()
    const ExpenseDeleteMutation = useDeleteExpenseMutation()
    const [isModalOpen, setModalOpen] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [action, _setAction] = useState(entryMode)
    const [selectedExpense, setSelectedExpense] = useState(selectedData ?? initialValues);
    const [selectedRider, setSelectedRider] = useState(null);

    const setAction = (value) => {
        _setAction(value)

    }
    const handleMutation = async (values, setSelectedMonths) => {

        if (action === 'create') {
            ExpenseStoreMutation.mutateAsync(values).then(() =>

                queryClient.invalidateQueries({ queryKey: ['searchRiderForExpenses'] })
            ).then(() => setSelectedMonths([]))

        } else if (action === 'edit') {
            ExpenseUpdateMutation.mutateAsync(values).then(() => {
                setModalOpen(false)
                // setSelectedExpense(values)
            })
        } else if (action === 'delete') {
            ExpenseDeleteMutation.mutateAsync(values)
                .then(() => {
                    setModalOpen(false)
                    // setSelectedExpense(values)
                })
        }
        else {
            console.info('Invalid entry mode')
        }
        return Promise.resolve()
    }


    return (<ExpenseContext value={
        {

            selectedExpense, setSelectedExpense,
            selectedRider, setSelectedRider,
            entryMode, action, setAction,
            handleMutation,
            isModalOpen, setModalOpen,
            isProcessing, setIsProcessing,

        }
    }>
        {children}
    </ExpenseContext>
    );
};

export default ExpenseContextProvider;