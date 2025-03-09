import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { LuLoader } from 'react-icons/lu';

import * as Yup from "yup";

import { FormikInputBox } from '@/components/form-components/FormikInputBox';


import FormikDeleteForm from '@/components/form-components/FormikDeleteForm';
import FormikSubmitPanel from '@/components/form-components/FormikSubmitPanel';
import { SchoolSelect } from '@/modules/GlobalData/components/Selector/SchoolSelect';
import { useFeeHeads } from '../../FeeHead/hooks/queries';
import { useFeeContext } from '../contexts/features/useFeeContext';
import RiderSearchContextProvider from '../contexts/RiderSearchContextProvider';
import SearchRider from './SearchRider';
const validationSchema = Yup.object().shape({
    total_amount: Yup.string()
        .required("Amount is required"),
})

const EntryForm = () => {
    const { selectedFee: data, action } = useFeeContext()

    return (
        data &&
            (action === 'delete') ?
            <DeleteForm />
            :
            (
                (action === 'create') ?
                    <RiderSearchContextProvider>
                        <SearchRider />
                    </RiderSearchContextProvider>
                    :
                    <FormikForm />
            )
    )

}

export default EntryForm

const FormikForm = () => {


    const { selectedFee: initialValues,
        handleMutation, setModalOpen } = useFeeContext()


    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting }) => {
            // setIsProcessing(true)
            const total_amount = values.fee_items.reduce((x, i) => x + parseFloat(i.total_amount), 0)
            if (total_amount == 0) {
                toast.info(<HTMLContent htmlString={'Please add some item'} />)
                return
            }
            values.total_amount = total_amount
            values.paid_amount = total_amount
            values.balance_amount = 0
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
    console.log('FormikForm', formik)

    return (
        <div className='mx-auto w-100'>
            <form onSubmit={formik.handleSubmit}>
                <div className='grid grid-cols-1 '>
                    <div className='grid grid-flow-row grid-cols-6 gap-5 md:grid-flow-col'>
                        <div className='grid col-span-6 gap-4 px-4 pb-2 mb-2 '>
                            <div className='grid grid-cols-12 gap-4 mb-2'>
                                {/* <div className='col-span-1 font-bold text-md'>Filter</div> */}
                                <div className='col-span-6 md:col-span-3 '>
                                    <SchoolSelect formik={formik} />


                                </div>
                                <div className='col-span-6 md:col-span-2 '>

                                    {/* <FiscalYearSelect formik={formik} /> */}

                                </div>
                                <div className=' md:col-span-5'></div>
                                <div className='flex flex-col items-center justify-end col-span-6 md:col-span-2 '>

                                    <FormikInputBox formik={formik} type={"date"} extClass={'align-self-right'} name="feeDate" label="Date" />


                                </div>


                            </div>

                        </div>
                    </div>
                    <div className='flex flex-row justify-center'>
                        <div className='badge badge-success'>Fees</div>
                    </div>
                    <div className='grid grid-cols-6 gap-5 px-4 pb-2 mb-2 border-b-2 border-blue-300/30'>
                        <div className='col-span-4'>Particulars</div>
                        <div className='text-right'>Amount</div>
                        <div className='text-center'>Action</div>
                    </div>
                    {/* <FeeItemNew formik={formik} changes={changes} setChanges={setChanges} />

                    <FeeItems formik={formik} changes={changes} setChanges={setChanges} /> */}

                </div>
                <FormikSubmitPanel formik={formik} />
            </form>
        </div>
    )
}
const DeleteForm = () => {

    const { selectedFee: initialValues,
        handleMutation, setModalOpen } = useFeeContext()

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


export const FeeItems = ({ formik, changes, setChanges }) => {
    const [feeItemsData, setFeeItemsData] = useState(formik.values.fee_items)
    useEffect(() => {
        setFeeItemsData(prev => formik.values.fee_items)

    }, [changes]);
    // console.log(formik.values.fee_items);
    return (
        <>


            {
                feeItemsData && feeItemsData.map((fee_item, index) => (
                    <FeeItemRow key={index} fee_item={fee_item} />
                ))
            }


        </>
    )
}

const FeeItemRow = ({ fee_item }) => {

    return (
        <>

            <div className='grid grid-cols-6 gap-5 px-4 pb-2 mb-2 border-b-2 border-blue-300/30'>
                <div className='col-span-4'>{fee_item.fee_head.name}</div>
                <div className='text-right'>{fee_item.total_amount}</div>
                <div className='text-center'><button type="button">Edit</button></div>
            </div>

        </>
    )
}
const HTMLContent = ({ htmlString }) => (
    <div dangerouslySetInnerHTML={{ __html: htmlString }} />
);
export const FeeItemNew = ({ formik, changes, setChanges }) => {
    const totalAmountRef = useRef()
    const feeHeadRef = useRef()
    const FeeHeadData = useFeeHeads();
    if (FeeHeadData.isLoading) return <LuLoader />;
    // const initData={...formik.initialValues.fee_items[0], fee_head_id: '', amount: ''}



    const addFee = () => {
        const existingHead = formik.values.fee_items.find(x => x.fee_head_id == feeHeadRef.current.value)

        let errorString = ""
        if (existingHead) {
            errorString += "<p>Duplicate Entry</p>"
        }
        if (feeHeadRef.current.value <= 0) {
            errorString += "<p>Fee head is required</p>"
        }
        if (totalAmountRef.current.value <= 0) {
            errorString += "<p>Amount is required</p>"
        }
        if (errorString.length > 0) {
            toast.info(<HTMLContent htmlString={errorString} />)
            return
        }

        const initData = {
            fee_head_id: parseFloat(feeHeadRef.current.value),
            fee_head: FeeHeadData.data.data.find(x => x.id == feeHeadRef.current.value),
            quantity: 1,
            amount: parseFloat(totalAmountRef.current.value),
            total_amount: parseFloat(totalAmountRef.current.value)
        }

        formik.values.fee_items.push(initData)
        setChanges(prev => prev + 1)
        // console.log( formik.values.fee_items);

    }
    const handleDropdownChange = (event) => {

        const { name, value } = event.target;
        // console.log(name, value);
    }

    return (
        <>


            <div className='grid grid-cols-12 gap-5 px-4 pb-2 mb-2 border-b-2 border-blue-300/30'>
                <div className='col-span-4'>
                    {/* <FormikInputBox formik={formik} type={"text"} name={`fee_items.particulars`} label="" /> */}
                    {/* <input                className={`  input mb-0 input-bordered input-primary    ${formik.errors[name]? 'input-error' : ''}`}/> */}
                    <select ref={feeHeadRef}
                        onChange={handleDropdownChange}

                        className={`select  w-full  select-primary`}
                    >
                        <option value='0'      >-- please select</option>
                        {
                            FeeHeadData.data.data &&
                            FeeHeadData.data.data.map(({ id: key, name: value }, index) => (
                                <option key={index} value={key}>{value}</option>
                            ))
                        }
                    </select>
                </div>
                <div className='col-span-4'></div>
                <div className='col-span-2 text-right'>
                    <input type={"number"} ref={totalAmountRef} step={"100"} className={`  input mb-0 input-bordered input-primary  `} />
                </div>

                <div className='col-span-2 text-center'>
                    <button type="button" onClick={addFee} className='btn btn-primary btn-sm btn-rounded'>Add</button>
                </div>
            </div>


        </>
    )
}
