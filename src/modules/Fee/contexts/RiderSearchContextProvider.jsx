import { createContext, useMemo, useState } from "react";
import { useSearchRiderForFees } from "../hooks/queries";


export const RiderSearchContext = createContext({
    data: [],
    fetchedData: {},
    selectedRider: null,
    setSelectedRider: () => { },
    initialFilterValues: {},
    setInitialFilterValues: () => { },
    initialValues: {}
});

export const RiderSearchContextProvider = ({ children }) => {

    const initialValues = {
        text: ''
    }
    const [selectedRider, setSelectedRider] = useState(null);
    // console.log(userInitialValuesData)
    // console.log(userInitialValuesData?.find(x=>x.key==='fiscalYearId')?.value)

    const [initialFilterValues, setInitialFilterValues] = useState(initialValues);



    const fetchedData = useSearchRiderForFees(initialFilterValues);

    const mData = fetchedData.data?.data ?? [];
    const data = useMemo(() => [...mData], [mData]);

    return (<RiderSearchContext value={
        {
            data, fetchedData,
            initialFilterValues, setInitialFilterValues, initialValues, selectedRider, setSelectedRider
        }
    }>
        {children}
    </RiderSearchContext>
    );
};

export default RiderSearchContextProvider;