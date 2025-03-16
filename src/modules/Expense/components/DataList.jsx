/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */



import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import ExpenseDataContextProvider from "../contexts/ExpenseDataContextProvider";
import { useExpenseDataContext } from "../contexts/features/useExpenseDataContext";
import DataTable from "./DataTable";







export default function DataList() {

    return (
        <>
            <div className="flex flex-col w-full overflow-y-auto justify-stretch">
                <div className="motion-translate-x-in-[22%] motion-translate-y-in-[0%] motion-opacity-in-[0%] motion-blur-in-[30px] motion-duration-[0.94s]/opacity motion-ease-out-cubic motion-duration-300 ">

                    <ExpenseDataContextProvider>
                        <DataTableCall />
                    </ExpenseDataContextProvider>

                </div>
            </div>
        </>
    )
}

const DataTableCall = () => {
    const { fetchedData } = useExpenseDataContext()


    // if (fetchedData.isPending) {
    //     return <Loader className="animate-spin" />
    // }
    // if (fetchedData.isError) {
    //     return <div className="text-6xl">Loading Failed</div>
    // }

    return (
        <>
            <Suspense fallback={<Toaster>Loading...</Toaster>}>
                <DataTable />
            </Suspense>
        </>
    )
}
