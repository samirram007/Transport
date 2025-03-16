/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { capitalizeFirstLetter, fallbackText } from "@/lib/removeEmptyStrings";

import FormikEmptyModal from "@/components/form-components/FormikEmptyModal";
import { useFiscalYearContext } from "@/modules/FiscalYear/context/features/useFiscalYearContext";
import { Check, Loader2, Printer } from "lucide-react";
import moment from "moment";
import { useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdOutlineCloseFullscreen } from "react-icons/md";
import { TbCancel } from "react-icons/tb";
import { useReactToPrint } from "react-to-print";
import { useFeeContext } from "../contexts/features/useFeeContext";
import { useRiderSearchContext } from "../contexts/features/userRiderSearchContext";
import PrintToPdf from "../print/PrintToPdf";

const SearchRider = () => {
    const { setInitialFilterValues } = useRiderSearchContext();
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
    const { data, } = useRiderSearchContext()

    if (data.length === 0) {
        return <div>No record found</div>
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
    const [selectedMonths, setSelectedMonths] = useState([])
    return (
        <div key={rider.id} className="border-0 border-teal-600 dark:border-secondary  
                border-t-[1px] border-r-0 shadow dark:shadow-md shadow-teal-600 dark:shadow-secondary  rounded-lg p-4  ">
            <div className="flex items-start justify-between gap-3 border-b-2 border-slate-300 pb-2">
                <div>
                    <p className="text-lg font-semibold">{rider.name}</p>
                    <p className="text-slate-500 text-sm">{rider.school?.name} ({capitalizeFirstLetter(rider.schoolTime)})</p>
                    <div className="flex flex-col mt-2 text-slate-400 text-sm gap-1">
                        <div className="grid grid-cols-[50px_10px_1fr]">
                            <strong>Class</strong>
                            <span>:</span>
                            <div>{capitalizeFirstLetter(rider.standard)}</div>
                        </div>
                        <div className="grid grid-cols-[50px_10px_1fr]">
                            <strong>Roll</strong>
                            <span>:</span>
                            <div>{rider.rollNo}</div>
                        </div>
                        <div className="grid grid-cols-[50px_10px_1fr]">
                            <strong>Fee</strong>
                            <span>:</span>
                            <div>₹{rider.monthlyCharge}</div>
                        </div>
                    </div>
                </div>
                <Avatar className="shadow-lg w-14 h-14">
                    <AvatarImage src={rider.profileDocument?.path} alt={rider.name} />
                    <AvatarFallback>{fallbackText(rider.name)}</AvatarFallback>
                </Avatar>

            </div>
            <SaveFees rider={rider} selectedMonths={selectedMonths} setSelectedMonths={setSelectedMonths} />
            <MonthPanel fees={rider.fees} rider={rider} setSelectedMonths={setSelectedMonths} />
        </div>
    )
}

const MonthPanel = ({ fees, rider, setSelectedMonths }) => {
    const { selectedFiscalYear } = useFiscalYearContext()

    const fiscalYear = fees[0]?.fiscalYear ?? selectedFiscalYear
    // console.log(fees, fiscalYear);



    // console.log('SearchData', fees, rider, selectedFiscalYear)
    const yearName = fiscalYear?.name.slice(-2); // Extract last two characters safely

    const today = new Date();
    const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // Remove time

    const months = Array.from({ length: 12 }, (_, i) => {
        const monthId = i + 1;
        const feeEntry = rider.feeItemMonths?.some(feeItemMonth => feeItemMonth.monthId === monthId)
        console.log('Updated fee', feeEntry);
        // Extract isWaived if the fee exists for the month
        const isWaived = feeEntry
            ? rider.feeItemMonths?.some(feeItemMonth =>
                feeItemMonth.monthId === monthId && feeItemMonth.isWaived === true
            )
            : false;
        const nextMonthFirstDate = new Date(today.getFullYear(), monthId, 1);
        const nextMonthDateOnly = new Date(nextMonthFirstDate.getFullYear(), nextMonthFirstDate.getMonth(), nextMonthFirstDate.getDate());

        // Compare dates without time
        const isDue = todayDateOnly >= nextMonthDateOnly;  // Check if today is after or equal to the due date
        // console.log(isDue, monthId, nextMonthDateOnly, todayDateOnly);

        return {
            monthId,
            year: yearName, // Provided yearName
            name: new Date(0, i).toLocaleString("en", { month: "short" }), // Short month name
            isDue, // Add isDue flag
            ...(feeEntry && {
                paid: true, isWaived,
                feeDetails: rider.feeItemMonths?.find(feeItemMonth => feeItemMonth.monthId === monthId)
            }) // Attach fee details if found
        };
    });
    // console.log('months', months);

    return (
        <div className="flex flex-col flex-nowrap gap-1 mt-2 justify-between w-96">
            <div className="grid grid-cols-[20px_100px_80px__80px_1fr] items-center gap-2 border-b-4 border-b-slate-400">
                <div><Input type={'checkbox'} disabled /></div>
                <div>Month</div>
                <div>Amount</div>
                <div>Status</div>
                <div className="flex items-center justify-center">Action</div>
            </div>
            {months.map((month, index) => (

                <div key={index} className="grid grid-cols-[20px_100px_80px__80px_1fr] items-center gap-2 border-2 border-b-slate-400/50">
                    {
                        month.paid ?
                            <>
                                <div><Input type={'checkbox'} disabled checked={true} /></div>
                                <div>   {month.name + ' ' + month.year}</div>
                                <div>   {rider.monthlyCharge}</div>
                                <div>{month.isWaived ? 'Waived' : 'Paid'}</div>
                                <div className="flex items-center justify-center">

                                    {month.isWaived ?
                                        <div>
                                            <TbCancel className="text-2xl" />
                                        </div>
                                        :
                                        <PrintFees feeId={month.feeDetails?.feeId} />

                                    }
                                </div>

                            </>
                            :
                            <UnpaidPanel month={month} rider={rider} setSelectedMonths={setSelectedMonths} />
                    }
                </div>




            ))}
        </div>
    )
}
const PrintFees = ({ feeId }) => {
    const [isModalOpen, setModalOpen] = useState(false)
    const contentRef = useRef(null)
    const reactToPrintFn = useReactToPrint({ contentRef });
    const handleModalClose = () => {
        setModalOpen(false)

    }
    return (
        <>

            <Printer className="cursor-pointer" onClick={() => setModalOpen(true)} />
            {

                isModalOpen &&
                <FormikEmptyModal isModalOpen={isModalOpen} variant={'print-screen'}  >
                    <div className='w-full h-[90dvh] md:h-[90dvh] max-h-[90dvh]  
            grid grid-rows-[50px_1fr]  '>

                        <div className=' py-1 px-2  h-[50px]'>
                            <div className='flex items-center justify-between pb-1 border-b-2 border-slate-600/50' >
                                <div className='text-xl font-bold' >
                                    <div>Print Fees</div>
                                </div>

                                <div className='mb-3 mr-10  bottom-0 gap-4     right-0 flex items-center justify-end'>
                                    <button className='badge badge-error btn-outline bg-error text-slate-50    '
                                        onClick={() => reactToPrintFn()}>
                                        <Printer /> </button>
                                    <button onClick={handleModalClose} type="button"
                                        className='p-2 text-orange-500 rounded-full cursor-pointer bg-slate-50/5 hover:text-yellow-500 hover:bg-slate-600 active:text-orange-600 active:touch-pinch-zoom '>
                                        <MdOutlineCloseFullscreen className='text-xl transition ease-in-out delay-75 active:scale-90 ' />
                                    </button>

                                </div>


                            </div>
                        </div>

                        <PrintToPdf feeId={feeId} contentRef={contentRef} />

                    </div >
                </FormikEmptyModal>
            }
        </>
    )
}
const UnpaidPanel = ({ month, rider, setSelectedMonths }) => {
    const [isChecked, setIsChecked] = useState(false);

    const updateSelectedFee = (monthId, checked) => {
        setSelectedMonths(prev => {
            const updatedMonths = new Set(prev);
            if (checked) {
                updatedMonths.add(monthId); // Add if checked
            } else {
                updatedMonths.delete(monthId); // Remove if unchecked
            }
            return [...updatedMonths]; // Convert Set back to array
        });
    };
    return (
        <>
            <div>
                <label className="cursor-pointer">
                    <Input
                        type="checkbox"
                        className="peer hidden"
                        checked={isChecked}
                        onChange={(e) => {
                            setIsChecked(e.target.checked);
                            updateSelectedFee(month.monthId, e.target.checked);
                        }}
                    />
                    <span className="w-5 h-5 flex items-center justify-center rounded bg-slate-100 peer-checked:bg-green-500">
                        {isChecked && <Check size={16} className="font-bold" color="white" />}
                    </span>
                </label>
            </div>
            <div>   {month.name + ' ' + month.year}</div>
            <div>   {rider.monthlyCharge}</div>
            <div>{month.isDue ? 'Due' : ''}</div>
            <div></div>
            {/* <Button onClick={() => updateSelectedFee(month.monthId)} className="btn btn-sm btn-secondary  "><GiReceiveMoney /> </Button> */}

        </>
    )
}

const SaveFees = ({ rider, selectedMonths, setSelectedMonths }) => {
    const { handleMutation } = useFeeContext()


    const handleClick = () => {
        const payload = {
            feeDate: moment().format('YYYY-MM-DD'),
            riderId: rider.id,
            quantity: selectedMonths.length,
            months: selectedMonths,
            isWaived: false
        }
        // console.log(payload)
        handleMutation(payload, setSelectedMonths)
    }
    const handleWaived = () => {
        const payload = {
            feeDate: moment().format('YYYY-MM-DD'),
            riderId: rider.id,
            quantity: selectedMonths.length,
            months: selectedMonths,
            isWaived: true
        }
        // console.log(payload)
        handleMutation(payload, setSelectedMonths)
    }
    return (
        <div className="relative w-full">
            {/* {selectedMonths?.length} */}
            {
                selectedMonths?.length > 0 &&
                <div className="absolute right-0 top-[-40px] flex flex-row gap-2">
                    <Button onClick={handleWaived} className="bg-slate-500">Waived</Button>
                    <Button onClick={handleClick} className=" ">Save</Button>
                </div>
            }
        </div>

    )

}