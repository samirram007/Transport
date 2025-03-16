import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useCallback, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { TbFilterSearch } from "react-icons/tb";
import { Breadcrumb } from '@/components/Breadcrumb';
import FormikEmptyModal from '@/components/form-components/FormikEmptyModal';
import { useProfile } from '@/modules/Auth/hooks/useProfile';
import { Loader2 } from 'lucide-react';
import { CiSearch } from 'react-icons/ci';
import { MdOutlineAddCircleOutline, MdOutlineCloseFullscreen } from 'react-icons/md';
import { useExpenseDataContext } from '../contexts/features/useExpenseDataContext';
import Filter from './Filter';

export const Icons = {
    spinner: Loader2,
};
export default function FilterTable({ columns, pageSize = 100,
    mobileHeaders = ['id', 'name'], }) {

    const { fetchedData, dataDisplay } = useExpenseDataContext()

    const [sorting, setSorting] = useState([{ id: 'expenseNo', desc: true }])
    const [filtering, setFiltering] = useState('')

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: pageSize,
    })
    const table = useReactTable({
        data: fetchedData.data?.data ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: sorting,
            globalFilter: filtering,
            pagination: pagination,
            columnVisibility: {
                id: false,
                expenseNo: false,
                expenseDate: false,
                rider: false,
                school: false,
                fiscalYear: false,
            }
        },
        manualPagination: false,
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        onPaginationChange: setPagination,
    })

    return (
        <div className='bg-transparent rounded-lg '>

            <HeaderContainer table={table} filtering={filtering} setFiltering={setFiltering} />
            {/* <FilterDisplayPanel /> */}
            {dataDisplay == 'grid' ?

                <GridContainer table={table} />
                :
                <div className='grid max-w-dvw overflow-x-scroll  max-w-[92vw]   md:max-w-[96vw]'>

                    <TableContainer table={table} />
                </div>
            }
            <FooterContainer table={table} />

        </div>

    )
}
const HeaderContainer = ({ table, filtering, setFiltering }) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [isSearching, setSearching] = useState(false)
    const handleSearching = (e) => {

        if (!isSearching) {
            setSearching(true)
            setTimeout(() => {
                setFiltering(e.target.value)
                setSearching(false)
            }, 1000);
        }

    }
    const updateSearchParams = useCallback(() => {
        setSearchParams({
            page: table.getState().pagination.pageIndex + 1,
            limit: table.getState().pagination.pageSize,
        });
    }, [table.getState().pagination.pageIndex, table.getState().pagination.pageSize]);

    // useEffect(() => {
    //     updateSearchParams();
    // }, [updateSearchParams]);
    return (
        <>
            <div className='flex flex-col justify-between gap-2 row md:flex-row '>

                <div className=' grid grid-cols-1 md:grid-cols-[350px_1fr] w-full gap-2  '>
                    <div className="">
                        <Breadcrumb pageName="expenses" parentName="Settings" type={"box"} />
                    </div>
                    <div className='grid grid-cols-[1fr_100px] gap-2'>
                        <div className='flex items-center justify-end '>
                            <div className='w-full md:w-100 h-[2.5rem] grid grid-cols-[40px_1fr_30px]  justify-between items-center   border-slate-500   border-2  rounded-full  '>

                                <div>
                                    <CiSearch className='ml-2 text-2xl text-blue-400 md:ml-4' />
                                </div>
                                <div>

                                    <input
                                        type='text'
                                        defaultValue={filtering}
                                        onChange={handleSearching}
                                        className='pt-0 pb-1 pl-2 bg-transparent outline-none text-md md:text-xl line-clamp-1 placeholder:text-slate-500'
                                        placeholder='Type to search...'
                                    />
                                </div>
                                {isSearching ? <div> <Icons.spinner className="mr-4 text-2xl text-blue-600 animate-spin" /></div> : ''
                                }
                            </div>
                        </div>

                        <div className='flex items-center justify-end gap-2'  >
                            <CollectionButton />
                            {/* <ExpenseContextProvider>
                                <Create />
                            </ExpenseContextProvider> */}
                            <FilterButton />
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

const CollectionButton = () => {
    const userProfile = useProfile()
    return (
        <Link to={`/${userProfile.data?.data?.role}/expenses/process`} title='Create new'
            className="  ">
            <MdOutlineAddCircleOutline className='text-5xl text-teal-600 transition-all duration-500 ease-in-out cursor-pointer active:text-teal-300 active:scale-150 hover:text-teal-800' /></Link>
    )
}
const GridContainer = ({ table }) => {
    return (
        <div className="py-6 overflow-y-auto table-responsive ">

            <div className='grid items-center justify-center w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-cols-max '
            >
                {table.getRowModel().rows.map(row => (
                    row.getVisibleCells().map(cell => (

                        <div key={cell.id} className={` flex   justify-center items-center gap-6 `} >

                            {
                                flexRender(cell.column.columnDef.cell, cell.getContext())
                            }
                        </div>
                    ))

                ))}
            </div>


        </div>)
}
const TableContainer = ({ table }) => {
    return (
        <div className="py-6   ">

            <div className='flex flex-col items-center justify-center w-full gap-2   overflow-x-scroll'
            >
                <div className='md:w-full'>

                    <div className='grid  grid-cols-[200px_200px_200px_1fr_1fr] gap-1   font-bold border-b-4 bg-slate-500/50 rounded-md pl-2'>

                        <div>Expense No</div>
                        <div>Date</div>
                        <div>Amount</div>
                        <div>Note</div>
                        <div className='text-center'>Action</div>
                    </div>
                </div>
                {table.getRowModel().rows.map((row, i) => (
                    <div key={i} className='md:w-full'>


                        {row.getVisibleCells().map(cell => (

                            <div key={cell.id} className={`grid  grid-cols-[200px_200px_200px_1fr_1fr]  border-2 gap-1 `} >

                                {
                                    flexRender(cell.column.columnDef.cell, cell.getContext())
                                }
                            </div>
                        ))}
                    </div>

                ))}
            </div>


        </div>)
}
const FooterContainer = ({ table }) => {
    return (
        <div className='flex flex-col justify-between gap-2 mt-6 row md:flex-row'>
            {/* <div className='flex flex-row flex-1 gap-2 text-lg'>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()} pages
        </div> */}
            <div className='flex flex-row flex-1 gap-2 text-lg'>
                No. of record(s) : {table.getRowCount()}
            </div>
            <div className='flex flex-row flex-1 gap-2'>

            </div>

        </div>
    )
}
export const FilterButton = () => {
    const [showFilter, setShowFilter] = useState(false)
    const handleSwitchFilter = () => {

        setShowFilter(prev => !prev)
    }
    const handleModalClose = () => {
        setShowFilter(prev => false)
    }
    return (
        <>

            <button onClick={handleSwitchFilter}
                className={` cursor-pointer border-4 p-[2px] rounded-full border-teal-600  `}>
                <TbFilterSearch className='text-3xl text-teal-600 transition-all duration-500 ease-in-out cursor-pointer active:text-teal-300 active:scale-150 hover:text-teal-800' />
            </button>
            {showFilter &&
                <>


                    <FormikEmptyModal isModalOpen={showFilter} variant={'semi'}  >
                        <div className='w-full h-full   max-h-[90dvh]  
                    grid grid-rows-[50px_1fr] border-4 border-warning/30 rounded-md '>

                            <div className=' py-1 px-2  h-[50px]'>
                                <div className='flex items-center justify-between pb-1 border-b-2 border-slate-600/50' >
                                    <div className='text-xl font-bold' >
                                        <div className='inline-flex items-center justify-center gap-2 text-warning'> <TbFilterSearch /> Rider Record Filter</div>
                                    </div>
                                    <button onClick={handleModalClose} type="button"
                                        className='p-2 text-orange-500 rounded-full cursor-pointer bg-slate-50/5 hover:text-yellow-500 hover:bg-slate-600 active:text-orange-600 active:touch-pinch-zoom '>
                                        <MdOutlineCloseFullscreen className='text-xl transition ease-in-out delay-75 active:scale-90 ' />
                                    </button>
                                </div>
                            </div>
                            <Filter handleModalClose={handleModalClose} />

                        </div >
                    </FormikEmptyModal>
                </>

            }

        </>

    )
}


