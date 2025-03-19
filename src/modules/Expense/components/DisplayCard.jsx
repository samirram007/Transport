import { Card, CardContent, CardFooter } from '@/components/ui/card';

import { useProfile } from '@/modules/Auth/hooks/useProfile';
import moment from 'moment';
import { MdEdit, MdOutlineDateRange } from 'react-icons/md';
import { Link } from 'react-router';
import { useExpenseContext } from '../contexts/features/useExpenseContext';
import { useExpenseDataContext } from '../contexts/features/useExpenseDataContext';
import Edit from './Edit';
import Print from './Print';
const DisplayCard = () => {
  const { dataDisplay } = useExpenseDataContext()

  return (
    dataDisplay == 'grid' ?

      <BaseCard />

      :
      <TableBaseCard />


  )

}
export default DisplayCard;

const TableBaseCard = () => {
  const { selectedExpense: data } = useExpenseContext()

  return (
    data &&
    <>


      <div># {data.expenseNo}</div>
      <div>{data.expenseDate ? moment(data.expenseDate).format('DD-MMM-YYYY') : 'N/A'}</div>
      <div>{
        data.totalAmount ?? 'N/A'}</div>
      <div>{data.note ?? 'N/A'} </div>
      <div className='text-center'>  {data && <> <Edit /><Print expenseId={data.id} /></>} </div>

    </>


  )
}

const BaseCard = () => {
  const { selectedExpense: data } = useExpenseContext()

  return (
    data &&
    <Card className='w-full h-[18rem]     
      bg-gradient-to-br from-transparent via-transparent/10 to-teal-500/10 
      backdrop-filter backdrop-blur-sm    
      shadow-lg
  grid grid-rows-[60px_1fr_80px]
       border-b-4 border-teal-500
       border-t-2   border-t-teal-500/30
       border-l-2   border-l-teal-500/30
       border-r-2   border-r-teal-500/30
       rounded-lg '>
      <div className='flex flex-row justify-between   p-2 border-b-2 border-slate-600/50'>


        <div className="text-md  flex flex-row items-center   overflow-clip pl-4"># {data.expenseNo}</div>
        <div className="text-md  flex flex-row items-center gap-2  overflow-clip pr-4 pt-0"><MdOutlineDateRange /> {data.expenseDate ? moment(data.expenseDate).format('DD-MMM-YYYY') : 'N/A'} </div>
      </div>

      <CardContent className='flex flex-col items-start gap-4 p-0 pl-6'>

        <div className="flex min-w-full flex-col gap-2  items-start  max-h-[15rem] overflow-y-auto scrollbar-thin scrollbar-thumb-teal-500 scrollbar-track-teal-200">

          <InfoRow label="Voucher No" value={data.voucherNo ?? '--'} />
          <InfoRow label="Amount" value={data.totalAmount ?? 'N/A'} />
          <InfoRow label="Note" value={data.note ?? 'N/A'} />

          {/* <InfoRow label="DOB" value={moment(data.dob).format("DD-MM-YYYY")} />
          <InfoRow label="Address" value={data.address?.display} />
          <InfoRow label="Gender" value={upperCaseFirstLetter(data.gender)} />
          <InfoRow label="Nationality" value={upperCaseFirstLetter(data.nationality)} />
          <InfoRow label="Religion" value={upperCaseFirstLetter(data.religion)} />
          <InfoRow label="Caste" value={upperCaseFirstLetter(data.caste)} />
          <InfoRow label="Language" value={upperCaseFirstLetter(data.language)} />
          <InfoRow label="Aadhaar No." value={upperCase(data.aadhaarNo ?? 'n/a')} /> */}


        </div>
      </CardContent>
      <CardFooter className='bottom-0 flex flex-row justify-center gap-4 pt-2 '>

        {data &&
          <>
            {/* <Info/> */}
            <EditButton expenseId={data.id} />
            <Print expenseId={data.id} />
            {/* <Delete /> */}
          </>
        }


      </CardFooter>
    </Card>


  )
}

const InfoRow = ({ label, value }) => {
  return (
    <div className="text-sm text-gray-500 gap-1 grid grid-cols-[90px_5px_1fr]  ">
      <div className='text-nowrap text-slate-500'>{label}</div>
      <div> : </div>
      <div className="pr-2 truncate whitespace-normal line-clamp-2 ">{value}</div>
    </div>
  );
}


const EditButton = ({ expenseId }) => {
  const userProfile = useProfile()
  return (
    <Link
      to={`/${userProfile.data?.data?.role}/expenses/process/${expenseId}`}
      title='Edit'
      className="box-border flex flex-col items-center justify-center bg-transparent border-2 border-teal-600 rounded-md cursor-pointer w-15 h-15">
      <MdEdit className='text-2xl text-teal-400 transition-all duration-500 ease-in-out cursor-pointer active:text-blue-300 active:scale-150 hover:text-teal-800' />
      <div>Edit</div>
    </Link>
  )
}