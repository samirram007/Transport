import { useUserInitialValueDataContext } from "@/modules/UserInitialValue/context/features/useUserInitialValueDataContext";
import { Loader } from "lucide-react";
import { useUserAcademicClassContext } from "../context/features/useUserAcademicClassContext";
import { useAcademicClasses } from "../hooks/queries";

const ClassSwitchForm = ( ) => {
  const {data } =useUserInitialValueDataContext()
  const fetchedData = useAcademicClasses()
  const selectedAcademicClassId=data?.find(x=>x.key==='academicClassId')?.value
  console.log('us',selectedAcademicClassId)
  return (
    <div className="w-full h-[40dvh] overflow-y-auto">
      <div className='flex justify-between px-2 text-warning bg-accent items-center border-b-2 border-slate-600/50 pb-1' >
        <div>Class</div>
        <div>Status</div>
      </div>
      <div className="h-full overflow-y-auto">

      {
        fetchedData?.data?.data?.map((academicClass, index) => (
          <div key={index} className={` ${selectedAcademicClassId == academicClass?.id ? 'text-green-800 bg-green-200':''  } flex justify-between items-center border-b-2 border-slate-600/50 pb-1`} >
            <div className='text-xl font-bold px-4' >
              <div>{academicClass?.campus?.code} - {academicClass?.name}</div>
            </div>
            {selectedAcademicClassId == academicClass?.id ?
              <div className='text-slate-600 px-2 underline decoration-red-500'>Active</div> :
              <SwitchButton academicClass={academicClass}/>
            }

          </div>
        ))
        
      }
      </div>
    </div>
  )
}

export default ClassSwitchForm

const SwitchButton = ({academicClass}) => {
  const { handleMutation,academicClassSwitchMutation } = useUserAcademicClassContext()
  const payload = {
    key: 'academicClassId',
    value: academicClass.id.toString()
  }
  console.log(academicClassSwitchMutation);
  
  const handleOnClick = () => { 
    handleMutation(payload)
  }
  return (
    <>
    {academicClassSwitchMutation.isPending? <Loader className='animate-spin'/>:
    

    <button type="submit"
    onClick={handleOnClick}
    disabled={academicClassSwitchMutation.isPending}
    className='rounded-full px-2
    bg-slate-50/5 text-orange-500 cursor-pointer
    hover:text-yellow-500 hover:bg-slate-600
    active:text-orange-600 active:touch-pinch-zoom '>
     {academicClassSwitchMutation.isPending?'............................': 'Switch'}
    </button> }
    </>
  )
}