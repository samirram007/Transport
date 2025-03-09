import { Loader } from 'lucide-react'
import { useUserAcademicClassContext } from '../context/features/useUserAcademicClassContext'
import ClassSwitcher from './ClassSwitcher'





const AcademicClassCard = ({icon,label}) => { 
  const {userSelectedAcademicClass}=useUserAcademicClassContext()

  return (
    !userSelectedAcademicClass ? <Loader className='animate-spin'/>:

    <div className="flex flex-row justify-start items-center gap-1   font-bold  ">
      <div> {label??' Class :  '}{userSelectedAcademicClass?.campus?.code } - {userSelectedAcademicClass?.name} </div>

      <ClassSwitcher   icon={icon} />


    </div>
  )
}




export default AcademicClassCard