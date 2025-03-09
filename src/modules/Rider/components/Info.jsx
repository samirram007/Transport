
import FormikEmptyModal from '@/components/form-components/FormikEmptyModal';
import { Button } from '@/components/ui/button';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineCloseFullscreen } from 'react-icons/md';
import { useStudentContext } from '../contexts/features/useRiderContext';
import Information from './profile/Information';



const Info = ( ) => {
 
     const { action,setAction, isModalOpen, setModalOpen } = useStudentContext();
   
   
    const handleModalClose = () => {
      setModalOpen(false) 
    
     
    }
   const handleOnClick = () => {
      setModalOpen(true)
      setAction('info')
   }
    return (
        <>

      <Button onClick={handleOnClick}
        className="  w-15 h-15 bg-transparent    cursor-pointer  border-2 rounded-md box-border border-teal-600 flex flex-col items-center justify-center">

        <CgProfile   className='text-3xl text-teal-600 cursor-pointer
                        transition-all duration-500 ease-in-out
                        active:text-teal-300 active:scale-150
                         hover:text-teal-800' />
                         <div>Info</div>
      </Button>
      {isModalOpen && action === 'info' &&
        <FormikEmptyModal isModalOpen={isModalOpen} variant={'screen'}  >
          <div className='w-full h-[90dvh] md:h-[90dvh] max-h-[90dvh]  
          grid grid-rows-[50px_1fr]  '>

            <div className=' py-1 px-2  h-[50px]'>
              <div className='flex justify-between items-center border-b-2 border-slate-600/50 pb-1' >
                <div className='text-xl font-bold' >
                  <div>Student Information</div>
                </div>
                <button onClick={handleModalClose} type="button"
                  className='rounded-full p-2
                  bg-slate-50/5 text-orange-500 cursor-pointer
                  hover:text-yellow-500 hover:bg-slate-600
                  active:text-orange-600 active:touch-pinch-zoom '>
                  <MdOutlineCloseFullscreen className='text-xl active:scale-90 transition delay-75 ease-in-out ' />
                </button>
              </div>
            </div>
            
              {/* <EntryForm   /> */}
              <Information/>
           
          </div >
        </FormikEmptyModal>

      }
    </>
    )
}


export default Info


