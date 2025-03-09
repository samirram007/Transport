import * as Yup from "yup";

import { useFormik } from 'formik';
import {
    useDeletePromotionMutation,
    useStorePromotionMutation,
    useUpdatePromotionMutation
} from '../hooks/mutations';


import { FormikInputBox } from "@/components/form-components/FormikInputBox";
import { CampusSelect } from '../../Common/components/CampusSelect';



const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required("Name is required"),

})

const EntryForm = ({ initialValues, entryMode }) => {

    const promotionStoreMutation = useStorePromotionMutation()
    const promotionUpdateMutation = useUpdatePromotionMutation()
    const promotionDeleteMutation = useDeletePromotionMutation()

    const handleFormSubmit = (values) => {
        if (entryMode === 'create') {
            promotionStoreMutation.mutate(values)
        } else if (entryMode === 'edit') {

            promotionUpdateMutation.mutate(values)

        } else if (entryMode === 'delete') {

            promotionDeleteMutation.mutate(values)

        }
        else {
            console.info('Invalid entry mode')
        }
    }



    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: values => {
            handleFormSubmit(values)
        },
    });


    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className='grid grid-cols-1  '>


                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

                        <div>
                            <FormikInputBox formik={formik} name="name" label="Promotion" />

                        </div>
                        <div>
                            <FormikInputBox formik={formik} name="code" label="Code" />

                        </div>
                        <div>
                            <CampusSelect formik={formik}/>
                        </div>

                        <div className='md:col-span-2'>
                            <FormikInputBox formik={formik} name="capacity" label="Capacity" />


                        </div>

                    </div>

                    <div className='order-first'>




                    </div>
                </div>

                <div className='mx-auto flex flex-col justify-center items-center border-t-2 border-blue-300/10 mt-2 pt-6'>
                    <div className='flex gap-2 items-center text-red-600'>

                        {entryMode === 'delete' && "Are your sure you want to delete this entry?"}
                    </div>
                    <button type="submit" className='btn btn-primary btn-wide'>
                        {entryMode === 'delete' ? 'Delete' : 'Save'}
                        {formik.isSubmitting && (
                            <span
                                className='spinner-border spinner-border-sm ms-2'
                                role='status'
                                aria-hidden='true'
                            ></span>
                        )}
                    </button>
                </div>

            </form>
        </div>
    )
}

export default EntryForm