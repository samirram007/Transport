import { useStoreUserInitialValueMutation } from "@/modules/UserInitialValue/hooks/mutations";
import moment from "moment";
import { createContext, useState } from "react";
import { useDeleteAcademicClassMutation, useStoreAcademicClassMutation, useUpdateAcademicClassMutation } from "../hooks/mutations";



export const AcademicClassContext = createContext({

    selectedAcademicClass: null,
    setSelectedAcademicClass: () => { },
    
    isModalOpen: false,
    setModalOpen: () => { },
    action: false,
    setAction: () => { },
    isProcessing: false,
    setIsProcessing: () => { },
    handleMutation: () => { },
});

export const AcademicClassContextProvider = ({ children, entryMode = 'create', selectedData = null }) => {
    const academicClassStoreMutation = useStoreAcademicClassMutation()
    const academicClassUpdateMutation = useUpdateAcademicClassMutation()
    const academicClassDeleteMutation = useDeleteAcademicClassMutation()
    const academicClassSwitchMutation = useStoreUserInitialValueMutation()
    const [isModalOpen, setModalOpen] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [action, _setAction] = useState(entryMode)
     
    const [selectedAcademicClass, setSelectedAcademicClass] = useState(selectedData ?? {
        class: moment(new Date()).format('YYYY'),
        startDate: moment(new Date()).format('YYYY-MM-DD'),
        endDate: moment(new Date()).format('YYYY-MM-DD'),
        previousAcademicClassId:null,
        nextAcademicClassId:null,
        isCurrent: false,

    });
    const setAction = (value) => {
        _setAction(value)

    }

    const handleMutation = async (values) => {

        if (action === 'create') {
            academicClassStoreMutation.mutateAsync(values)
        } else if (action === 'edit') {
            academicClassUpdateMutation.mutateAsync(values).then(() => {
                setModalOpen(false)
                // setSelectedAcademicClass(values)
            })
        } else if (action === 'delete') {
            academicClassDeleteMutation.mutateAsync(values)
                .then(() => {
                    setModalOpen(false)
                    // setSelectedAcademicClass(values)
                }) 
        } else if (action === 'switch') {
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
    return (<AcademicClassContext value={
        {
            selectedAcademicClass, setSelectedAcademicClass,
            entryMode, action, setAction,
            handleMutation,
            isModalOpen, setModalOpen,
            isProcessing, setIsProcessing,
        }
    }>
        {children}
    </AcademicClassContext>
    );
};

export default AcademicClassContextProvider;