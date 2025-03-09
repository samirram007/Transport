import { MdOutlineCloseFullscreen } from "react-icons/md"

const Booking = ({ isModalOpen, setModalOpen }) => {


    const handleModalOpen = () => {

        setModalOpen(true)
    }
    const handleModalClose = () => {

        setModalOpen(false)
    }
    return (
        <div className='relative w-full h-[95dvh] md:h-[90dvh] max-h-[90dvh]  
        grid grid-rows-[50px_1fr]  overflow-y-hidden '>

            <div className=' sticky top-0 py-1 px-2  h-[50px]'>
                <div className='flex justify-between items-center border-b-2 border-slate-600/50 pb-1' >
                    <div className='text-xl  ' >Managing Booking...</div>
                    <button onClick={handleModalClose} type="button"
                        className='rounded-full p-2
                                bg-slate-50/5 text-orange-500 cursor-pointer
                                hover:text-yellow-500 hover:bg-slate-600
                                active:text-orange-600 active:touch-pinch-zoom '>
                        <MdOutlineCloseFullscreen className='text-xl active:scale-90 transition delay-75 ease-in-out ' />
                    </button>
                </div>
            </div>
            <div className='max-h-full min-h-full gap-2  grid 
                  grid-cols-[1fr] grid-rows-[1fr]   md:grid-cols-[30rem_1fr] p-1 '>

                <div className={`max-h-full min-h-full justify-start items-center    `}  >
                    Hello

                </div>
                <div className={`max-h-full min-h-full    md:grid md:grid-rows-[1fr]  gap-2 `}  >

                    Bye!
                </div>
            </div>
        </div >
    )
}

export default Booking