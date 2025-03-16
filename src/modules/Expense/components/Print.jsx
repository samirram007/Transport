
import FormikEmptyModal from '@/components/form-components/FormikEmptyModal';
import { Button } from '@/components/ui/button';
import { MdOutlineCloseFullscreen } from 'react-icons/md';
import { TbReceipt } from 'react-icons/tb';

import { Printer } from 'lucide-react';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useExpenseContext } from '../contexts/features/useExpenseContext';
import { useExpenseDataContext } from '../contexts/features/useExpenseDataContext';
import PrintToPdf from '../print/PrintToPdf';



const Print = ({ expenseId }) => {

    const { action, setAction, isModalOpen, setModalOpen } = useExpenseContext();
    const { dataDisplay } = useExpenseDataContext()
    const contentRef = useRef(null)
    const reactToPrintFn = useReactToPrint({ contentRef });
    const handleModalClose = () => {
        setModalOpen(false)

    }
    const handleOnClick = () => {
        setModalOpen(true)
        setAction('print')
    }
    // const handlePrint = () => {
    //     console.log(componentRef.current);
    //     () => useReactToPrint({
    //         content: () => componentRef.current,
    //     });

    // }

    return (
        <>

            {
                dataDisplay === 'grid' ?
                    <>
                        <Button onClick={handleOnClick}
                            className="box-border flex flex-col items-center justify-center bg-transparent border-2 border-teal-600 rounded-md cursor-pointer w-15 h-15">
                            <TbReceipt className='text-3xl text-teal-600 transition-all duration-500 ease-in-out cursor-pointer active:text-teal-300 active:scale-150 hover:text-teal-800' />
                            <div>Print</div>
                        </Button>
                    </>
                    :
                    <Button variant={'link'} size={'icon'} onClick={handleOnClick}
                        className="  
            hover:bg-teal-900 active:bg-teal-800 border-2    cursor-pointer self-center   ">
                        <TbReceipt className='text-2xl text-teal-600 transition-all duration-500 ease-in-out cursor-pointer active:text-teal-300 active:scale-150 hover:text-teal-800' />

                    </Button>

            }
            {isModalOpen && action === 'print' &&
                <FormikEmptyModal isModalOpen={isModalOpen} variant={'print-screen'}  >
                    <div className='w-full h-[90dvh] md:h-[90dvh] max-h-[90dvh]  
          grid grid-rows-[50px_1fr]  '>

                        <div className=' py-1 px-2  h-[50px]'>
                            <div className='flex items-center justify-between pb-1 border-b-2 border-slate-600/50' >
                                <div className='text-xl font-bold' >
                                    <div>Print Expenses</div>
                                </div>

                                <div className='mb-3 mr-10  bottom-0 gap-4     right-0 flex items-center justify-end'>
                                    <button className='badge badge-error btn-outline bg-error text-slate-50    '
                                        onClick={() => reactToPrintFn()}>
                                        <Printer /> </button>
                                    <button onClick={handleModalClose} type="button"
                                        className='p-2 text-orange-500 rounded-full cursor-pointer bg-slate-50/5 hover:text-yellow-500 hover:bg-slate-600 active:text-orange-600 active:touch-pinch-zoom '>
                                        <MdOutlineCloseFullscreen className='text-xl transition ease-in-out delay-75 active:scale-90 ' />
                                    </button>

                                </div>


                            </div>
                        </div>

                        <PrintToPdf expenseId={expenseId} contentRef={contentRef} />

                    </div >
                </FormikEmptyModal>

            }
        </>
    )
}


export default Print


