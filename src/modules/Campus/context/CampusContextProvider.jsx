import moment from "moment";
import { createContext, useState } from "react";
import { useDeleteCampusMutation, useStoreCampusMutation, useUpdateCampusMutation } from "../hooks/mutations";



export const CampusContext = createContext({
    data: [],
    fetchedData: {},
    selectedCampus: null,
    setSelectedCampus: () => { },
    isModalOpen: false,
    setModalOpen: () => { },
    action: false,
    setAction: () => { },
    isProcessing: false,
    setIsProcessing: () => { },
    handleMutation: () => { },
});

export const CampusContextProvider = ({ children, entryMode = 'create', selectedData = null }) => {
    const campusestoreMutation = useStoreCampusMutation()
    const campusUpdateMutation = useUpdateCampusMutation()
    const campusDeleteMutation = useDeleteCampusMutation()
    const [isModalOpen, setModalOpen] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [action, _setAction] = useState(entryMode)
    const [selectedCampus, setSelectedCampus] = useState(selectedData ?? {
        name: 'New Campus',
        code: '',
        addressId: null, 
        contactNo: '',
        email: '',
        website: '',
        establishmentDate: moment(new Date()).format('YYYY-MM-DD'),
        logoImageId: null,
        schoolId: 1,
        educationBoardId: 1,
        openingTime:null,
        closingTime: 1,

    });
    const setAction = (value) => {
        _setAction(value)

    }

    const handleMutation = async (values) => {

        if (action === 'create') {
            campusestoreMutation.mutateAsync(values)
        } else if (action === 'edit') {
            campusUpdateMutation.mutateAsync(values).then(() => {
                setModalOpen(false)
                // setSelectedCampus(values)
            })
        } else if (action === 'delete') {
            campusDeleteMutation.mutateAsync(values)
            .then(() => {
                setModalOpen(false)
                // setSelectedCampus(values)
            })
        }
        else {
            console.info('Invalid entry mode')
        }
        return Promise.resolve()
    }
    return (<CampusContext value={
        {
            selectedCampus, setSelectedCampus,
            entryMode, action,setAction,
            handleMutation,
            isModalOpen, setModalOpen,
            isProcessing, setIsProcessing,
        }
    }>
        {children}
    </CampusContext>
    );
};

export default CampusContextProvider;