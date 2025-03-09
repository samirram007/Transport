
import { useFormik } from 'formik';
import * as Yup from "yup";



import { FormikSubmit } from '@/components/form-components/FormikSubmit';

import { FiscalYearSelect } from '@/modules/GlobalData/components/Selector/FiscalYearSelect';
import { SchoolSelect } from '@/modules/GlobalData/components/Selector/SchoolSelect';
import { StudentFilterSelect } from '@/modules/GlobalData/components/Selector/StudentFilterSelect';
import { TbFilterSearch } from 'react-icons/tb';
import { useRiderDataContext } from '../contexts/features/useRiderDataContext';


const validationSchema = Yup.object().shape({
    campus_id: Yup.number().integer()
    //     .min(1, "Please select Campus")
    //     .required("Please select Campus"),
    // academic_session_id: Yup.number().integer()
    //     .min(1, "Please select Academic session")
    //     .required("Please select Academic session"),
    // academic_class_id: Yup.number().integer()
    //     .min(1, "Please select Class")
    //     .required("Please select Class")
})


const Filter = ({ handleModalClose }) => {
    const { fetchedData, initialFilterValues } = useRiderDataContext()
    const formik = useFormik({
        initialValues: initialFilterValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting }) => {
            Object.assign(initialFilterValues, values);
            //setInitialFilterValues(prev => ({ ...prev, ...values }))
            // console.log("This Values",initialFilterValues)
            fetchedData.refetch()
            setSubmitting(false)
            handleModalClose()

        },
        onError: (errors, values, { setSubmitting }) => {
            setSubmitting(false)

        }

    })


    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className='grid grid-cols-1 '>


                    <div className='flex flex-col gap-4 p-4 mb-2 '>
                        {/* <div className='col-span-1 font-bold text-md'>Filter</div> */}
                        <div className='col-span-2 '>

                            <StudentFilterSelect formik={formik} />


                        </div>
                        <div className='col-span-2 '>

                            <FiscalYearSelect formik={formik} disabled={true} />

                        </div>

                        <div className='col-span-2 '>

                            <SchoolSelect formik={formik} name='schoolId' label={'School'} />

                        </div>

                        <div className={' flex flex-col justify-end items-center '}>

                            <FormikSubmit formik={formik}
                                label={<>
                                    <TbFilterSearch /> Filter
                                </>} />
                        </div>



                    </div>


                </div>
            </form>
        </div>
    )
}

export default Filter

