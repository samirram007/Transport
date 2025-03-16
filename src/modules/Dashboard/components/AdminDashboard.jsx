
import CardDataStats from '@/components/CardDataStats';

import FiscalYearCard from '@/modules/FiscalYear/components/FiscalYearCard';
import { useUserprofile } from '@/modules/User/hooks/useUserProfile';
import { Loader } from 'lucide-react';
import moment from 'moment';
import { GiExpense, GiReceiveMoney } from "react-icons/gi";
import { PiChalkboardTeacherThin, PiStudentThin } from 'react-icons/pi';
import { useDashboardContext } from '../context/features/useDashboardContext';
import FeesByMonthChart from './FeesByMonthChart';


const AdminDashboard = () => {
  const { fetchedData, data } = useDashboardContext()
  if (fetchedData.isLoading) {


    return <Loader className='animate-spin' />
  }
  if (fetchedData.error) {

    return <div>Error</div>
  }

  return (
    <>

      <FiscalYearCard />

      {
        data && <CardGroup />
      }
      <div className="grid grid-cols-[1fr_1fr] gap-5 mt-6">
        <div className="p-4 rounded-md shadow-md bg-zinc-300/40 dark:bg-slate-700/40">

          {
            data && <RecentFees />
          }
        </div>
        <div className="p-4 rounded-md shadow-md bg-zinc-300/40 dark:bg-slate-700/40">
          {data.feesByMonth && <FeesByMonthChart data={data?.feesByMonth} />}
        </div>
      </div>

      <div className="mt-6 ">
        {/* <Calender /> */}
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* <ChartOne />
        <ChartTwo />
        <ChartThree /> */}
        {/* <MapTwo />
        <MapOne /> */}
        {/* <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard /> */}
      </div>
    </>
  );
};

export default AdminDashboard;

const FeesCollectionByMonth = () => {
  const { data } = useDashboardContext()
  return (
    <div className="col-span-6 ">
      <div className='flex items-center justify-between pb-2'>
        <div className="text-xl font-bold">Fees Collection</div>
      </div>
    </div>
  )
}
const RecentFees = () => {
  const { data } = useDashboardContext()
  return (
    <div className="col-span-6 ">
      <div className='flex items-center justify-between pb-2'>
        <div className="text-xl font-bold">Recent Fees</div>
      </div>
      <div className="grid grid-cols-[50px_100px_1fr_100px] justify-center items-center gap-2 border-b-2 border-slate-600/50">
        <div>No.</div>
        <div>Date</div>
        <div>Student</div>
        <div className='text-right'>Amount</div>
      </div>
      <div className='flex flex-col gap-2 mt-1'>

        {
          data?.recentFees && data.recentFees.map((item, index) => (

            <div key={index} className="grid grid-cols-[50px_100px_1fr_100px] justify-center items-start gap-2 border-b-2 border-slate-300/50 pb-2">
              <div className="text-md ">{item.feeNo}</div>
              <div className="text-md ">{moment(item.feeDate).format("DD-MMM-yyyy")}

              </div>
              <div className="text-md ">
                <div>
                  {item.rider.name}
                </div>
                <div className='flex flex-row gap-2 text-sm font-semibold text-pretty dark:text-blue-300 '>
                  <div> {item.rider.standard}</div>
                  <div>Section: {item.rider.section}</div>
                  <div>Roll: {item.rider.rollNo ?? 'n/a'}</div>
                </div>
              </div>
              <div className="font-bold text-right text-md">{item.totalAmount}</div>

            </div>


          ))
        }
      </div>

    </div>
  )

}

const CardGroup = () => {
  const { data } = useDashboardContext()
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <ChickletGroup />
    </div>
  )
}

const ChickletGroup = () => {
  const userProfile = useUserprofile();
  const { data } = useDashboardContext()

  const chickletData =
    [
      {
        title: "riders",
        comment: "Rider",
        value: data?.riderCount ?? 0,
        subValue: "5000",
      },
      {
        title: "vehicles",
        comment: "Vehicle",
        value: data?.vehicleCount ?? 0,
        subValue: "1",
      },
      {
        title: "revenues",
        comment: "Revenue",
        value: `₹${data?.totalRevenue ?? 0}`,
        subValue: "100",
      },
      {
        title: "expenses",
        comment: "Expense",
        value: `₹${data?.totalExpense ?? 0}`,
        subValue: "100",
      },
    ]

  const icons = [
    { key: 'students', icon: <PiStudentThin className='text-4xl' /> },
    { key: 'teachers', icon: <PiChalkboardTeacherThin className='text-4xl' /> },
    { key: 'revenues', icon: <GiReceiveMoney className='text-4xl' /> },
    { key: 'expenses', icon: <GiExpense className='text-4xl' /> },
  ];



  return (

    chickletData && chickletData.map((item, index) => (
      <Chicklet key={index}
        item={{
          ...item,
          icon: icons.find((x) => x.key === item.title)?.icon,
          link: `/${userProfile.data?.data.role}/${item.title}`
        }} />

    ))
  )
}

const Chicklet = ({ item }) => {
  return (
    <CardDataStats
      link={item.link}
      title={item.title}
      comment={item.comment}
      total={item.value}
      rate="">
      {item.icon ?? <PiStudentThin className='text-4xl' />}
    </CardDataStats>
  )
}