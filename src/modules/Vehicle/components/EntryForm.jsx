
import { useFormik } from 'formik';
import * as Yup from "yup";


import { FormikInputBox } from '@/components/form-components/FormikInputBox';
import { ImageBox } from '@/components/form-components/ImageBox';

import FormikDeleteForm from '@/components/form-components/FormikDeleteForm';
import FormikSubmitPanel from '@/components/form-components/FormikSubmitPanel';
import { EducationBoardSelect } from '@/modules/GlobalData/components/Selector/EducationBoardSelect';
import { VehicleTypeSelect } from '@/modules/GlobalData/components/Selector/VehicleTypeSelect';
import { useVehicleContext } from '../context/features/useVehicleContext';



const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required("Name is required"),

})



const EntryForm = () => {
    const { selectedVehicle: data, action } = useVehicleContext()

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

    const { selectedVehicle: initialValues,
        entryMode, action,
        handleMutation, setModalOpen } = useVehicleContext()

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
                        {/* <ImageBox formik={formik} name="logoImageId" editable={true} resource="logo_image" />  */}
                        <FormikInputBox formik={formik} name="name" label="Name" />
                        <VehicleTypeSelect formik={formik} name="vehicleTypeId" label="Vehicle Type" />

                        <FormikInputBox formik={formik} name="registration_no" label="Registration No" />
                        <FormikInputBox formik={formik} name="registration_date" type="date" label="Registration Date" />
                        <FormikInputBox formik={formik} name="registration_valid_date" type="date" label="valid Date" />
                        <FormikInputBox formik={formik} name="chassis_no" type="text" label="Chassis no" />
                        <FormikInputBox formik={formik} name="engine_no" type="text" label="Engine no" />
                        <FormikInputBox formik={formik} name="color" type="text" label="color" />
                        <FormikInputBox formik={formik} name="capacity" type="number" label="Capacity" />

                    </div>
                </div>

                {/* Fixed Footer with Save Button */}
                <FormikSubmitPanel formik={formik} />

            </form>
        </div>
    );
}
const DeleteForm = () => {

    const { selectedVehicle: initialValues,
        entryMode, action,
        handleMutation, setModalOpen } = useVehicleContext()

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