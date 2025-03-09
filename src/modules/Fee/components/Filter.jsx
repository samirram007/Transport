
import { useFormik } from 'formik';

import { FormikInputBox } from '@/components/form-components/FormikInputBox';
import { FormikSubmit } from '@/components/form-components/FormikSubmit';
import { FiscalYearSelect } from '@/modules/GlobalData/components/Selector/FiscalYearSelect';
import { TbFilterSearch } from 'react-icons/tb';
import * as Yup from "yup";
import { useFeeDataContext } from '../contexts/features/useFeeDataContext';






const validationSchema = Yup.object().shape({
    fiscalYearId: Yup.number().integer()
    //     .min(1, "Please select Campus")
    //     .required("Please select Campus"),
    // academic_session_id: Yup.number().integer()
    //     .min(1, "Please select Academic session")
    //     .required("Please select Academic session"),
    // academic_class_id: Yup.number().integer()
    //     .min(1, "Please select Class")
    //     .required("Please select Class")
})


const Filter = () => {

    const { fetchedData, initialFilterValues, setInitialFilterValues } = useFeeDataContext()

    //  console.log(initialFilterValues);
    // console.log(DateTime.fromISO(new Date().toLocaleString(DateTime.DATE_MED) ));
    //  const mData = FeeData.data?.data ?? [];
    const formik = useFormik({
        initialValues: initialFilterValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting }) => {
            //  Object.assign(initialFilterValues, values);
            setSubmitting(false)
            setInitialFilterValues(prev => ({ ...prev, ...values }))


            //  handleModalClose()

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

                            <FiscalYearSelect formik={formik} />

                        </div>
                        <div className='col-span-2 '>

                            <FormikInputBox type={'date'} formik={formik} name={'from'} label={'From'} />

                        </div>
                        <div className='col-span-2 '>

                            <FormikInputBox type={'date'} formik={formik} name={'to'} label={'To'} />

                        </div>




                        <div className={' flex flex-col justify-end items-center '}>

                            <FormikSubmit formik={formik}
                                label={<>
                                    <TbFilterSearch /> Filter
                                </>} />
                        </div>
                        <div className='col-span-3 '>  </div>
                    </div>
                </div>


            </form >
        </div >
    )
}

export default Filter

