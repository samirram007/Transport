import { useUserInitialValueDataContext } from "@/modules/UserInitialValue/context/features/useUserInitialValueDataContext";
import { useStoreUserInitialValueMutation } from "@/modules/UserInitialValue/hooks/mutations";
import { createContext, useMemo, useState } from "react";
import { useAcademicClasses } from "../hooks/queries";



export const UserAcademicClassContext = createContext({

    selectedAcademicClass: null,
    setSelectedAcademicClass: () => { },
    userSelectedAcademicClass: null,
    setUserSelectedAcademicClass: () => { },
    isModalOpen: false,
    setModalOpen: () => { },
    action: false,
    setAction: () => { },
    isProcessing: false,
    setIsProcessing: () => { },
    handleMutation: () => { },
});

export const UserAcademicClassContextProvider = ({ children, entryMode = 'switch', selectedData = null }) => {
    const academicClassSwitchMutation = useStoreUserInitialValueMutation()
    const { data: userInitialValues } = useUserInitialValueDataContext()
    // console.log(userInitialValues?.find(x=>x.key==='academicClassId')?.value)
    const selectedAcademicClassId = userInitialValues?.find(x => x.key === 'academicClassId')?.value
    // console.log(userInitialValues,selectedAcademicClassId)
    const fetchedData = useAcademicClasses()
    const mData = fetchedData.data?.data ?? [];

    const data = useMemo(() => [...mData], [mData]);

    const [isModalOpen, setModalOpen] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [action, _setAction] = useState(entryMode)
    const userSelectedAcademicClass =
        data?.find(z => z.id == selectedAcademicClassId)

    const setAction = (value) => {
        _setAction(value)

    }

    const handleMutation = async (values) => { 
        if (academicClassSwitchMutation.isPending) {
            return
        }
        if (action === 'switch') {
            academicClassSwitchMutation.mutateAsync(values)
                .then(() => {
                     setModalOpen(false)
                    // setSelectedAcademicClass(values)
                })
        }
        else {
            console.info('Invalid entry mode')
        }
        return Promise.resolve()
    }


    return (<UserAcademicClassContext value={
        {
            data, fetchedData,
            userSelectedAcademicClass,
            entryMode, action, setAction,
            handleMutation,
            isModalOpen, setModalOpen,
            isProcessing, setIsProcessing,
            academicClassSwitchMutation
        }
    }>
        {children}
    </UserAcademicClassContext>
    );
};

export default UserAcademicClassContextProvider;