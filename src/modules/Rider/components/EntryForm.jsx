import { useFormik } from 'formik';
import * as Yup from "yup";






import { FormikInputBox } from '@/components/form-components/FormikInputBox';
import { ImageBox } from '@/components/form-components/ImageBox';

import FormikDeleteForm from '@/components/form-components/FormikDeleteForm';
import FormikSubmitPanel from '@/components/form-components/FormikSubmitPanel';

import { useRiderContext } from '../contexts/features/useRiderContext';

import { SchoolSelect } from '@/modules/GlobalData/components/Selector/SchoolSelect';
import { SectionSelect } from '@/modules/GlobalData/components/Selector/SectionSelect';
import { SlotSelect } from '@/modules/GlobalData/components/Selector/SlotSelect';
import { StandardSelect } from '@/modules/GlobalData/components/Selector/StandardSelect';
import { VehicleSelect } from '@/modules/GlobalData/components/Selector/VehicleSelect';
import { useSchoolContext } from '@/modules/School/context/features/useSchoolContext';



const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required("Name is required"),
    dob: Yup.date()
        .typeError('Invalid date format'),
    admissionDate: Yup.date()
        .typeError('Invalid date format'),
})
const EntryForm = () => {
    const { selectedRider: data, action } = useRiderContext()

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


    const { selectedRider: initialValues, 
        handleMutation, setModalOpen } = useRiderContext()


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
                        setSubmitting(false);
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
                        <ImageBox formik={formik} name="profileDocumentId" editable={true} resource="logoImage" />

                        <FormikInputBox formik={formik} name="name" label="Name" />
                        <FormikInputBox formik={formik} name="code" label="Code" />
                        <FormikInputBox formik={formik} name="contactNo" type={'text'} label="Contact Number" />
                        <SchoolSelect formik={formik} />
                        <StandardSelect formik={formik} />
                        <SectionSelect formik={formik} />
                        
                        <FormikInputBox formik={formik} name="rollNo" type={'text'} label="Roll Number" />

                        <VehicleSelect formik={formik} />
                        <SlotSelect formik={formik} />

                        <FormikInputBox formik={formik} name="monthlyCharge" type={'number'} label="Fee"  />
                        {/* <GuardianEntryPanel formik={formik} />
                        <AddressEntryPanel formik={formik} /> */}
                        {/* {
                            entryMode == 'edit' &&
                            <>
                                <Guardians formik={formik} name="guardians" label="Guardian" />
                                <Addresses formik={formik} name="addresses" label="Address" />
                            </>
                        } */}



                        {/* <CampusSelect formik={formik} auto={false} /> */}

                        {/* <FiscalYearSelect formik={formik} label={'Fiscal Year'} />   */}



                    </div>
                </div>
                <FormikSubmitPanel formik={formik} />


            </form>
        </div>
    )
}

const DeleteForm = () => {

    const { selectedSchool: initialValues,
        handleMutation, setModalOpen } = useSchoolContext()

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
                    });

                }, 1000);
        }
    })


    return (
        <FormikDeleteForm formik={formik} setModalOpen={setModalOpen} />
    );
}