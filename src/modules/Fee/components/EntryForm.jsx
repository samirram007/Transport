import { useFormik } from 'formik';
import { useRef, useState } from 'react';
import { LuLoader } from 'react-icons/lu';

import * as Yup from "yup";

import { FormikInputBox } from '@/components/form-components/FormikInputBox';


import FormikDeleteForm from '@/components/form-components/FormikDeleteForm';
import FormikSubmitPanel from '@/components/form-components/FormikSubmitPanel';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { CardContent } from '@/components/ui/card';
import { capitalizeFirstLetter } from '@/lib/removeEmptyStrings';
import { toast } from 'sonner';
import { useFeeHeads } from '../../FeeHead/hooks/queries';
import { useFeeContext } from '../contexts/features/useFeeContext';
import RiderSearchContextProvider from '../contexts/RiderSearchContextProvider';
import SearchRider from './SearchRider';
const validationSchema = Yup.object().shape({
    totalAmount: Yup.string()
        .required("Amount is required"),
})

const EntryForm = () => {
    const { selectedFee: data, action } = useFeeContext()
    console.log(data, action)
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
            const totalAmount = values.feeItems.reduce((x, i) => x + parseFloat(i.totalAmount), 0)
            if (totalAmount == 0) {
                toast.info(<HTMLContent htmlString={'Please add some item'} />)
                return
            }
            values.totalAmount = totalAmount
            values.paidAmount = totalAmount
            values.balanceAmount = 0
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
        <div className='mx-auto w-full max-w-4xl p-2'>
            <form onSubmit={formik.handleSubmit}>
                <div className='grid grid-cols-1 '>
                    <div className='flex flex-row justify-between items-start mb-2'>

                        <RiderContent />
                        <div>
                            <FormikInputBox formik={formik} type={"text"} name="feeNo" label="Fee No." extClass={'text-right'} readOnly={true} />
                            <FormikInputBox formik={formik} type={"date"} extClass={'text-right'} name="feeDate" label="Date" />
                            <FormikInputBox formik={formik} type={"text"} name="paymentMode" label="Payment Mode" extClass={'text-right'} readOnly={true} disabled />

                        </div>
                    </div>
                    <div className='flex flex-row justify-center '>
                        <div className='badge badge-success hidden'>Fees Details</div>
                    </div>
                    <div className='grid grid-cols-10 gap-5 px-4 pb-2 mb-2 border-b-2 border-blue-300/30'>
                        <div className='col-span-2'>Particulars</div>
                        <div className='col-span-6'>Unit</div>
                        <div className='text-right'>Amount</div>
                        <div className='text-center'>Action</div>
                    </div>


                    <FeeItems formik={formik} />

                </div>
                <div className='grid grid-cols-10 gap-5 px-4 pb-2 mb-2 border-b-2 border-blue-300/30'>
                    <div className='col-span-2'></div>
                    <div className='col-span-6 text-right'>Total: </div>
                    <div className=' text-right'>{formik.values.totalAmount}</div>

                    <div className='text-center'>...</div>
                </div>
                {/* <FormikInputBox formik={formik} type={"number"} name="paidAmount" label="Paid Amount" extClass={'text-right'} readOnly={true} /> */}
                <FormikInputBox formik={formik} type={"text"} name="note" label="Note" extClass={'text-left'} readOnly={true} />
                {/* <InfoRow label="Note" value={initialValues.note ?? 'N/A'} /> */}
                <FormikSubmitPanel formik={formik} />
            </form>
        </div>
    )
}

