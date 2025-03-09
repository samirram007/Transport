import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { fallbackText } from "@/lib/removeEmptyStrings"
import { useVehicleContext } from "../context/features/useVehicleContext"
import Delete from "./Delete"
import Edit from "./Edit"
const DisplayCard = () => {

  return (
    <BaseCard />
  )
}

export default DisplayCard

const BaseCard = () => {
  const { selectedVehicle: data } = useVehicleContext()
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
          <AvatarImage src={data.logoImage?.path} alt={data.name} />
          <AvatarFallback>{fallbackText(data.name)}</AvatarFallback>
        </Avatar>
      </CardHeader>

      <CardContent className='flex flex-col items-center w-full gap-4 p-0 px-6'>
        <div className="text-2xl   whitespace-pre-wrap max-h-[2rem] truncate overflow-clip">{data.name}</div>

        <div className="flex flex-col w-full gap-2  items-start  max-h-[15rem] overflow-y-auto scrollbar-thin scrollbar-thumb-teal-500 scrollbar-track-teal-200">
          <InfoRow label="Reg. No" value={data.registration_no} />
          <InfoRow label="Reg. Date" value={data.registration_date} />
          <InfoRow label="Reg. Valid Date" value={data.registration_valid_date} />
          <InfoRow label="Chassis No" value={data.chassis_no} />
          <InfoRow label="Engine No" value={data.engine_no} />
          <InfoRow label="Capacity" value={data.capacity} />
          <InfoRow label="Type" value={data.vehicleType?.name} />


        </div>
      </CardContent>
      <CardFooter className='bottom-0 flex flex-row justify-center gap-4 pt-2 '>

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

const InfoRow = ({ label, value }) => {
  return (
    <div className="w-full text-sm text-gray-500 gap-1 grid grid-cols-[80px_5px_1fr]">
      <div className="">{label}</div>
      <div> : </div>
      <div className="pr-2 truncate whitespace-normal border-b-2 border-dotted border-slate-500 ">{value}</div>
    </div>
  );
}
