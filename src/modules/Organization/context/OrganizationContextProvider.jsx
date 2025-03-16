import moment from "moment";
import { createContext, useState } from "react";
import { useDeleteOrganizationMutation, useStoreOrganizationMutation, useUpdateOrganizationMutation } from "../hooks/mutations";



export const OrganizationContext = createContext({

    selectedOrganization: null,
    setSelectedOrganization: () => { },
    isModalOpen: false,
    setModalOpen: () => { },
    action: false,
    setAction: () => { },
    isProcessing: false,
    setIsProcessing: () => { },
    handleMutation: () => { },
});

export const OrganizationContextProvider = ({ children, entryMode = 'create', selectedData = null }) => {
    const organizationStoreMutation = useStoreOrganizationMutation()
    const organizationUpdateMutation = useUpdateOrganizationMutation()
    const organizationDeleteMutation = useDeleteOrganizationMutation()
    const [isModalOpen, setModalOpen] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [action, _setAction] = useState(entryMode)
    const [selectedOrganization, setSelectedOrganization] = useState(selectedData ?? {
        name: 'New Organization',
        code: '',
        addressId: null,
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
            organizationStoreMutation.mutateAsync(values)
        } else if (action === 'edit') {
            organizationUpdateMutation.mutateAsync(values).then(() => {
                setModalOpen(false)
                // setSelectedOrganization(values)
            })
        } else if (action === 'delete') {
            organizationDeleteMutation.mutateAsync(values)
                .then(() => {
                    setModalOpen(false)
                    // setSelectedOrganization(values)
                })
        }
        else {
            console.info('Invalid entry mode')
        }
        return Promise.resolve()
    }
    return (<OrganizationContext value={
        {
            selectedOrganization, setSelectedOrganization,
            entryMode, action, setAction,
            handleMutation,
            isModalOpen, setModalOpen,
            isProcessing, setIsProcessing,
        }
    }>
        {children}
    </OrganizationContext>
    );
};

export default OrganizationContextProvider;