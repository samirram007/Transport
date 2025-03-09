import { useState } from 'react'


import DocumentFragment from '@/modules/Document/components/DocumentFragment'
import DocumentSelector from '@/modules/Document/components/DocumentSelector'

export const ImageBox = ({ formik, name, resource, editable, src = '' }) => {
 

    const [imageId, setImageId] = useState(formik.values[name])


    const [defaultImage, setDefaultImage] = useState(`${import.meta.env.VITE_API_BASE_URL}/storage/documents/student.png`)
    const [open, setOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState(
        (formik.values[resource]) ?
            (formik.values[resource].path)
            :
            defaultImage)

    const handleSetImageId = (param) => {
        setImageId(param)
        formik.values[name] = param
    }
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };



    return (
        <div className='flex flex-col items-center cursor-pointer'>
            {/* <FormikHiddenInput formik={formik} name={name} /> */}

            <div className=' relative active:touch-pinch-zoom 
            flex justify-center items-center
            shadow-md
            w-32 h-32 !rounded-full overflow-clip' style={{ border: '2px  solid #eaecee55' }}>
                <img
                    className='w-full overflow-clip hover:scale-95 '
                    onClick={editable ?? editable ? handleOpen : undefined}
                    src={imageSrc}
                    alt={name} />
                
                        <div  className='absolute bottom-0 flex items-center justify-center w-full py-1 text-sm bg-slate-800/60 text-zinc-100' 
                        onClick={handleOpen}>Change</div>
                      
            </div>

            <DocumentFragment   >

                {/* <Documents setImageId={handleSetImageId} setImageSrc={setImageSrc} /> */}
                {open && <DocumentSelector
                    setImageId={handleSetImageId}
                    setImageSrc={setImageSrc}
                    isOpen={open} handleClose={handleClose}
                />}


            </DocumentFragment>

        </div>
    )
}

