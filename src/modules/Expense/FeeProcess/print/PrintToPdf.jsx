import { DateTime } from 'luxon';
import { useEffect, useRef, useState } from 'react';



import moment from 'moment';
import { useReactToPrint } from 'react-to-print';


import PdfModal from '@/components/form-components/PdfModal';
import { Capitalize } from '../../../../libs/utils';
import { useExpenseTemplates } from '../../../ExpenseTemplate/hooks/queries';


const apiDomain = import.meta.env.VITE_API_BASE_URL
const defaultExpenseData = {
  expense_no: 'NEW',
  expense_date: new Date(),
  academic_class_id: null,
  academic_session_id: null,
  expense_template_id: null,
  campus_id: null,
  student_id: null,
  total_amount: 0,
  payment_mode: 'Cash',
  expense_items: [

  ]
}
const PrintToPdf = ({ expenses, session_id }) => {
  const [isOpen, setOpen] = useState(false)


  return (
    <>
      {

        <button onClick={() => setOpen(true)}
          className={`${isOpen ? 'btn-error' : 'btn-outline'} badge badge-error      py-0 text-xs     `}>{'Print'}</button>
      }
      {
        isOpen &&
        <PrintModal expenses={expenses} isOpen={isOpen} setOpen={setOpen} session_id={session_id} />
      }
    </>
  )
}
export const PrintModal = ({ expenses, isOpen, setOpen, selectedStudentSession = expenses.student_session, session_id }) => {

  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const academic_session_id = expenses.academic_session_id
  const academic_class_id = expenses.academic_class_id
  const campus_id = expenses.campus_id
  const student_id = expenses.student.id

  const [payload, setPayload] = useState({
    academic_class_id, campus_id
  })
  return (

    <PdfModal isOpen={isOpen} setOpen={setOpen} label="Preview Expenses">
      <PrintExpenses expenses={expenses} isOpen={isOpen} setOpen={setOpen} session_id={session_id}
        payload={payload}
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
        selectedStudentSession={selectedStudentSession} />
    </PdfModal>

  )
}
export const PrintExpenses = ({ expenses, isOpen, setOpen, session_id, payload,
  selectedTemplate, setSelectedTemplate, selectedStudentSession = expenses.student_session }) => {


  const fetchedExpenseTemplatesData = useExpenseTemplates(payload)
  const mData = fetchedExpenseTemplatesData.data?.data ?? [];
  const ExpenseTemplatesData = mData;//useMemo(() => [...mData], [mData]);


  if (fetchedExpenseTemplatesData.isPending) {
    return <div>Loading...</div>
  }


  return (<>
    {fetchedExpenseTemplatesData.data &&
      <PrintExpensesReadyMode
        ExpenseTemplatesData={ExpenseTemplatesData}
        selectedStudentSession={selectedStudentSession}
        expenses={expenses}
        isOpen={isOpen}
        setOpen={setOpen}
        session_id={session_id}
      />
    }
  </>)



}

export const PrintExpensesReadyMode = ({ ExpenseTemplatesData, expenses, isOpen, setOpen, session_id, selectedStudentSession }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [panelToggle, setPanelToggle] = useState(false)
  const [isMount, setIsMount] = useState(false);
  const [expenseData, setExpenseData] = useState(defaultExpenseData)
  const academic_session_id = expenses.academic_session_id
  const academic_class_id = expenses.academic_class_id
  const campus_id = expenses.academic_class.campus_id
  const student_id = expenses.student.id
  useEffect(() => {
    setExpenseData(prev => ({
      ...prev, ...expenses,
      campus_id: campus_id
    }))
    const tempTemplate = ExpenseTemplatesData.find(x => x.id === expenses.expense_template_id)

    const updatedTemplate = {
      ...tempTemplate,
      expense_template_items: tempTemplate.expense_template_items.map(item => ({
        ...item,
        amount: "0.00"
      }))
    };
    setSelectedTemplate(prev => updatedTemplate)

  }, []);
  return (
    <>
      <div className=' flex flex-row bg-slate-800/20 rounded-md shadow-inner w-[95dvw] max-w-full    h-[70dvh] max-h-full  overflow-hidden'>
        <div className={`relative flex flex-col min-w-full `}>
          {
            selectedTemplate &&
            <SelectedPanelPrintMode
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
              student_id={student_id}
              isMount={isMount}
              setIsMount={setIsMount}
              expenseData={expenseData}
              setExpenseData={setExpenseData}
              isOpen={isOpen}
              setOpen={setOpen}
              session_id={session_id}
              selectedStudentSession={selectedStudentSession}

            />}
        </div>
      </div>
    </>
  )
}

