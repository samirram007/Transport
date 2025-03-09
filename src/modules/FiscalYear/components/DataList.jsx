
import { useFiscalYears } from '../hooks/queries';
import DataTable from './DataTable';

const DataList = () => {
    const fetchedData = useFiscalYears()
    // const mData = fetchedData.data?.data ?? []; 
    return (
        <>
            <div className="flex flex-col w-full overflow-y-auto justify-stretch">
                <div className="motion-translate-x-in-[22%] motion-translate-y-in-[0%] motion-opacity-in-[0%] motion-blur-in-[30px] motion-duration-[0.94s]/opacity motion-ease-out-cubic motion-duration-300 ">

                    <DataTable />
                </div>
            </div>
        </>
    )
}
export default DataList