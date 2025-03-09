import { useStoreUserInitialValueMutation } from "@/modules/UserInitialValue/hooks/mutations";
import moment from "moment";
import { createContext, useState } from "react";
import { useDeleteFiscalYearMutation, useStoreFiscalYearMutation, useUpdateFiscalYearMutation } from "../hooks/mutations";



export const FiscalYearContext = createContext({

    selectedFiscalYear: null,
    setSelectedFiscalYear: () => { },

    isModalOpen: false,
    setModalOpen: () => { },
    action: false,
    setAction: () => { },
    isProcessing: false,
    setIsProcessing: () => { },
    handleMutation: () => { },
});

export const FiscalYearContextProvider = ({ children, entryMode = 'create', selectedData = null }) => {
    const fiscalYearStoreMutation = useStoreFiscalYearMutation()
    const fiscalYearUpdateMutation = useUpdateFiscalYearMutation()
    const fiscalYearDeleteMutation = useDeleteFiscalYearMutation()
    const fiscalYearSwitchMutation = useStoreUserInitialValueMutation()
    const [isModalOpen, setModalOpen] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [action, _setAction] = useState(entryMode)

    const [selectedFiscalYear, setSelectedFiscalYear] = useState(selectedData ?? {
        id: moment(new Date()).format('YYYY'),
        name: moment(new Date()).format('YYYY'),
        startDate: moment(new Date()).format('YYYY-MM-DD'),
        endDate: moment(new Date()).format('YYYY-MM-DD'),
        previousFiscalYearId: null,
        nextFiscalYearId: null,
        isCurrent: false,

    });
    const setAction = (value) => {
        _setAction(value)

    }

    const handleMutation = async (values) => {

        if (action === 'create') {
            fiscalYearStoreMutation.mutateAsync(values)
        } else if (action === 'edit') {
            fiscalYearUpdateMutation.mutateAsync(values).then(() => {
                setModalOpen(false)
                // setSelectedFiscalYear(values)
            })
        } else if (action === 'delete') {
            fiscalYearDeleteMutation.mutateAsync(values)
                .then(() => {
                    setModalOpen(false)
                    // setSelectedFiscalYear(values)
                })
        } else if (action === 'switch') {
            fiscalYearSwitchMutation.mutateAsync(values)
                .then(() => {
                    setModalOpen(false)
                    // setSelectedFiscalYear(values)
                })
        }
        else {
            console.info('Invalid entry mode')
        }
        return Promise.resolve()
    }
    return (<FiscalYearContext value={
        {
            selectedFiscalYear, setSelectedFiscalYear,
            entryMode, action, setAction,
            handleMutation,
            isModalOpen, setModalOpen,
            isProcessing, setIsProcessing,
        }
    }>
        {children}
    </FiscalYearContext>
    );
};

export default FiscalYearContextProvider;