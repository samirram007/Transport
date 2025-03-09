import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { capitalizeAllWords, capitalizeFirstLetter, fallbackText, upperCase, upperCaseFirstLetter } from '@/lib/removeEmptyStrings';
import moment from 'moment';
import { useRiderContext } from '../contexts/features/useRiderContext';
import Edit from './Edit';
const DisplayCard = () => {


  return (
    <BaseCard />

  )

}
export default DisplayCard;
const BaseCard = () => {
  const { selectedRider: data } = useRiderContext()

  return (
    data &&
    <Card className='w-full h-[28rem]     
      bg-gradient-to-br from-transparent via-transparent/10 to-teal-500/10 
      backdrop-filter backdrop-blur-sm    
      shadow-lg
  grid grid-rows-[60px_1fr_80px]
       border-b-4 border-teal-500
       border-t-2   border-t-teal-500/30
       border-l-2   border-l-teal-500/30
       border-r-2   border-r-teal-500/30
       rounded-lg '>
      <CardHeader className='flex flex-row justify-center p-2 border-b-2 border-slate-600/50'>

        <Avatar className='shadow-lg'>
          <AvatarImage src={data.profileDocument?.path} alt={data.name} />
          <AvatarFallback>{fallbackText(data.name)}</AvatarFallback>
        </Avatar>
      </CardHeader>

      <CardContent className='flex flex-col items-center gap-4 p-0 pl-6'>
        <div className="text-2xl whitespace-pre-wrap max-h-[2rem] truncate overflow-clip">{data.name}</div>

        <div className="flex min-w-full flex-col gap-2  items-start  max-h-[15rem] overflow-y-auto scrollbar-thin scrollbar-thumb-teal-500 scrollbar-track-teal-200">
          <InfoRow label="Code" value={data.code} />
          <InfoRow label="Type" value={data.riderType} />
          <InfoRow label="Contact" value={data.contactNo} />
          <InfoRow label="Email" value={data.email} />
          <InfoRow label="School" value={data.school?.name} />
          <InfoRow label="Standard" value={data.standard} />
          <InfoRow label="Section" value={data.section} />
          <InfoRow label="Roll No" value={data.rollNo} />
          <InfoRow label="Fee" value={data.monthlyCharge} />
          <InfoRow label="Vehicle" value={data.vehicle?.name} />
          <InfoRow label="Time" value={data.school_time} />

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
      <div className='text-nowrap'>{label}</div>
      <div> : </div>
      <div className="pr-2 truncate whitespace-normal ">{value}</div>
    </div>
  );
}