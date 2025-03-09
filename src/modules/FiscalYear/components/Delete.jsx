
import FormikEmptyModal from '@/components/form-components/FormikEmptyModal';
import { Button } from '@/components/ui/button';
import { MdOutlineCloseFullscreen } from 'react-icons/md';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { useFiscalYearContext } from '../context/features/useFiscalYearContext';
import EntryForm from './EntryForm';



const Delete = () => {
  const { action, setAction, isModalOpen, setModalOpen } = useFiscalYearContext();

  const handleModalClose = () => {
    setModalOpen(false)
  }

  const handleOnClick = () => {
    setModalOpen(true)
    setAction('delete')
  }
  return (
    <>

      <Button onClick={handleOnClick}
        className="box-border flex flex-col items-center justify-center bg-transparent border-2 border-teal-600 rounded-md cursor-pointer  w-15 h-15">

        <RiDeleteBin7Line className='text-3xl text-teal-600 transition-all duration-500 ease-in-out cursor-pointer active:text-teal-300 active:scale-150 hover:text-teal-800' />
        <div>Delete</div>
      </Button>
      {isModalOpen && action === 'delete' &&
        <FormikEmptyModal isModalOpen={isModalOpen} variant={'half'}  >
          <div className='w-full  
          grid grid-rows-[50px_1fr]  '>

            <div className=' py-1 px-2  h-[50px]'>
              <div className='flex items-center justify-between pb-1 border-b-2 border-slate-600/50' >
                <div className='text-xl font-bold text-red-500' >
                  <div>Delete  Session</div>
                </div>
                <button onClick={handleModalClose} type="button"
                  className='p-2 text-orange-500 rounded-full cursor-pointer bg-slate-50/5 hover:text-yellow-500 hover:bg-slate-600 active:text-orange-600 active:touch-pinch-zoom '>
                  <MdOutlineCloseFullscreen className='text-xl transition ease-in-out delay-75 active:scale-90 ' />
                </button>
              </div>
            </div>

            <EntryForm />

          </div >
        </FormikEmptyModal>

      }
    </>
  )
}


export default Delete


