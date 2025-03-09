import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router';




import { TbFilterSearch } from "react-icons/tb";



// import { useCustomRoutes } from '@/hooks/useCustomRoutes';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import { Loader, Loader2 } from 'lucide-react';
import { CiSearch } from 'react-icons/ci';
import { VehicleTypeContextProvider } from '../context/VehicleTypeContextProvider';
import { useVehicleTypes } from '../hooks/queries';
import Create from './Create';


export const Icons = {
    spinner: Loader2,
};
export default function FilterTable({ columns, pageSize = 100,
    mobileHeaders = ['id', 'name'] }) {
    const fetchedData = useVehicleTypes()
    // const mData = fetchedData.data?.data ?? [];

    //   const data = useMemo(() => [...mData], [mData]);

    const [sorting, setSorting] = useState([])
    const [filtering, setFiltering] = useState('')

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: pageSize,
    })
    const table = useReactTable({
        data: fetchedData.data?.data,
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
                id: false, //replace `id` with your column identifier
                name: false,

            }
        },
        manualPagination: false,
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        onPaginationChange: setPagination,
    })


    if (fetchedData.isPending) {
        return <Loader className='animate-spin ' />
    }
    if (fetchedData.isError) {
        return <Loader className='animate-spin ' />
    }
    return (
        <div className='bg-transparent rounded-lg '>

            <HeaderContainer table={table} filtering={filtering} setFiltering={setFiltering} />
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


            </div>
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

        </div>

    )
}
const HeaderContainer = ({ filtering, setFiltering, table }) => {
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
                        <Breadcrumb pageName="school types" parentName="Settings" type={"box"} />
                    </div>
                    <div className='grid grid-cols-[1fr_50px] gap-2'>
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
                                        className='pt-0 pb-1 pl-2 bg-transparent outline-none  text-md md:text-xl line-clamp-1 placeholder:text-slate-500'
                                        placeholder='Type to search...'
                                    />
                                </div>
                                {isSearching ? <div> <Icons.spinner className="mr-4 text-2xl text-blue-600 animate-spin" /></div> : ''
                                }
                            </div>
                        </div>

                        <div className='flex items-center justify-end '  >

                            <VehicleTypeContextProvider>
                                <Create />
                            </VehicleTypeContextProvider>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}
export const FilterButton = ({ filter, showFilter, setShowFilter }) => {
    const handleSwitchFilter = () => {

        setShowFilter(prev => !prev)
    }
    return (
        <button onClick={handleSwitchFilter}
            className={`${filter ? '' : 'hidden'} btn btn-primary btn-sm text-xl     btn-rounded-symbol border-blue-300/10    `}>
            <TbFilterSearch />
        </button>


    )
}