const RiderContent = () => {
    const { selectedFee: data } = useFeeContext()
    return (
        <CardContent className='flex flex-col items-start gap-4 p-0 pl-6 border-2 rounded-md shadow-md border-slate-600/50'>

            <div className="flex min-w-full flex-col gap-2  items-start  max-h-[15rem] overflow-y-auto scrollbar-thin scrollbar-thumb-teal-500 scrollbar-track-teal-200">
                <div className="flex items-start justify-between gap-3   pb-2">
                    <div className="flex-1">
                        <p className="text-lg font-semibold"><strong>Student</strong>
                            <span>: </span>{data?.rider.name}</p>
                        <p className="text-sm"><strong>School</strong>
                            <span>: </span> {data?.rider.school?.name} ({capitalizeFirstLetter(data?.rider.schoolTime)})</p>
                        <div className="w-full flex flex-row justify-between mt-0 text-sm gap-2">
                            <div className="grid grid-cols-[40px_5px_1fr]">
                                <strong>Code</strong>
                                <span>: </span>
                                <div>{capitalizeFirstLetter(data?.rider.code ?? 'n/a')}</div>
                            </div>
                            <div className="grid grid-cols-[40px_5px_1fr]">
                                <strong>Class</strong>
                                <span>: </span>
                                <div>{capitalizeFirstLetter(data?.rider.standard)}</div>
                            </div>
                            <div className="grid grid-cols-[40px_5px_1fr]">
                                <strong>Roll</strong>
                                <span>: </span>
                                <div>{data?.rider.rollNo}</div>
                            </div>

                        </div>
                        <div className="grid grid-cols-[40px_5px_1fr] pb-2">
                            <strong>Fee</strong>
                            <span>:</span>
                            <div>₹{data?.rider.monthlyCharge}</div>
                        </div>
                    </div>
                    <Avatar className="shadow-lg w-14 h-14">
                        <AvatarImage src={data?.rider.profileDocument?.path} alt={data?.rider.name} />
                    </Avatar>

                </div>


                {/* <InfoRow label="DOB" value={moment(data.dob).format("DD-MM-YYYY")} />
                  <InfoRow label="Address" value={data.address?.display} />
                  <InfoRow label="Gender" value={upperCaseFirstLetter(data.gender)} />
                  <InfoRow label="Nationality" value={upperCaseFirstLetter(data.nationality)} />
                  <InfoRow label="Religion" value={upperCaseFirstLetter(data.religion)} />
                  <InfoRow label="Caste" value={upperCaseFirstLetter(data.caste)} />
                  <InfoRow label="Language" value={upperCaseFirstLetter(data.language)} />
                  <InfoRow label="Aadhaar No." value={upperCase(data.aadhaarNo ?? 'n/a')} /> */}


            </div>
        </CardContent>
    )
}

const InfoRow = ({ label, value }) => {
    return (
        <div className="text-sm text-gray-500 gap-1 grid grid-cols-[90px_5px_1fr]  ">
            <div className='text-nowrap text-slate-500'>{label}</div>
            <div> : </div>
            <div className="pr-2 truncate whitespace-normal line-clamp-2 ">{value}</div>
        </div>
    );
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


export const FeeItems = ({ formik }) => {
    const [feeItemsData, setFeeItemsData] = useState(formik.values.feeItems)
    // useEffect(() => {
    //     setFeeItemsData(prev => formik.values.feeItems)

    // }, [changes]);
    console.log("FormikFeeItems", formik.values.feeItems);
    return (
        <>


            {
                feeItemsData && feeItemsData.map((feeItem, index) => (
                    <FeeItemRow key={index} feeItem={feeItem} />
                ))
            }


        </>
    )
}

const FeeItemRow = ({ feeItem }) => {
    console.log("feeItem", feeItem);

    return (
        <>

            <div className='grid grid-cols-10 gap-5 px-4 pb-2 mb-2 border-b-2 border-blue-300/30'>
                <div className='col-span-2'>{feeItem.feeHead.name}</div>
                <div className='col-span-6'><FeeMonths feeItemMonths
                    ={feeItem.feeItemMonths
                    } /></div>
                <div className='text-right'>{feeItem.totalAmount}</div>
                <div className='text-center'><button type="button">...</button></div>
            </div>

        </>
    )
}
const HTMLContent = ({ htmlString }) => (
    <div dangerouslySetInnerHTML={{ __html: htmlString }} />
);
const FeeMonths = ({ feeItemMonths }) => {

    return (
        <div className='flex flex-row gap-2'>
            {
                feeItemMonths && feeItemMonths.map((item, index) => (
                    <div key={index} className='badge badge-primary border border-green-500 px-2 py-1 rounded-xl badge-outline badge-sm'>{item.month.name} {item.year}</div>
                ))
            }

            {/* Fee months content goes here */}
        </div>
    );
};

export const FeeItemNew = ({ formik, changes, setChanges }) => {
    const totalAmountRef = useRef()
    const feeHeadRef = useRef()
    const FeeHeadData = useFeeHeads();
    if (FeeHeadData.isLoading) return <LuLoader />;
    // const initData={...formik.initialValues.feeItems[0], feeHeadId: '', amount: ''}



    const addFee = () => {
        const existingHead = formik.values.feeItems.find(x => x.feeHeadId == feeHeadRef.current.value)

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
            feeHeadId: parseFloat(feeHeadRef.current.value),
            feeHead: FeeHeadData.data.data.find(x => x.id == feeHeadRef.current.value),
            quantity: 1,
            amount: parseFloat(totalAmountRef.current.value),
            totalAmount: parseFloat(totalAmountRef.current.value)
        }

        formik.values.feeItems.push(initData)
        setChanges(prev => prev + 1)
        // console.log( formik.values.feeItems);

    }
    const handleDropdownChange = (event) => {

        const { name, value } = event.target;
        // console.log(name, value);
    }

    return (
        <>


            <div className='grid grid-cols-12 gap-5 px-4 pb-2 mb-2 border-b-2 border-blue-300/30'>
                <div className='col-span-4'>
                    {/* <FormikInputBox formik={formik} type={"text"} name={`feeItems.particulars`} label="" /> */}
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
