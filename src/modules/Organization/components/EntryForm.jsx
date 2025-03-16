
import { useFormik } from 'formik';
import * as Yup from "yup";


import { FormikInputBox } from '@/components/form-components/FormikInputBox';
import { ImageBox } from '@/components/form-components/ImageBox';

import FormikDeleteForm from '@/components/form-components/FormikDeleteForm';
import FormikSubmitPanel from '@/components/form-components/FormikSubmitPanel';
import { useOrganizationContext } from '../context/features/useOrganizationContext';



const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required("Name is required"),

})



const EntryForm = () => {
    const { selectedOrganization: data, action } = useOrganizationContext()

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

    const { selectedOrganization: initialValues,
        entryMode, action,
        handleMutation, setModalOpen } = useOrganizationContext()

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

                <div className="flex-1 overflow-y-auto grid grid-rows-auto gap-4">
                    <div className=" flex flex-col gap-8 max-h-80 w-6/12 mx-auto">
                        <ImageBox formik={formik} name="logoImageId" editable={true} resource="logo_image" />

                        <FormikInputBox formik={formik} name="name" label="Name" />

                        <FormikInputBox formik={formik} name="code" label="Code" />
                        <FormikInputBox formik={formik} name="establishmentDate" type="date" label="Date of Establishment" />
                        <FormikInputBox formik={formik} name="email" type="email" label="Email" />
                        <FormikInputBox formik={formik} name="contactNo" type="text" label="Contact Number" />
                        <FormikInputBox formik={formik} name="website" type="text" label="Website" />

                    </div>
                </div>

                {/* Fixed Footer with Save Button */}
                <FormikSubmitPanel formik={formik} />

            </form>
        </div>
    );
}
const DeleteForm = () => {

    const { selectedOrganization: initialValues,
        entryMode, action,
        handleMutation, setModalOpen } = useOrganizationContext()

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