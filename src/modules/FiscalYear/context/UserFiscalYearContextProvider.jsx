import { useUserInitialValueDataContext } from "@/modules/UserInitialValue/context/features/useUserInitialValueDataContext";
import { useStoreUserInitialValueMutation } from "@/modules/UserInitialValue/hooks/mutations";
import { createContext, useMemo, useState } from "react";
import { useFiscalYears } from "../hooks/queries";



export const UserFiscalYearContext = createContext({

    selectedFiscalYear: null,
    setSelectedFiscalYear: () => { },
    userSelectedFiscalYear: null,
    setUserSelectedFiscalYear: () => { },
    isModalOpen: false,
    setModalOpen: () => { },
    action: false,
    setAction: () => { },
    isProcessing: false,
    setIsProcessing: () => { },
    handleMutation: () => { },
});

export const UserFiscalYearContextProvider = ({ children, entryMode = 'switch', selectedData = null }) => {
    const fiscalYearSwitchMutation = useStoreUserInitialValueMutation()
    const { data: userInitialValues } = useUserInitialValueDataContext()
    // console.log(userInitialValues?.find(x=>x.key==='fiscalYearId')?.value)
    const selectedFiscalYearId = userInitialValues?.find(x => x.key === 'fiscalYearId')?.value
    // console.log(userInitialValues,selectedFiscalYearId)
    const fetchedData = useFiscalYears()
    const mData = fetchedData.data?.data ?? [];

    const data = useMemo(() => [...mData], [mData]);

    const [isModalOpen, setModalOpen] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [action, _setAction] = useState(entryMode)
    const userSelectedFiscalYear =
        data?.find(z => z.id == selectedFiscalYearId)

    const setAction = (value) => {
        _setAction(value)

    }

    const handleMutation = async (values) => {
        console.log('out', fiscalYearSwitchMutation)
        if (fiscalYearSwitchMutation.isPending) {
            return

        }
        if (action === 'switch') {
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


    return (<UserFiscalYearContext value={
        {
            data, fetchedData,
            userSelectedFiscalYear,
            entryMode, action, setAction,
            handleMutation,
            isModalOpen, setModalOpen,
            isProcessing, setIsProcessing,
            fiscalYearSwitchMutation
        }
    }>
        {children}
    </UserFiscalYearContext>
    );
};

export default UserFiscalYearContextProvider;