import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { LuLoader } from 'react-icons/lu';

import * as Yup from "yup";

import { FormikInputBox } from '@/components/form-components/FormikInputBox';


import FormikDeleteForm from '@/components/form-components/FormikDeleteForm';
import FormikSubmitPanel from '@/components/form-components/FormikSubmitPanel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SelectNative } from '@/components/ui/select-native';
import { toast } from 'sonner';
import { useExpenseHeads } from '../../ExpenseHead/hooks/queries';
import { useExpenseContext } from '../contexts/features/useExpenseContext';
const validationSchema = Yup.object().shape({
    expenseDate: Yup.date().required("Date is required"),
    voucherNo: Yup.string(),
    totalAmount: Yup.number()
        .required("Amount is required")
        .min(0, "Amount must be greater than 0"),
    expenseItems: Yup.array()
        .min(1, "At least one expense item is required")
        .of(
            Yup.object().shape({
                expenseHeadId: Yup.number().required("Expense head is required"),
                amount: Yup.number().min(0, "Amount must be greater than 0")
            })
        )
})

const EntryForm = () => {
    const { selectedExpense: data, action } = useExpenseContext()

    return (
        data &&
            (action === 'delete') ?
            <DeleteForm />
            :
            (
                (action === 'create') ?
                    <FormikForm />
                    :
                    <FormikForm />
            )
    )

}

export default EntryForm

const FormikForm = () => {
    const [changes, setChanges] = useState(0);

    const { selectedExpense: initialValues,
        handleMutation, setModalOpen } = useExpenseContext()


    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting }) => {
            const totalAmount = values.expenseItems.reduce((x, i) => x + parseFloat(i.amount || 0), 0)
            if (totalAmount === 0) {
                toast.error("Please add at least one expense item with an amount greater than zero")
                setSubmitting(false)
                return
            }
            values.totalAmount = totalAmount
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
    // Ensure expenseItems initialization
    useEffect(() => {
        if (!formik.values.expenseItems) {
            formik.setFieldValue('expenseItems', []);
        }
    }, [formik.values, formik.setFieldValue]);

    // Remove console.log for production
    // Remove console.log for production
    return (
        <div className='mx-auto w-full max-w-4xl'>
            <div className='card bg-base-100 shadow-xl '>
                <div className='card-body'>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='grid grid-cols-1 gap-4'>
                            <div className='flex flex-row justify-center border-b-2  '>
                                <div className='badge badge-lg badge-success px-4 py-1 text-md'>Expenses</div>
                            </div>

                            <div className='flex flex-col md:flex-row justify-between items-center gap-4 p-4 bg-base-200 rounded-lg  '>
                                {/* <h2 className="text-xl font-bold">Expense Entry</h2> */}
                                <div className='w-full grid  grid-cols-[1fr_200px_1fr]   gap-4'>
                                    <div>

                                        <FormikInputBox
                                            formik={formik}
                                            semi
                                            type="text"
                                            name="expenseNo"
                                            label="Expense No"
                                            className='disabled'
                                            disabled
                                        />
                                        <FormikInputBox
                                            formik={formik}
                                            semi
                                            type="text"
                                            name="voucherNo"
                                            label="Voucher No"
                                            className=''
                                        />
                                    </div>
                                    <div className='text-center flex items-center justify-center font-bold underline underline-offset-2 decoration-slate-500'></div>
                                    <div className='flex items-start'>

                                        <FormikInputBox
                                            formik={formik}
                                            semi
                                            type="date"
                                            name="expenseDate"
                                            label="Date"
                                            className='text-right'
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Expense Items Section */}

                            {/* Table Header */}
                            <div className='grid grid-cols-6 gap-5 px-6 py-3 mb-3 bg-base-200 font-semibold rounded-t-lg border-b-2 border-primary/30'>
                                <div className='col-span-4'>Particulars</div>
                                <div className='text-right'>Amount</div>
                                <div className='text-center'>Action</div>
                            </div>

                            {/* Error display */}
                            {formik.errors.expenseItems && !Array.isArray(formik.errors.expenseItems) && (
                                <div className="text-error px-6 mb-4 font-semibold">{formik.errors.expenseItems}</div>
                            )}

                            {/* New expense entry form and existing items */}
                            <ExpenseItemNew formik={formik} changes={changes} setChanges={setChanges} />
                            <ExpenseItems formik={formik} changes={changes} setChanges={setChanges} />
                        </div>
                        <FormikSubmitPanel formik={formik} />
                    </form>
                </div>
            </div>
        </div>
    )
}
const DeleteForm = () => {

    const { selectedExpense: initialValues,
        handleMutation, setModalOpen } = useExpenseContext()

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


export const ExpenseItems = ({ formik, changes, setChanges }) => {
    const [expenseItemsData, setExpenseItemsData] = useState(formik.values.expenseItems || [])

    useEffect(() => {
        setExpenseItemsData(formik.values.expenseItems || [])
    }, [changes, formik.values.expenseItems]);

    if (!expenseItemsData || expenseItemsData.length === 0) {
        return (
            <div className="px-6 py-4 text-center text-gray-500 bg-base-100 rounded-lg border border-base-300 my-4">
                No expense items added yet. Please add items using the form above.
            </div>
        );
    }

    return (
        <div className="expense-items-container rounded-lg overflow-hidden border border-base-300">
            {expenseItemsData.map((expenseItem, index) => (
                <ExpenseItemRow
                    key={index}
                    expenseItem={expenseItem}
                    index={index}
                    formik={formik}
                    setChanges={setChanges}
                />
            ))}

            <div className="grid grid-cols-6 gap-5 px-6 py-4 mt-2 bg-base-200 font-semibold">
                <div className="col-span-4 text-right font-bold">Total:</div>
                <div className="text-right font-bold">
                    {expenseItemsData.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0).toFixed(2)}
                </div>
                <div></div>
            </div>
        </div>
    )
}


