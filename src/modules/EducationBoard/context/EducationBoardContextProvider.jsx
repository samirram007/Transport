import moment from "moment";
import { createContext, useState } from "react";
import { useDeleteEducationBoardMutation, useStoreEducationBoardMutation, useUpdateEducationBoardMutation } from "../hooks/mutations";



export const EducationBoardContext = createContext({
    data: [],
    fetchedData: {},
    selectedEducationBoard: null,
    setSelectedEducationBoard: () => { },
    isModalOpen: false,
    setModalOpen: () => { },
    action: false,
    setAction: () => { },
    isProcessing: false,
    setIsProcessing: () => { },
    handleMutation: () => { },
});

export const EducationBoardContextProvider = ({ children, entryMode = 'create', selectedData = null }) => {
    const educationBoardStoreMutation = useStoreEducationBoardMutation()
    const educationBoardUpdateMutation = useUpdateEducationBoardMutation()
    const educationBoardDeleteMutation = useDeleteEducationBoardMutation()
    const [isModalOpen, setModalOpen] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [action, _setAction] = useState(entryMode)
    const [selectedEducationBoard, setSelectedEducationBoard] = useState(selectedData ?? {
        name: 'New Board',
        code: '',
        addressId: null,
        description: '',
        contactNo: '',
        email: '',
        website: '',
        establishmentDate: moment(new Date()).format('YYYY-MM-DD'),
        logoImageId: null, 

    });
    const setAction = (value) => {
        _setAction(value)

    }

    const handleMutation = async (values) => {

        if (action === 'create') {
            educationBoardStoreMutation.mutateAsync(values)
        } else if (action === 'edit') {
            educationBoardUpdateMutation.mutateAsync(values).then(() => {
                setModalOpen(false)
                // setSelectedEducationBoardType(values)
            })
        } else if (action === 'delete') {
            educationBoardDeleteMutation.mutateAsync(values)
                .then(() => {
                    setModalOpen(false)
                    // setSelectedEducationBoardType(values)
                })
        }
        else {
            console.info('Invalid entry mode')
        }
        return Promise.resolve()
    }
    return (<EducationBoardContext value={
        {
            selectedEducationBoard, setSelectedEducationBoard,
            entryMode, action, setAction,
            handleMutation,
            isModalOpen, setModalOpen,
            isProcessing, setIsProcessing,
        }
    }>
        {children}
    </EducationBoardContext>
    );
};

export default EducationBoardContextProvider;