
import { useFormik } from 'formik';
import * as Yup from "yup";


import { FormikInputBox } from '@/components/form-components/FormikInputBox';
import { ImageBox } from '@/components/form-components/ImageBox';

import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useVehicleTypeContext } from '../context/features/useVehicleTypeContext';



const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required("Name is required"),

})



const EntryForm = () => {
    const { selectedVehicleType: data, action } = useVehicleTypeContext()

    return (
        data &&
            (action === 'delete') ?
            <DeleteForm />
            :
            <FormikForm />
    )

}

export default EntryForm

const FormikForm = () => {

    const { selectedVehicleType: initialValues,
        entryMode, action,
        handleMutation, setModalOpen } = useVehicleTypeContext()
    const [isScrollable, setIsScrollable] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const scrollableDivRef = useRef(null);

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting }) => {
            // setIsProcessing(true)
            handleMutation(values)
                .then(() => {
                    console.log('hello...')
                    setModalOpen(false)
                })
                .finally(() => {

                    setTimeout(() => {
                        // alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                        console.log('hello... finally')
                    });

                }, 1000);
        }
    })



    return (
        <div className="grid grid-rows-[1fr] h-full max-h-full relative">


            <form onSubmit={formik.handleSubmit} className="flex flex-col h-full ">
                {/* Scrollable Content */}

                <div className="grid flex-1 gap-4 overflow-y-auto grid-rows-auto">
                    <div className="flex flex-col w-6/12 gap-8 mx-auto max-h-80"> 

                        <FormikInputBox formik={formik} name="name" label="Name" />


                    </div>
                </div>

                {/* Fixed Footer with Save Button */}
                <div className="sticky bottom-0 flex items-center justify-center px-4 py-4 mt-2 border-t-6 border-blue-300/50 dark:border-blue-300/20">
                    <div className="flex items-center gap-2 text-red-600">
                        {action === "delete" && "Are your sure you want to delete this entry?"}
                    </div>
                    <Button type="submit" className="flex items-center gap-2 btn bg-primary btn-wide" disabled={formik.isSubmitting}>
                        {formik.isSubmitting && (
                            <Loader className="w-6 h-6 ml-n2 animate-spin" />

                        )}
                        {action === "delete" ? "Delete" : "Save"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
const DeleteForm = () => {

    const { selectedVehicleType: initialValues,
        entryMode, action,
        handleMutation, setModalOpen } = useVehicleTypeContext()
    const [isScrollable, setIsScrollable] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const scrollableDivRef = useRef(null);

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting }) => {
            // setIsProcessing(true)
            handleMutation(values)
                .then(() => {
                    setModalOpen(false)
                })
                .finally(() => {

                    setTimeout(() => {
                        // alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                        console.log('hello... finally')
                    });

                }, 1000);
        }
    })

    const handleScroll = () => {
        if (scrollableDivRef.current) {
            const { scrollTop } = scrollableDivRef.current;
            setIsScrolled(scrollTop > 0); // Check if scrolled
        }
    };

    useEffect(() => {
        const checkScrollable = () => {
            if (scrollableDivRef.current) {
                const { scrollHeight, clientHeight } = scrollableDivRef.current;
                setIsScrollable(scrollHeight > clientHeight); // Check if content is scrollable
            }
        };
        checkScrollable();
        window.addEventListener('resize', checkScrollable); // Re-check on resize
        return () => window.removeEventListener('resize', checkScrollable);
    }, []);


    return (
        <div className="grid grid-rows-[1fr] h-full max-h-full relative">


            <form onSubmit={formik.handleSubmit} className="flex flex-col h-full ">
                {/* Scrollable Content */}

                <div ref={scrollableDivRef}
                    onScroll={handleScroll} className="grid flex-1 gap-4 overflow-y-auto grid-rows-auto">

                </div>

                {/* Fixed Footer with Save Button */}
                <div className="sticky bottom-0 flex flex-col items-center justify-center gap-4 px-4 py-4 mt-2 border-blue-300/50 dark:border-blue-300/20">
                    <div className="flex items-start justify-center gap-2 px-4 text-xl text-center text-red-600 dark:text-red-400">
                        {action === "delete" && ' Are you absolutely sure you want to permanently delete this record? This action is irreversible and cannot be undone. '}
                    </div>
                    <div className="flex flex-row gap-4 px-4 py-4 mt-2 border-t-2 border-blue-300/50 dark:border-blue-300/20">
                        <Button type="submit" className="flex items-center gap-2 bg-red-400 btn dark:bg-red-500 btn-wide" disabled={formik.isSubmitting}>
                            {formik.isSubmitting && (
                                <Loader className="w-6 h-6 ml-n2 animate-spin" />

                            )}
                            {action === "delete" ? "Delete" : "Save"}
                        </Button>
                        <Button type="button"
                            onClick={() => setModalOpen(false)} className="flex items-center gap-2 btn bg-background btn-wide"  >
                            {"Cancel"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}