const ExpenseItemRow = ({ expenseItem, index, formik, setChanges }) => {
    const handleRemoveItem = () => {
        const updatedItems = [...formik.values.expenseItems];
        updatedItems.splice(index, 1);
        formik.setFieldValue('expenseItems', updatedItems);
        setChanges(prev => prev + 1);
        toast.success("Expense item removed");
    };

    return (
        <>
            <div className='grid grid-cols-6 justify-center gap-5 px-6  border-b border-base-300 hover:bg-base-200/50 transition-colors'>
                <div className='col-span-4 px-2 flex justify-start items-center'>{expenseItem.expenseHead.name}</div>
                <div className='text-right px-2 flex justify-end items-center'>{expenseItem.amount}</div>
                <div className='text-center px-2 flex justify-center items-center'>
                    <Button
                        variant={'destructive'}
                        type="button"
                        className="btn btn-error btn-sm btn-outline"
                        onClick={handleRemoveItem}
                    >
                        Remove
                    </Button>
                </div>
            </div>
        </>
    )
}

export const ExpenseItemNew = ({ formik, changes, setChanges }) => {
    const totalAmountRef = useRef()
    const expenseHeadRef = useRef()
    const ExpenseHeadData = useExpenseHeads();
    if (ExpenseHeadData.isLoading) return <LuLoader />;
    // const initData={...formik.initialValues.expenseItems[0], expenseHeadId: '', amount: ''}



    const addExpense = () => {
        // Ensure expenseItems exists
        if (!formik.values.expenseItems) {
            formik.setFieldValue('expenseItems', []);
        }

        const headId = parseFloat(expenseHeadRef.current.value);
        const amount = parseFloat(totalAmountRef.current.value);
        const existingHead = formik.values.expenseItems.find(x => x.expenseHeadId === headId);

        // Validation
        if (existingHead) {
            toast.error("This expense head is already added. Please edit the existing entry instead.");
            return;
        }

        if (headId <= 0) {
            toast.error("Please select an expense head");
            return;
        }

        if (isNaN(amount) || amount <= 0) {
            toast.error("Please enter a valid amount greater than zero");
            return;
        }



        // Create new expense item with proper data
        const selectedHead = ExpenseHeadData.data.data.find(x => x.id === headId);
        if (!selectedHead) {
            toast.error("Selected expense head not found");
            return;
        }

        const initData = {
            expenseHeadId: headId,
            expenseHead: selectedHead,
            amount: amount,
        };

        // Use proper Formik approach for updating an array field
        const updatedItems = [...formik.values.expenseItems, initData];
        formik.setFieldValue('expenseItems', updatedItems);

        // Reset input fields
        expenseHeadRef.current.value = '0';
        totalAmountRef.current.value = '';

        // Update state to trigger re-render
        setChanges(prev => prev + 1);

        toast.success("Expense item added successfully");
    }
    const handleDropdownChange = (event) => {

        const { name, value } = event.target;
        // console.log(name, value);
    }

    return (
        <>


            <div className='grid grid-cols-6 gap-5 px-6 py-4 mb-3 bg-base-200 rounded-lg border border-primary/30'>
                <div className='col-span-4'>
                    {/* <ExpenseHeadSelect formik={formik} /> */}
                    <SelectNative
                        ref={expenseHeadRef}
                        onChange={handleDropdownChange}
                        className="select w-full select-primary select-bordered"
                    >
                        <option value='0'>-- Please select expense head --</option>
                        {
                            ExpenseHeadData.data.data &&
                            ExpenseHeadData.data.data.map(({ id: key, name: value }, index) => (
                                <option key={index} value={key}>{value}</option>
                            ))
                        }
                    </SelectNative>
                </div>
                <div className='text-right'>
                    <Input
                        type="number"
                        ref={totalAmountRef}
                        step="0.01"
                        placeholder="Amount"
                        className="input w-full input-bordered input-primary"
                    />
                </div>
                <div className='text-center'>
                    <Button
                        type="button"
                        onClick={addExpense}
                        className='btn btn-primary m-0 w-24'>
                        Add
                    </Button>
                </div>
            </div>


        </>
    )
}
