import FormikEmptyModal from "@/components/form-components/FormikEmptyModal";
import { GoArrowSwitch } from "react-icons/go";
import { MdOutlineCloseFullscreen } from "react-icons/md";
import { useUserAcademicClassContext } from "../context/features/useUserAcademicClassContext";
import ClassSwitchForm from "./ClassSwitchForm";

const ClassSwitcher = ({ icon }) => {
  const { action, setAction,
    isModalOpen, setModalOpen
  } = useUserAcademicClassContext();


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
        <GoArrowSwitch className='text-teal-500 text-2xl' />
      </div>

      {isModalOpen &&
        <FormikEmptyModal isModalOpen={isModalOpen} variant={'semi'}  >
          <div className='w-full h-[50dvh]   
      grid grid-rows-[50px_1fr]  '>
            <div className='flex justify-between items-center border-b-2 border-slate-600/50 pb-1 px-2' >
              <div className='text-xl font-bold' >
                <div>Class Switch</div>
              </div>
              <button onClick={handleModalClose} type="button"
                className='rounded-full p-2
        bg-slate-50/5 text-orange-500 cursor-pointer
        hover:text-yellow-500 hover:bg-slate-600
        active:text-orange-600 active:touch-pinch-zoom '>
                {
                  icon ??

                  <MdOutlineCloseFullscreen className='text-xl active:scale-90 transition delay-75 ease-in-out ' />
                }
              </button>

            </div>


            <ClassSwitchForm />

          </div >
        </FormikEmptyModal>


      }
    </>
  )
}

export default ClassSwitcher