import { Card, CardContent, CardFooter } from '@/components/ui/card';

import moment from 'moment';
import { MdOutlineDateRange } from 'react-icons/md';
import { useFeeContext } from '../contexts/features/useFeeContext';
import { useFeeDataContext } from '../contexts/features/useFeeDataContext';
import Edit from './Edit';
import Print from './Print';
const DisplayCard = () => {
  const { dataDisplay } = useFeeDataContext()

  return (
    dataDisplay == 'grid' ?

      <BaseCard />

      :
      <TableBaseCard />


  )

}
export default DisplayCard;

const TableBaseCard = () => {
  const { selectedFee: data } = useFeeContext()

  return (
    data &&
    <>


      <div># {data.feeNo}</div>
      <div>{data.feeDate ? moment(data.feeDate).format('DD-MMM-YYYY') : 'N/A'}</div>
      <div>{data.rider ? data.rider?.name : 'N/A'} </div>
      <div>{data.rider?.school ? data.rider.school.name : 'N/A'} </div>
      <div>{
        data.feeItems[0] ? (data.feeItems[0]?.amount + ' x ' + data.feeItems[0]?.quantity) : 'N/A'}</div>
      <div>{data.note ?? 'N/A'} </div>
      <div className='text-center'>  {data && <> <Edit /><Print feeId={data.id} /></>} </div>

    </>


  )
}

const BaseCard = () => {
  const { selectedFee: data } = useFeeContext()

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


        <div className="text-md  flex flex-row items-center   overflow-clip pl-4"># {data.feeNo}</div>
        <div className="text-md  flex flex-row items-center gap-2  overflow-clip pr-4 pt-0"><MdOutlineDateRange /> {data.feeDate ? moment(data.feeDate).format('DD-MMM-YYYY') : 'N/A'} </div>
      </div>

      <CardContent className='flex flex-col items-start gap-4 p-0 pl-6'>

        <div className="flex min-w-full flex-col gap-2  items-start  max-h-[15rem] overflow-y-auto scrollbar-thin scrollbar-thumb-teal-500 scrollbar-track-teal-200">
          <InfoRow label="Rider" value={data.rider ? data.rider?.name : 'N/A'} />
          <InfoRow label="School" value={data.rider?.school ? data.rider.school.name : 'N/A'} />
            <InfoRow label="Fee" value={
              data.feeItems[0] ? (data.feeItems[0]?.amount + ' x ' + data.feeItems[0]?.quantity) : 'N/A'} />
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
            <Edit />
            <Print feeId={data.id} />
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