import FormikEmptyModal from "@/components/form-components/FormikEmptyModal";
import { GoArrowSwitch } from "react-icons/go";
import { MdOutlineCloseFullscreen } from "react-icons/md";
import { useUserFiscalYearContext } from "../context/features/useUserFiscalYearContext";
import YearSwitchForm from "./YearSwitchForm";

const YearSwitcher = ({ icon }) => {
  const { action, setAction,
    isModalOpen, setModalOpen
  } = useUserFiscalYearContext();


  const handleModalClose = () => {
    setModalOpen(false)


  }
  const handleOnClick = () => {
    setModalOpen(true)
    setAction('switch')
  }
  return (
    <>
      <div onClick={handleOnClick} className="cursor-pointer">
        <GoArrowSwitch className='text-2xl text-teal-500' />
      </div>

      {isModalOpen &&
        <FormikEmptyModal isModalOpen={isModalOpen} variant={'semi'}  >
          <div className='w-full h-[50dvh]   
      grid grid-rows-[50px_1fr]  '>
            <div className='flex items-center justify-between px-2 pb-1 border-b-2 border-slate-600/50' >
              <div className='text-xl font-bold' >
                <div>Fiscal Year Switch</div>
              </div>
              <button onClick={handleModalClose} type="button"
                className='p-2 text-orange-500 rounded-full cursor-pointer bg-slate-50/5 hover:text-yellow-500 hover:bg-slate-600 active:text-orange-600 active:touch-pinch-zoom '>
                {
                  icon ??

                  <MdOutlineCloseFullscreen className='text-xl transition ease-in-out delay-75 active:scale-90 ' />
                }
              </button>

            </div>


            <YearSwitchForm />

          </div >
        </FormikEmptyModal>


      }
    </>
  )
}

export default YearSwitcher 