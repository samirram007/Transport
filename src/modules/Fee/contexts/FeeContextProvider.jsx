import { queryClient } from "@/lib/queryClient";
import { useUserInitialValueDataContext } from "@/modules/UserInitialValue/context/features/useUserInitialValueDataContext";
import moment from "moment";
import { createContext, useState } from "react";
import { useDeleteFeeMutation, useStoreFeeMutation, useUpdateFeeMutation } from "../hooks/mutations";



export const FeeContext = createContext({
    selectedFee: null,
    setSelectedFee: () => { },

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

export const FeeContextProvider = ({ children, entryMode = 'create', selectedData = null }) => {
    const { data: userInitialValuesData } = useUserInitialValueDataContext()
    // console.log(userInitialValuesData?.find(x=>x.key==='academicSessionId')?.value)
    const initialValues = {

        feeNo: '',
        feeDate: moment().format('YYYY-MM-DD'),
        riderId: 1,
        riderSnapshotId: 1,
        totalAmount: 700,
        paidAmount: 700,
        balanceAmount: 0,
        paymentMode: 'cash',
        note: '',
        fiscalYearId: userInitialValuesData?.find(x => x.key === 'fiscalYearId')?.value ?? moment(new Date()).format('YYYY'),
        feeItems: [
            {
                feeHeadId: 1,
                quantity: 1,
                months: 'JAN',
                amount: 700,
                totalAmount: 700
            }
        ],
        feeItemMonths: [
            {
                year: 2025,
                monthId: 1,
                amount: 700,
            }
        ]
    }
    const FeeStoreMutation = useStoreFeeMutation()
    const FeeUpdateMutation = useUpdateFeeMutation()
    const FeeDeleteMutation = useDeleteFeeMutation()
    const [isModalOpen, setModalOpen] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [action, _setAction] = useState(entryMode)
    const [selectedFee, setSelectedFee] = useState(selectedData ?? initialValues);
    const [selectedRider, setSelectedRider] = useState(null);

    const setAction = (value) => {
        _setAction(value)

    }
    const handleMutation = async (values, setSelectedMonths) => {

        if (action === 'create') {
            FeeStoreMutation.mutateAsync(values).then(() =>

                queryClient.invalidateQueries({ queryKey: ['searchRiderForFees'] })
            ).then(() => setSelectedMonths([]))

        } else if (action === 'edit') {
            FeeUpdateMutation.mutateAsync(values).then(() => {
                setModalOpen(false)
                // setSelectedFee(values)
            })
        } else if (action === 'delete') {
            FeeDeleteMutation.mutateAsync(values)
                .then(() => {
                    setModalOpen(false)
                    // setSelectedFee(values)
                })
        }
        else {
            console.info('Invalid entry mode')
        }
        return Promise.resolve()
    }


    return (<FeeContext value={
        {

            selectedFee, setSelectedFee,
            selectedRider, setSelectedRider,
            entryMode, action, setAction,
            handleMutation,
            isModalOpen, setModalOpen,
            isProcessing, setIsProcessing,

        }
    }>
        {children}
    </FeeContext>
    );
};

export default FeeContextProvider;