
import { useFormik } from 'formik';
import * as Yup from "yup";


import { FormikInputBox } from '@/components/form-components/FormikInputBox';
import { ImageBox } from '@/components/form-components/ImageBox';

import FormikDeleteForm from '@/components/form-components/FormikDeleteForm';
import FormikSubmitPanel from '@/components/form-components/FormikSubmitPanel';
import { EducationBoardSelect } from '@/modules/GlobalData/components/Selector/EducationBoardSelect';
import { SlotTypeSelect } from '@/modules/GlobalData/components/Selector/SlotTypeSelect';
import { useSlotContext } from '../context/features/useSlotContext';
import { VehicleSelect } from '@/modules/GlobalData/components/Selector/VehicleSelect';



const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required("Name is required"),

})



const EntryForm = () => {
    const { selectedSlot: data, action } = useSlotContext()

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

    const { selectedSlot: initialValues,
        entryMode, action,
        handleMutation, setModalOpen } = useSlotContext()
    
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

                <div   className="grid flex-1 gap-4 overflow-y-auto grid-rows-auto">
                    <div className="flex flex-col w-6/12 gap-8 mx-auto max-h-80"> 
                        <VehicleSelect formik={formik} name="vehicleId" label="Vehicle" />
                        <SlotTypeSelect formik={formik}  />
                        <FormikInputBox formik={formik} name="name" label="Name" />
 
                        <FormikInputBox formik={formik}  name="startTime" type="time" label="Start time" />
                        <FormikInputBox formik={formik} name="endTime" type="time" label="End time" />
                        <FormikInputBox formik={formik} name="capacity" type="text" label="Capacity" />
                        
 
                    </div>
                </div>

                {/* Fixed Footer with Save Button */}
                <FormikSubmitPanel formik={formik}  />
               
            </form>
        </div>
    );
}
const DeleteForm = () => {

    const { selectedSlot: initialValues,
        entryMode, action,
        handleMutation, setModalOpen } = useSlotContext() 

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
       <FormikDeleteForm formik={formik} action={action} setModalOpen={setModalOpen} />
    );
}