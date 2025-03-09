import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { capitalizeFirstLetter, fallbackText } from "@/lib/removeEmptyStrings";

import { useFiscalYearContext } from "@/modules/FiscalYear/context/features/useFiscalYearContext";
import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useFeeContext } from "../contexts/features/useFeeContext";
import { useRiderSearchContext } from "../contexts/features/userRiderSearchContext";

const SearchRider = () => {
    const { initialFilterValues, setInitialFilterValues } = useRiderSearchContext();
    const [isSearching, setSearching] = useState(false)
    const searchTextRef = useRef(null)
    const handleSearching = () => {

        if (!isSearching) {
            setSearching(true)
            setTimeout(() => {
                setInitialFilterValues(prev => ({ ...prev, text: searchTextRef.current.value }))
                setSearching(false)
            }, 1000);
        }

    }

    return (
        <>
            <div className="flex flex-col items-center justify-start max-h-[inherit] h-full overflow-hidden  ">
                <div className="flex items-center gap-4 border-b-2 border-blue-300/30 px-4 pb-2 mb-2">
                    <div className='w-full md:w-100 h-[2.5rem] grid grid-cols-[40px_1fr_40px]  justify-between items-center   border-slate-500   border-2  rounded-full  '>

                        <div>
                            <CiSearch className='ml-2 text-2xl text-blue-400 md:ml-4' />
                        </div>
                        <Input
                            ref={searchTextRef}
                            name="search"
                            onChange={handleSearching}
                            defaultValue={'s '}
                            autoFocus
                            placeholder="Enter Rider Name"
                            autoComplete="off"
                            className="   p-2 border-0 bg-transparent outline-none rounded-md shadow-sm 
                                    active:outline-none active:shadow-none active:ring-0 
                                    focus:outline-none focus:shadow-none focus:ring-0 
                                    focus-visible:outline-none focus-visible:shadow-none 
                                    focus-visible:ring-0 "
                        />
                        {isSearching ? <Loader2 className="mr-4 text-2xl text-blue-600 animate-spin" /> : ''
                        }
                    </div>
                    <Button onClick={handleSearching} className="btn btn-outline-primary  btn-sm rounded-full">Search</Button>
                </div>
                <RiderList />

            </div>
        </>
    )
}
export default SearchRider

const RiderList = () => {
    const { data, initialFilterValues } = useRiderSearchContext()

    if (data.length === 0) {
        return <p>No record found</p>
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 overflow-y-auto ">
            {data?.map((rider) => (
                <RiderFeesCard key={rider.id} rider={rider} />
            ))}
        </div>

    )
}

const RiderFeesCard = ({ rider }) => {

    return (
        <div key={rider.id} className="border-0 border-teal-600 dark:border-secondary  
                border-t-[1px] border-r-0 shadow dark:shadow-md shadow-teal-600 dark:shadow-secondary  rounded-lg p-4  ">
            <div className="flex items-start justify-between gap-3 border-b-2 border-slate-300 pb-2">
                <div>
                    <p className="text-lg font-semibold">{rider.name}</p>
                    <p className="text-slate-500 text-sm">{rider.school?.name}</p>
                    <div className="flex flex-col mt-2 text-slate-400 text-sm gap-1">
                        <p className="grid grid-cols-[50px_10px_1fr]">
                            <strong>Class</strong>
                            <span>:</span>
                            <div>{capitalizeFirstLetter(rider.standard)}</div>
                        </p>
                        <p className="grid grid-cols-[50px_10px_1fr]">
                            <strong>Roll</strong>
                            <span>:</span>
                            <div>{rider.rollNo}</div>
                        </p>
                        <p className="grid grid-cols-[50px_10px_1fr]">
                            <strong>Fee</strong>
                            <span>:</span>
                            <div>₹{rider.monthlyCharge}</div>
                        </p>
                    </div>
                </div>
                <Avatar className="shadow-lg w-14 h-14">
                    <AvatarImage src={rider.profileDocument?.path} alt={rider.name} />
                    <AvatarFallback>{fallbackText(rider.name)}</AvatarFallback>
                </Avatar>

            </div>

            <MonthPanel fees={rider.fees} rider={rider} />
        </div>
    )
}

const MonthPanel = ({ fees, rider }) => {
    const { selectedFiscalYear } = useFiscalYearContext()
    const { setSelectedRider, selectedFee, setSelectedFee } = useFeeContext()
    const fiscalYear = fees[0]?.fiscalYear ?? selectedFiscalYear
    // console.log(fees, fiscalYear);

    const updateSelectedFee = (month) => {
        setSelectedRider(rider);
        setSelectedFee(prev => {
            // Check if the month already exists in feeMonths
            const monthExists = prev.feeItemMonths.some(fee => fee.monthId === month.monthId);

            return {
                ...prev,
                riderId: rider.Id,
                riderSnapshotId: rider.riderSnapshotId,
                feeMonths: monthExists
                    ? prev.feeMonths.map(fee =>
                        fee.monthId === month.monthId
                            ? { ...fee, amount: parseFloat(rider.monthlyCharge) } // Update amount if month exists
                            : fee
                    )
                    : [...prev.feeMonths, { yearId: fiscalYear?.id, monthId: month.monthId, amount: parseFloat(rider.monthlyCharge) }]
            };
        });

    };
    console.log('Updated fee', selectedFee);
    // console.log('SearchData', fees, rider, selectedFiscalYear)
    const yearName = fiscalYear?.name.slice(-2); // Extract last two characters safely

    const months = Array.from({ length: 12 }, (_, i) => {
        const monthId = i + 1;
        console.log('months', fees);

        const monthExists = fees.feeItemMonths.some(feeItemMonth => feeItemMonth.monthId === monthId);

        return {
            monthId,
            yearId: yearName, // Provided yearName
            name: new Date(0, i).toLocaleString("en", { month: "short" }), // Short month name
            ...(monthExists && { paid: true }) // Add 'paid: true' only if monthId exists in fees
        };
    });
    return (
        <div className="flex flex-wrap gap-1 mt-2 justify-between">
            {months.map((month, index) => (
                month.paid ?
                    <Button key={index} onClick={() => updateSelectedFee(month)} className="btn btn-sm btn-primary w-20">{month.name + ' ' + month.yearId}</Button>
                    :
                    <Button key={index} onClick={() => updateSelectedFee(month)} className="btn btn-sm btn-secondary w-20">{month.name + ' ' + month.yearId}</Button>


            ))}
        </div>
    )
}