export const SelectedPanelPrintMode = ({ selectedTemplate, isMount, setIsMount, expenseData,
  setExpenseData, student_id, isOpen, setOpen, session_id, selectedStudentSession }) => {

  const componentRef = useRef()
  const [total, setTotal] = useState(0)
  const [changes, setChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState(false);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {

    if (selectedTemplate != null) {

      // if (!isMount) {

      const thisTotal = expenseData.expense_items.reduce((total, item) => {
        return total + parseFloat(item.total_amount)
      }, 0)
      const mergedItems = selectedTemplate.expense_template_items.map((expense_template_item) => {
        const matchingExpenseItem = expenseData.expense_items.find((expense_item) => expense_template_item.expense_head_id === expense_item.expense_head_id);
        if (matchingExpenseItem) {
          return { ...expense_template_item, ...matchingExpenseItem };
        } else {
          return { ...expense_template_item, total_amount: expense_template_item.amount, quantity: expense_template_item.is_active };
        }
      });
      setExpenseData(prev => ({
        ...prev,
        expense_items: [...mergedItems]
      }))

      setTotal(prev => thisTotal)
      setIsMount(true)

    }
  }, [])
  useEffect(() => {

    if (!changes) return
    const thisTotal = expenseData.expense_items.reduce((total, item) => {
      return total + parseFloat(item.total_amount)
    }, 0)
    const mergedItems = expenseData.expense_template_items.map((expense_template_item) => {
      const matchingExpenseItem = expenseData.expense_items.find((expense_item) => expense_template_item.expense_head_id === expense_item.expense_head_id);
      if (matchingExpenseItem) {
        return { ...expense_template_item, ...matchingExpenseItem };
      } else {
        return { ...expense_template_item, total_amount: expense_template_item.amount, quantity: expense_template_item.is_active };
      }
    });
    setExpenseData(prev => ({
      ...prev,
      expense_items: [...mergedItems],
      total_amount: thisTotal
    }))
    setTotal(prev => thisTotal)
    setChanges(prev => false)
    return
  }, [changes])

  if (!expenseData.expense_items) {
    return (<div className='bg-red-500'>Loading...</div>)
  }

  return (
    <>

      <div className=' hidden  flex-row justify-between mt-2 pb-2 border-b-4 border-violet-400/60  '>
        <div className='flex flex-row items-center justify-center '>
          <div className='font-bold'> {selectedTemplate && selectedTemplate.name}</div>

        </div>


      </div>
      <div className='relative'>

        <div className='mb-3 mr-10  bottom-0     right-0 flex justify-end'>
          <button className='badge badge-error btn-outline bg-error text-slate-50    '
            onClick={handlePrint}>Print</button>
        </div>

      </div>

      <div ref={componentRef} className='print relative overflow-y-auto   text-slate-950
       bg-white mx-auto rounded-md shadow-lg w-[750px]      max-h-[calc(100% - 180px)
        p-4 '>
        <div className='relative border-2 border-slate-900 mt-2 min-h-[400px]  '>
          <div className=' grid grid-cols-10 px-2 py-1'>
            <div className={' col-span-2 '}>No. {expenseData.expense_no}</div>
            <div className={' col-span-6 '}></div>
            <div className={' col-span-2 text-right '}>
              Date: {DateTime.fromISO(expenseData.expense_date).toLocaleString(DateTime.DATE_MED)}
            </div>
          </div>
          <div className='schoolHead grid grid-cols-10 p-2'>
            {/* {JSON.stringify(expenseData.campus.school.logo_image)} */}
            <div className={' col-span-1 '}>
              {expenseData.campus.school.logo_image ?
                <img src={expenseData.campus.school.logo_image.path.includes(apiDomain)
                  ? expenseData.campus.school.logo_image.path
                  : (apiDomain + expenseData.campus.school.logo_image.path)} alt="" />
                :
                <img src={`${apiDomain}/storage/documents/logo.png`} style={{ width: '80px', height: '80px' }} alt="" />
              }
            </div>
            <div className='col-span-8 text-center'>
              <div className='!text-2xl uppercase font-bold '>{expenseData.campus.school.name ?? 'NAVA JYOTI VIDYAPITH'}</div>
              <div>{expenseData.campus.school.address ?
                expenseData.campus.school.address.display :
                '20/1 west, Captepara Road, Authpur, North 24 Parganas, 743128'}</div>
              <div className='font-bold underline'>Money Receipt</div>
              <div className='flex flex-col pl-4 '>
                <div className='text-left'>Name: {expenseData.student.name}</div>
                <div className='flex flex-row gap-6'>
                  <div>Class: {expenseData.student_session.academic_class.name} </div>
                  <div>Sec: {expenseData.student_session.section.name}</div>
                  <div>RollNo: {expenseData.student_session.roll_no}</div>
                </div>

              </div>

            </div>
            <div className='col-span-1'></div>

          </div>

          <div className='px-2  '>
            <div className='grid grid-cols-12 items-center gap-2 border-y-2 border-slate-800 font-bold   text-slate-800'>

              <div className='col-span-10 border-r-2 border-slate-800'> <div className='py-1 pl-4'>Particulars</div></div>
              <div className='col-span-2 text-right '> <div className='py-1 pr-4'>Amount</div></div>
            </div>
            <ExpenseEntryRowsPrint expenseData={expenseData} setChanges={setChanges} selectedStudentSession={selectedStudentSession} />

          </div>
          <div className='px-2'>
            <div className=' w-full           text-slate-800 bottom-0 grid grid-cols-12 justify-end gap-2           font-bold border-t-4 border-slate-800  '>
              <div className='col-span-10 text-right border-r-2 border-slate-800  '>{'Total'}:</div>
              <div className='col-span-2 text-right '>
                <div className='py-1 pr-4 font-semibold'>
                  {Number(total).toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          <div className='w-full py-1 pl-4 text-[10px] -mt-2'>
            (in words) : Rupees. {convertNumberToWords(Number(Number(total).toFixed(2)))}
          </div>
          <div className='absolute bottom-0 right-0 pr-2 !text-[8px]'>Print Time: {moment(new Date()).format('DD-MMM-YYYY hh:mm a')}</div>
        </div>

      </div>


    </>
  )

}


export const ExpenseEntryRowsPrint = ({ expenseData, setChanges, selectedStudentSession }) => {

  return (
    expenseData.expense_items && expenseData.expense_items.map((expenseTemplateItem, index) => (

      <ExpenseEntryRowPrint key={index} index={index} expenseTemplateItem={expenseTemplateItem}
        selectedStudentSession={selectedStudentSession} setChanges={setChanges} />

    ))
  )
}


export const ExpenseEntryRowPrint = ({ expenseTemplateItem, index, setChanges, selectedStudentSession }) => {

  const quantityRef = useRef()
  const amountRef = useRef()

  return (
    <>

      <div className={` grid grid-cols-12  items-center  text-xs    `}>

        <div className='col-span-10 flex flex-row items-center gap-2 pl-4 border-r-2 border-slate-800'>
          <div className='py-2'>
            <div className='flex flex-row flex-nowrap items-center  '>
              {Capitalize(expenseTemplateItem.expense_head.name)}

              {expenseTemplateItem.keep_periodic_details ?

                expenseTemplateItem.expense_item_months &&
                expenseTemplateItem.expense_item_months.length > 0 &&

                <div className={`flex flex-row ${expenseTemplateItem.expense_item_months.length > 6 ? 'gap-1 ml-1' : 'gap-2 ml-2'}`}>
                  {expenseTemplateItem.expense_item_months.map((x, index) => (
                    (<div key={index} className={`
                     border-slate-400  text-slate-800
                   ${expenseTemplateItem.expense_item_months.length > 6 ? 'text-xs px-1 border-b-2' : 'text-xs border-2 px-2 rounded-md'}
                    font-bold mb-[1px]  `}>
                      {x.month?.short_name}
                    </div>)
                  ))}
                </div>



                : ''}

            </div>

          </div>

        </div>

        <div className='col-span-2 text-right '>
          <div className='py-1 pr-4 flex flex-row items-center justify-end'>
            {expenseTemplateItem.amount > 0 ? Number(parseFloat(expenseTemplateItem.total_amount)).toFixed(2) : ''}
          </div>
        </div>
      </div>
    </>
  )
}


const units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];

const zero = "Zero";
const arab = "Arab";
const crore = "Crore";
const lakh = "Lakh";
const thousand = "Thousand";
const hundred = "Hundred";
const currency = "Rupees";
const paisa = "Paisa";
const only = "Only";

function convertNumberToWords(amount) {
  if (amount === 0) return `${zero} ${currency} ${only}`;

  function convert(num) {
    let parts = [];
    if (num >= 1e9) {
      parts.push(`${convert(Math.floor(num / 1e9))} ${arab}`);
      num %= 1e9;
    }
    if (num >= 1e7) {
      parts.push(`${convert(Math.floor(num / 1e7))} ${crore}`);
      num %= 1e7;
    }
    if (num >= 1e5) {
      parts.push(`${convert(Math.floor(num / 1e5))} ${lakh}`);
      num %= 1e5;
    }
    if (num >= 1000) {
      parts.push(`${convert(Math.floor(num / 1000))} ${thousand}`);
      num %= 1000;
    }
    if (num >= 100) {
      parts.push(`${convert(Math.floor(num / 100))} ${hundred}`);
      num %= 100;
    }
    if (num >= 20) {
      parts.push(`${tens[Math.floor(num / 10)]}`);
      if (num % 10 > 0) parts.push(units[num % 10]);
    } else if (num >= 10) {
      parts.push(`${teens[num - 10]}`);
    } else if (num > 0) {
      parts.push(`${units[num]}`);
    }
    return parts.join(" ");
  }

  let integerPart = Math.floor(amount);
  let wholeWordPart = convert(integerPart);
  let result = wholeWordPart ? `${wholeWordPart} ${currency}` : '';

  let decimalPart = Math.round((amount - integerPart) * 100);
  if (decimalPart > 0) {
    if (wholeWordPart) {
      result += " and ";
    }
    result += `${convert(decimalPart)} ${paisa}`;
  }

  return `${result} ${only}`;
}
export default PrintToPdf

