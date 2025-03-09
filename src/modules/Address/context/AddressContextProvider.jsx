import { createContext, useState } from "react";
import { useDeleteAddressMutation, useStoreAddressMutation, useUpdateAddressMutation } from "../hooks/mutations";



export const AddressContext = createContext({
    data: [],
    fetchedData: {},
    selectedAddress: null,
    setSelectedAddress: () => { },
    isModalOpen: false,
    setModalOpen: () => { },
    action: false,
    setAction: () => { },
    isProcessing: false,
    setIsProcessing: () => { },
    handleMutation: () => { },
});

export const AddressContextProvider = ({ children, entryMode = 'create', selectedData = null }) => {
    const addresssStoreMutation = useStoreAddressMutation()
    const addresssUpdateMutation = useUpdateAddressMutation()
    const addresssDeleteMutation = useDeleteAddressMutation()
    const [isModalOpen, setModalOpen] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [action, _setAction] = useState(entryMode)
    const [selectedAddress, setSelectedAddress] = useState(selectedData ?? {
        AddressLine1: 'New Address',
        AddressLine2: '',
        userId: null, 
        addresssType: 'current', 
        houseNo: '', 
        city:'',
        village:'',
        postOffice:'',
        railStation:'',
        policeStation:'',
        district:'',
        stateId:1,
        countryId:1,
        pincode:'',
        longitude:'',
        latitude:'',
    });
    const setAction = (value) => {
        _setAction(value)

    }

    const handleMutation = async (values) => {

        if (action === 'create') {
            addresssStoreMutation.mutateAsync(values)
        } else if (action === 'edit') {
            addresssUpdateMutation.mutateAsync(values).then(() => {
                setModalOpen(false)
                // setSelectedAddress(values)
            })
        } else if (action === 'delete') {
            addresssDeleteMutation.mutateAsync(values)
            .then(() => {
                setModalOpen(false)
                // setSelectedAddress(values)
            })
        }
        else {
            console.info('Invalid entry mode')
        }
        return Promise.resolve()
    }
    return (<AddressContext value={
        {
            selectedAddress, setSelectedAddress,
            entryMode, action,setAction,
            handleMutation,
            isModalOpen, setModalOpen,
            isProcessing, setIsProcessing,
        }
    }>
        {children}
    </AddressContext>
    );
};

export default AddressContextProvider;