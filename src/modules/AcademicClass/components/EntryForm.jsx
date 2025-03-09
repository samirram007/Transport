
import { useFormik } from 'formik';
import * as Yup from "yup";


import { FormikInputBox } from '@/components/form-components/FormikInputBox';

import { Button } from '@/components/ui/button';


import { AcademicClassSelect } from '@/modules/GlobalData/components/Selector/AcademicClassSelect';
import { Loader } from 'lucide-react';
import { useRef, useState } from 'react';
import { useAcademicClassContext } from '../context/features/useAcademicClassContext';


const validationSchema = Yup.object().shape({
    class: Yup.string()
        .required("Class is required"),
    start_date: Yup.date()
        .typeError('Invalid date format')
        .required('Start Date is required'),
    end_date: Yup.date()
        .typeError('Invalid date format')
        .when('start_date', (start_date, schema) => {
            return (start_date ? schema.min(start_date, 'End date must be later than the start date') : schema)
        }),
})



const EntryForm = () => {
    const { selectedAcademicClass: data, action } = useAcademicClassContext()

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

    const { selectedAcademicClass: initialValues,
        entryMode, action,
        handleMutation, setModalOpen } = useAcademicClassContext()
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
        },
        onError:({error})=>(
                console.log(error)
        )
    })
 


    return (
        <div className="grid grid-rows-[1fr] h-full max-h-full relative">
            
            <form onSubmit={formik.handleSubmit} className="flex flex-col h-full ">
                {/* Scrollable Content */}

                <div   className="flex-1 overflow-y-auto grid grid-rows-auto gap-4">
                    <div className=" flex flex-col gap-8 max-h-80 w-6/12 mx-auto">
                        {/* <ImageBox formik={formik} name="logoImageId" editable={true} resource="logo_image" /> */}
                        <div className='py-1'></div>

                        <AcademicClassSelect  formik={formik} name="previousAcademicClassId" label="Previous Class " />
                        <FormikInputBox formik={formik} name="class" label="Class" /> 
                        <AcademicClassSelect  formik={formik} name="nextAcademicClassId" label="Next Class " />
                      
                        <FormikInputBox formik={formik}  name="startDate" type="date" label="Start Date" />
                        <FormikInputBox formik={formik}  name="endDate" type="date" label="End Date" />
                         
 
                    </div>
                </div>

                {/* Fixed Footer with Save Button */}
                <div className="flex justify-center items-center sticky bottom-0 
            border-t-6 border-blue-300/50 dark:border-blue-300/20 py-4 px-4 mt-2">
                    <div className="flex gap-2 items-center text-red-600">
                        {action === "delete" && "Are your sure you want to delete this entry?"}
                    </div>
                    <Button type="submit" className="btn bg-primary btn-wide flex items-center gap-2" disabled={formik.isSubmitting}>
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

    const { selectedAcademicClass: initialValues,
        entryMode, action,
        handleMutation, setModalOpen } = useAcademicClassContext()
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

    

    return (
        <div className="grid grid-rows-[1fr] h-full max-h-full relative">


            <form onSubmit={formik.handleSubmit} className="flex flex-col h-full ">
                {/* Scrollable Content */}

                 

                {/* Fixed Footer with Save Button */}
                <div className="flex flex-col gap-4 justify-center items-center sticky bottom-0 
              border-blue-300/50 dark:border-blue-300/20 py-4 px-4 mt-2">
                    <div className="flex gap-2 text-xl items-start
                     text-red-600 dark:text-red-400 px-4 justify-center text-center">
                        {action === "delete" && ' Are you absolutely sure you want to permanently delete this record? This action is irreversible and cannot be undone. '}
                    </div>
                    <div className="flex flex-row gap-4 border-t-2 border-blue-300/50 dark:border-blue-300/20 py-4 px-4 mt-2">
                        <Button type="submit" className="btn bg-red-400 dark:bg-red-500 btn-wide flex items-center gap-2" disabled={formik.isSubmitting}>
                            {formik.isSubmitting && (
                                <Loader className="w-6 h-6 ml-n2 animate-spin" />

                            )}
                            {action === "delete" ? "Delete" : "Save"}
                        </Button>
                        <Button type="button" 
                        onClick={()=>setModalOpen(false)} className="btn bg-background btn-wide flex items-center gap-2"  >
                            {"Cancel"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}