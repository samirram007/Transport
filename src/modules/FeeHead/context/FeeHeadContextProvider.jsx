import { createContext, useState } from "react";
import { useDeleteFeeHeadMutation, useStoreFeeHeadMutation, useUpdateFeeHeadMutation } from "../hooks/mutations";



export const FeeHeadContext = createContext({
    data: [],
    fetchedData: {},
    selectedFeeHead: null,
    setSelectedFeeHead: () => { },
    isModalOpen: false,
    setModalOpen: () => { },
    action: false,
    setAction: () => { },
    isProcessing: false,
    setIsProcessing: () => { },
    handleMutation: () => { },
});

export const FeeHeadContextProvider = ({ children, entryMode = 'create', selectedData = null }) => {
    const feeHeadStoreMutation = useStoreFeeHeadMutation()
    const feeHeadUpdateMutation = useUpdateFeeHeadMutation()
    const feeHeadDeleteMutation = useDeleteFeeHeadMutation()
    const [isModalOpen, setModalOpen] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [action, _setAction] = useState(entryMode)
    const [selectedFeeHead, setSelectedFeeHead] = useState(selectedData ?? {
        name: 'New Type',
        incomeGroupId: 1


    });
    const setAction = (value) => {
        _setAction(value)

    }

    const handleMutation = async (values) => {

        if (action === 'create') {
            feeHeadStoreMutation.mutateAsync(values)
        } else if (action === 'edit') {
            feeHeadUpdateMutation.mutateAsync(values).then(() => {
                setModalOpen(false)
                // setSelectedFeeHeadType(values)
            })
        } else if (action === 'delete') {
            feeHeadDeleteMutation.mutateAsync(values)
                .then(() => {
                    setModalOpen(false)
                    // setSelectedFeeHeadType(values)
                })
        }
        else {
            console.info('Invalid entry mode')
        }
        return Promise.resolve()
    }
    return (<FeeHeadContext value={
        {
            selectedFeeHead, setSelectedFeeHead,
            entryMode, action, setAction,
            handleMutation,
            isModalOpen, setModalOpen,
            isProcessing, setIsProcessing,
        }
    }>
        {children}
    </FeeHeadContext>
    );
};

export default FeeHeadContextProvider;