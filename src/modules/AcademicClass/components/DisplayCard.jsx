import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import moment from "moment"
import { useAcademicClassContext } from "../context/features/useAcademicClassContext"
import Delete from "./Delete"
import Edit from "./Edit"
const DisplayCard = () => {

  return (
    <BaseCard />
  )
}

export default DisplayCard

const BaseCard = () => {
  const { selectedAcademicClass: data } = useAcademicClassContext()
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
      <CardHeader className='flex flex-row justify-center border-b-2 border-slate-600/50 p-2'>

        <Avatar className='shadow-lg'>
          <AvatarImage src={data.logoImage?.path} alt={data.class} />
          <AvatarFallback>{data.class.substring(2,4)}</AvatarFallback>
        </Avatar>
      </CardHeader>
      
      <CardContent className='flex flex-col gap-4 items-center p-0 px-6'>
        <div className="text-2xl whitespace-pre-wrap max-h-[2rem] truncate overflow-clip">{data.class}</div>

        <div className="flex flex-col gap-2  items-start  max-h-[15rem] overflow-y-auto scrollbar-thin scrollbar-thumb-teal-500 scrollbar-track-teal-200"> 
          <InfoRow label="Start Date" value={moment(data.startDate).format("DD-MMM-YYYY")} />
          <InfoRow label="End Date" value={moment(data.endDate).format("DD-MMM-YYYY")} />
          <InfoRow label="Previous" value={data.previousAcademicClass?.class} />
          <InfoRow label="Next" value={data.nextAcademicClass?.class} />
          <InfoRow label="is Currrent" boolean={true} value={data.isCurrent?'YES':'NO'} />
           
          
        </div>
      </CardContent>
      <CardFooter className='  bottom-0 flex flex-row justify-center gap-4 pt-2'>

        {data &&
          <>
            <Edit />
            <Delete />
          </>
        }


      </CardFooter>
    </Card>


  )
}



export function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage src="./avatar-80-07.jpg" alt="Kelly King" />
      <AvatarFallback>KK</AvatarFallback>
    </Avatar>
  );
}

const InfoRow = ({ label, value,boolean=false }) => {
  return (
    <div className="text-sm text-gray-500 gap-1 grid grid-cols-[80px_5px_1fr]">
      <div>{label}</div>
      <div className="pr-1"> {boolean?'?':':'} </div>
      <div className="pr-2 whitespace-normal truncate ">{value}</div>
    </div>
  );
}
