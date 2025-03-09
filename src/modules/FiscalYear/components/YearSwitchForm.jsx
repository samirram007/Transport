import { useUserInitialValueDataContext } from "@/modules/UserInitialValue/context/features/useUserInitialValueDataContext";
import { Loader } from "lucide-react";
import { useUserFiscalYearContext } from "../context/features/useUserFiscalYearContext";
import { useFiscalYears } from "../hooks/queries";

const YearSwitchForm = () => {
  const { data } = useUserInitialValueDataContext()
  const fetchedData = useFiscalYears()
  const selectedFiscalYearId = data?.find(x => x.key === 'fiscalYearId')?.value
  console.log('us', selectedFiscalYearId)
  return (
    <div className="w-full h-[40dvh] overflow-y-auto">
      <div className='flex items-center justify-between px-2 pb-1 border-b-2 text-warning bg-accent border-slate-600/50' >
        <div>Year</div>
        <div>Status</div>
      </div>
      <div className="h-full overflow-y-auto">

        {
          fetchedData?.data?.data?.map((fiscalYear, index) => (
            <div key={index} className={` ${selectedFiscalYearId == fiscalYear?.id ? 'text-green-800 bg-green-200' : ''} flex justify-between items-center border-b-2 border-slate-600/50 pb-1`} >
              <div className='px-4 text-xl font-bold' >
                <div>{fiscalYear?.name}</div>
              </div>
              {selectedFiscalYearId == fiscalYear?.id ?
                <div className='px-2 underline text-slate-600 decoration-red-500'>Active </div> :
                <SwitchButton fiscalYear={fiscalYear} />
              }

            </div>
          ))

        }
      </div>
    </div>
  )
}

export default YearSwitchForm

const SwitchButton = ({ fiscalYear }) => {
  const { handleMutation, fiscalYearSwitchMutation } = useUserFiscalYearContext()
  const payload = {
    key: 'fiscalYearId',
    value: fiscalYear.id.toString()
  }
  const handleOnClick = () => {
    handleMutation(payload)
  }
  return (
    <>
      {fiscalYearSwitchMutation.isPending ? <Loader className='animate-spin' /> :


        <button type="submit"
          onClick={handleOnClick}
          disabled={fiscalYearSwitchMutation.isPending}
          className='px-2 text-orange-500 rounded-full cursor-pointer bg-slate-50/5 hover:text-yellow-500 hover:bg-slate-600 active:text-orange-600 active:touch-pinch-zoom '>
          {fiscalYearSwitchMutation.isPending ? '............................' : 'Switch'}
        </button>}
    </>
  )
}