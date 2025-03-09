
import FormikEmptyModal from '@/components/form-components/FormikEmptyModal';
import { lazy, useEffect } from 'react';
import { MdOutlineAddCircleOutline, MdOutlineCloseFullscreen } from 'react-icons/md';
import { useRiderContext } from '../contexts/features/useRiderContext';

const Breadcrumb = lazy(() => import('../../../components/Breadcrumb'))

const EntryForm = lazy(() => import('./EntryForm'))
const Create = () => {
    const {  setAction, isModalOpen, setModalOpen } = useRiderContext();

    const handleModalClose = () => {
        setModalOpen(false)
    }
    useEffect(() => {
        setAction('create')
    }, [])

    return (
        <>
            <button onClick={() => setModalOpen(true)}
                className="cursor-pointer ">

                <MdOutlineAddCircleOutline className='text-5xl text-teal-600 transition-all duration-500 ease-in-out cursor-pointer active:text-teal-300 active:scale-150 hover:text-teal-800' />
            </button>
            {isModalOpen &&
                <FormikEmptyModal isModalOpen={isModalOpen} variant={'screen'}  >
                    <div className='w-full h-dvh  
          grid grid-rows-[50px_1fr]  '>

                        <div className=' py-1 px-2  h-[50px]'>
                            <div className='flex items-center justify-between pb-1 border-b-2 border-slate-600/50' >
                                <div className='text-xl font-bold' >
                                    <div>New Rider(Student)</div>
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


export default Create



