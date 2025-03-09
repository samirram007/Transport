import { Loader } from 'lucide-react'

import { useUserFiscalYearContext } from '../context/features/useUserFiscalYearContext'
import YearSwitcher from './YearSwitcher'





const FiscalYearCard = ({ icon, label }) => {
  const { userSelectedFiscalYear } = useUserFiscalYearContext()

  return (
    !userSelectedFiscalYear ? <Loader className='animate-spin' /> :

      <div className="flex flex-row items-center justify-start gap-1 font-bold ">
        <div> {label ?? ' Sesion: '}{userSelectedFiscalYear?.name}</div>

        <YearSwitcher icon={icon} />


      </div>
  )
}




export default FiscalYearCard