import { useUserInitialValueDataContext } from "@/modules/UserInitialValue/context/features/useUserInitialValueDataContext";
import moment from "moment";
import { createContext, useMemo } from "react";
import { useRiders } from "../hooks/queries";



export const RiderDataContext = createContext({
    data: [],
    fetchedData: {},
});

export const RiderDataContextProvider = ({ children }) => {

    const { data: userInitialValuesData } = useUserInitialValueDataContext()
    // console.log(userInitialValuesData?.find(x=>x.key==='fiscalYearId')?.value)
    const initialValues = {
        fiscalYearId: userInitialValuesData?.find(x => x.key === 'fiscalYearId')?.value ?? moment(new Date()).format('YYYY'),
        name: '',
        isActive: false
    }

    const initialFilterValues = {
        filterOption: 'active'
    }


    const fetchedData = useRiders(initialFilterValues);
    const mData = fetchedData.data?.data ?? [];
    const data = useMemo(() => [...mData], [mData]);

    return (<RiderDataContext value={
        {
            data, fetchedData,
            initialFilterValues, initialValues
        }
    }>
        {children}
    </RiderDataContext>
    );
};

export default RiderDataContextProvider;