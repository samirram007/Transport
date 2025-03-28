

import { useMemo } from 'react';




import { DateTime } from 'luxon';
import moment from 'moment';
import { useNavigate } from 'react-router';

import { capitalizeWords } from '@/lib/removeEmptyStrings';
import { useMonths } from '../../../../Common/hooks/queries';
import { useMonthlyFeeCollectionReport } from '../../../hooks/queries';
import MonthlyCollectionReportTable from '../MonthlyCollectionReportTable/MonthlyCollectionReportTable';

const initialValues = {
  fiscalYearId: moment(new Date()).format('YYYY'),
  schooId: 10399,
}
const initialFilterValues = {
  fiscalYearId: initialValues.fiscalYearId,
  schooId: initialValues.schooId,
}



const MonthlyDataTable = () => {

  const fetchedData = useMonthlyFeeCollectionReport(initialFilterValues);
  const feeMonths = useMonths();
  const navigate = useNavigate()

  const mData = fetchedData.data?.data ?? [];
  const monthData = feeMonths.data?.data ?? [];


  const data = useMemo(() => {

    return mData.map(item => ({
      ...item,
      selectedFeesData: item
    }))
  }, [mData]);



  /** @type {import('@tanstack/react-table').ColumnDef<any>} */
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
      visible: false,
      size: 50,
      isPinned: true,

    },
    {
      header: 'Class',
      accessorKey: 'class',
      isPinned: true,
      className: 'hidden',
      visible: false
    },
    {
      header: 'Roll',
      accessorKey: 'roll_no',
      isPinned: true,
      className: 'hidden',
      visible: false
    },
    {
      header: 'Name',
      accessorKey: 'student_name',
      className: 'pinned-left sticky left-0 bg-slate-800 border-r-2 border-b-[1px] border-violet-500 ',
      cell: info => {
        const rider = info.row.original
        return <>
          <div className='text-blue-200 font-bold text-md cursor-pointer btn-link' onClick={() => { navigate(`/students/info/${rider.id}`) }}>{rider.name}</div>
          {rider &&
            <div className='flex flex-row gap-2  text-[8px]'>
              <span>
                <span className='text-blue-400 font-bold'>{rider.standard}</span>
              </span>
              <span>
                Section:
                <span className='text-red-400 font-bold'>{rider.section}</span>
              </span>
              <span>
                Roll:
                <span className='text-green-400 font-bold'>{rider.rollNo}</span>
              </span>

            </div>}
        </>

      }


    },


  ]

  monthData.map((tab, index) => {
    const newColumn = {
      header: `${tab.short_name}`,
      accessorKey: `${index}`,
      align: 'center',
      cell: ({ row }) => {
        const getMonth = row.original.months.find(x => x.id === tab.id)
        if (getMonth?.amount === 0) {
          return <div className='text-center border-x-2 border-slate-400/10 text-gray-500 text-[11px]'>
            <div className='text-gray-600 font-bold text-[14px]'>{capitalizeWords(getMonth?.short_name)} </div>
            <div className='  text-[11px]'>{getMonth?.id <= moment(new Date()).format('M') ? <span className="text-red-500">Due</span> : ''}</div>
            {/* <div>{getMonth?.id}??{ moment(new Date()).format('M')} </div> */}

          </div>
        }
        return <div className='text-center border-x-2 border-slate-400/10 text-gray-500 text-[11px]'>
          <div className='text-green-500 font-bold text-[14px]'>{getMonth?.amount} </div>
          <div className='  text-[11px]'>Fee No  {getMonth?.fee_no} </div>
          <div className=' text-[11px]'>{DateTime.fromISO(getMonth?.fee_date).toLocaleString(DateTime.DATE_MED)} </div>
        </div>
      }
    }
    // columns.splice(columns.length - 1, 0, newColumn)
    columns.splice(4 + index, 0, newColumn);
  })






  if (fetchedData.isError) return <div>Error...</div>

  return (
    <MonthlyCollectionReportTable
      data={data} columns={columns}
      initialFilterValues={initialFilterValues}
      fetchedData={fetchedData}
    />
  )
}

export default MonthlyDataTable
