import { useUserInitialValueDataContext } from "@/modules/UserInitialValue/context/features/useUserInitialValueDataContext";
import moment from "moment";
import { createContext, useMemo, useState } from "react";

import { useExpenses } from "../hooks/queries";

export const ExpenseDataContext = createContext({
    data: [],
    fetchedData: {},
});

export const ExpenseDataContextProvider = ({ children }) => {

    const { data: userInitialValuesData } = useUserInitialValueDataContext()
    // console.log(userInitialValuesData)
    // console.log(userInitialValuesData?.find(x=>x.key==='fiscalYearId')?.value)
    const initialValues = {
        fiscalYearId: userInitialValuesData?.find(x => x.key === 'fiscalYearId')?.value ?? moment(new Date()).format('YYYY'),
    }
    const dataDisplay = userInitialValuesData?.find(x => x.key === 'dataDisplay')?.value ?? 'grid'

    const [initialFilterValues, setInitialFilterValues] = useState({
        fiscalYearId: initialValues.fiscalYearId,
        from: moment().startOf('month').format('YYYY-MM-DD'),
        to: moment().format('YYYY-MM-DD')
    }
    );


    const fetchedData = useExpenses(initialFilterValues);
    //console.log(fetchedData);

    const mData = fetchedData.data?.data ?? [];
    const data = useMemo(() => [...mData], [mData]);

    return (<ExpenseDataContext value={
        {
            data, fetchedData, dataDisplay,
            initialFilterValues, setInitialFilterValues, initialValues
        }
    }>
        {children}
    </ExpenseDataContext>
    );
};

export default ExpenseDataContextProvider;