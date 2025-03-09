import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const overlay = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",

    padding: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}
const modalStyle = {

    // margin: "0",
    padding: "0",
    border: "2px solid #00000011",

}
const FormikEmptyModal = ({ isModalOpen, variant, children }) => {

    const [customStyle, setCustomStyle] = useState('w-11/12 h-[90dvh]')
    const [overlayStyle, setOverlayStyle] = useState('bg-black bg-opacity-70 relative')

    useEffect(() => {
        switch (variant) {
            case 'half':
                setCustomStyle(prev => 'w-8/12')
                break
            case 'semi':
                setCustomStyle(prev => 'w-4/12 ')
                break
            case 'full':
                setCustomStyle(prev => 'w-11/12 ')
                break
            case 'screen':
                setCustomStyle(prev => 'w-dvw h-dvh ')
                break
            case 'nav-screen':
                setCustomStyle(prev => 'w-dvw h-[calc(100dvh-5rem)] mt-[5rem] shadow-lg shadow-sky-400  ')
                setOverlayStyle(prev => 'bg-black bg-opacity-10 relative')
                break

            default: setCustomStyle(prev => 'w-11/12 h-[90dvh]')

        }

    }, [variant])

    if (!isModalOpen) return null;



    return createPortal(
        <>

            <div style={overlay} className={overlayStyle}>
                {/* {variant} */}
                <div style={modalStyle} className={`${variant}    ${customStyle}  max-h-dvh 
                shadow-md
                 
                bg-slate-200  dark:bg-boxdark-2
                text-slate-900 dark:text-slate-50
                rounded-xl  
               
                motion-translate-x-in-[116%] motion-translate-y-in-[5%]
              motion-scale-in-[0.5]     motion-opacity-in-[0%] motion-rotate-in-[-10deg] motion-blur-in-[5px] motion-duration-[0.35s] motion-duration-[0.53s]/scale motion-duration-[0.53s]/translate motion-duration-[0.63s]/rotate
                `}>
                    <div className='bg-slate-100 max-h-full dark:bg-slate-900/50  border-8 border-blue-500/50 rounded-lg '>

                        {children}
                    </div>
                </div>
            </div>

        </>,
        document.getElementById('portal-form')
    )
}

export default FormikEmptyModal



