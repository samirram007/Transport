import moment from "moment";
import { createContext, useState } from "react";
import { useDeleteSchoolMutation, useStoreSchoolMutation, useUpdateSchoolMutation } from "../hooks/mutations";



export const SchoolContext = createContext({
    
    selectedSchool: null,
    setSelectedSchool: () => { },
    isModalOpen: false,
    setModalOpen: () => { },
    action: false,
    setAction: () => { },
    isProcessing: false,
    setIsProcessing: () => { },
    handleMutation: () => { },
});

export const SchoolContextProvider = ({ children, entryMode = 'create', selectedData = null }) => {
    const schoolStoreMutation = useStoreSchoolMutation()
    const schoolUpdateMutation = useUpdateSchoolMutation()
    const schoolDeleteMutation = useDeleteSchoolMutation()
    const [isModalOpen, setModalOpen] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [action, _setAction] = useState(entryMode)
    const [selectedSchool, setSelectedSchool] = useState(selectedData ?? {
        name: 'New Student',
        code: '',
        addressId: null,
        description: '',
        contactNo: '',
        email: '',
        website: '',
        establishmentDate: moment(new Date()).format('YYYY-MM-DD'),
        logoImageId: null,
        schoolTypeId: 1,
        educationBoardId: 1,

    });
    const setAction = (value) => {
        _setAction(value)

    }

    const handleMutation = async (values) => {

        if (action === 'create') {
            schoolStoreMutation.mutateAsync(values)
        } else if (action === 'edit') {
            schoolUpdateMutation.mutateAsync(values).then(() => {
                setModalOpen(false)
                // setSelectedSchool(values)
            })
        } else if (action === 'delete') {
            schoolDeleteMutation.mutateAsync(values)
            .then(() => {
                setModalOpen(false)
                // setSelectedSchool(values)
            })
        }
        else {
            console.info('Invalid entry mode')
        }
        return Promise.resolve()
    }
    return (<SchoolContext value={
        {
            selectedSchool, setSelectedSchool,
            entryMode, action,setAction,
            handleMutation,
            isModalOpen, setModalOpen,
            isProcessing, setIsProcessing,
        }
    }>
        {children}
    </SchoolContext>
    );
};

export default SchoolContextProvider;