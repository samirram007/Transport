







import FormikEmptyModal from '@/components/form-components/FormikEmptyModal';
import { useEffect } from 'react';
import { MdOutlineAddCircleOutline, MdOutlineCloseFullscreen } from 'react-icons/md';
import { useVehicleTypeContext } from '../context/features/useVehicleTypeContext';
import EntryForm from './EntryForm';

const Create = () => {
  const { entryMode, setAction, isModalOpen, setModalOpen } = useVehicleTypeContext();

  const handleModalClose = () => {
    setModalOpen(false)
  }
  useEffect(() => {
    setAction('create')
  }, [])
  return (

    <>

      <button onClick={() => setModalOpen(true)}
        className="absolute cursor-pointer  md:relative">

        <MdOutlineAddCircleOutline className='text-5xl text-teal-600 transition-all duration-500 ease-in-out cursor-pointer active:text-teal-300 active:scale-150 hover:text-teal-800' />
      </button>
      {isModalOpen &&
        <FormikEmptyModal isModalOpen={isModalOpen} variant={'full'}  >
          <div className='w-full h-[90dvh] md:h-[90dvh] max-h-[90dvh]  
          grid grid-rows-[50px_1fr]  '>

            <div className=' py-1 px-2  h-[50px]'>
              <div className='flex items-center justify-between pb-1 border-b-2 border-slate-600/50' >
                <div className='text-xl font-bold' >
                  <div>Add VehicleType</div>
                </div>
                <button onClick={handleModalClose} type="button"
                  className='p-2 text-orange-500 rounded-full cursor-pointer bg-slate-50/5 hover:text-yellow-500 hover:bg-slate-600 active:text-orange-600 active:touch-pinch-zoom '>
                  <MdOutlineCloseFullscreen className='text-xl transition ease-in-out delay-75 active:scale-90 ' />
                </button>
              </div>
            </div>

            <EntryForm
              handleModalClose={handleModalClose} />

          </div >
        </FormikEmptyModal>

      }
    </>

  )
}


export default Create