import { useFeeSessions } from "@/modules/FeeSession/hooks/queries";
import { createContext, useMemo } from "react";
import { useFeeContext } from "./features/useFeeContext";



export const FeeSessionContext = createContext({
    data: [],
    fetchedData: {},
});

export const FeeSessionContextProvider = ({ children }) => {
    const { selectedFee } = useFeeContext()
    const fetchedData = useFeeSessions(selectedFee?.id);
    const mData = fetchedData.data?.data ?? [];

    const data = useMemo(() => [...mData], [mData]);
    return (<FeeSessionContext value={
        {
            data: feeSessionData, fetchedData
        }
    }>
        {children}
    </FeeSessionContext>
    );
};

export default FeeSessionContextProvider;