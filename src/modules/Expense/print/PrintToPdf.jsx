import { DateTime } from 'luxon';
import { useRef } from 'react';



import { capitalizeAllWords } from '@/lib/removeEmptyStrings';
import { useOrganization } from '@/modules/Organization/hooks/queries';
import { Loader2 } from 'lucide-react';
import moment from 'moment';
import { useExpense } from '../hooks/queries';

const apiDomain = import.meta.env.VITE_API_BASE_URL
const ADDRESS = '20/1 west, Captepara Road, Authpur, North 24 Parganas, 743128'
const defaultExpenseData = {
  expenseNo: 'NEW',
  expenseDate: new Date(),
  fiscalyearId: null,
  schooldId: null,
  riderId: null,
  totalAmount: 0,
  paymentMode: 'cash',
  expenseItems: [

  ]
}
const PrintToPdf = (props) => {


  return (
    <>

      <div className="grid grid-rows-[1fr] h-full max-h-full relative pt-4">
        <div className="flex flex-col h-full ">

          <div ref={props.contentRef} className='overflow-y-auto
       text-slate-950 bg-white mx-auto 
       rounded-md shadow-lg w-[750px]   p-4'>
            <PrintForm expenseId={props.expenseId} />
          </div>
        </div>
      </div>

    </>
  )
}

export default PrintToPdf


export const PrintForm = ({ expenseId }) => {

  const fetchedData = useExpense(expenseId)

  const expenseData = fetchedData.data?.data
  if (fetchedData.isLoading) {
    return <Loader2 className='animate-spin' />
  }
  if (fetchedData.isError) {
    return <div className='animate-bounce' >Error</div>
  }


  return (
    <>


      <div className='relative border-2 border-slate-900 mt-2 min-h-[400px]  '>
        <div className=' grid grid-cols-10 px-2 py-1'>
          <div className={' col-span-2 '}>No. {expenseData.expenseNo}</div>
          <div className={' col-span-6 '}></div>
          <div className={' col-span-2 text-right '}>
            Date: {DateTime.fromISO(expenseData.expenseDate).toLocaleString(DateTime.DATE_MED)}
          </div>
        </div>
        <div className='schoolHead grid grid-cols-10 p-2'>
          {/* {JSON.stringify(expenseData.campus.school.logo_image)} */}
          <div className={' col-span-1 '}>
            <img src={`${apiDomain}/storage/documents/logo.png`} style={{ width: '80px', height: '80px' }} alt="" />

          </div>
          <div className='col-span-8 text-center'>
            <Organisation />
            <div className='font-bold underline'>Money Receipt</div>
            <div className='flex flex-col pl-4 '>
              <div className='text-left'>Name: {expenseData.riderSnapshot?.name}</div>
              <div className='text-left'>School: {expenseData.riderSnapshot.school.name ?? 'NAVA JYOTI VIDYAPITH'}</div>
              <div className='flex flex-row gap-6'>
                <div>Class: {capitalizeAllWords(expenseData.riderSnapshot?.standard)} </div>
                {/* {JSON.stringify(expenseData.riderSnapshot)} */}
                <div>Sec: {capitalizeAllWords(expenseData.riderSnapshot?.section) ?? 'N/A'}</div>
                <div>RollNo: {expenseData.riderSnapshot?.rollNo}</div>
                <div>Time: {capitalizeAllWords(expenseData.riderSnapshot?.schoolTime)}</div>
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
          <ExpenseEntryRowsPrint expenseItems={expenseData.expenseItems} />

        </div>
        <div className='px-2'>
          <div className=' w-full           text-slate-800 bottom-0 grid grid-cols-12 justify-end gap-2           font-bold border-t-4 border-slate-800  '>
            <div className='col-span-10 text-right border-r-2 border-slate-800  '>{'Total'}:</div>
            <div className='col-span-2 text-right '>
              <div className='py-1 pr-4 font-semibold'>
                {Number(expenseData.totalAmount).toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        <div className='w-full py-1 pl-4 text-[10px] -mt-2'>
          (in words) :  {convertNumberToWords(Number(Number(expenseData.totalAmount).toFixed(2)))}
        </div>
        <div className='absolute bottom-0 right-0 pr-2 !text-[8px]'>Print Time: {moment(new Date()).format('DD-MMM-YYYY hh:mm a')}</div>
      </div>


    </>
  )

}
const Organisation = () => {
  const fetchedData = useOrganization(1)
  const organizationData = fetchedData.data?.data
  if (fetchedData.isLoading) {
    return <Loader2 className='animate-spin' />
  }
  if (fetchedData.isError) {
    return <div className='animate-bounce' >Error</div>
  }

  return (
    <>
      <div className='!text-2xl uppercase font-bold '>{organizationData.name ?? 'NAVA JYOTI VIDYAPITH'}</div>
      <div>{organizationData.address ?
        organizationData.address.display : ADDRESS
      }</div>
    </>
  )

}

export const ExpenseEntryRowsPrint = ({ expenseItems }) => {

  return (
    expenseItems && expenseItems.map((expenseItem, index) => (

      <ExpenseEntryRowPrint key={index} index={index} expenseItem={expenseItem} />

    ))
  )
}


export const ExpenseEntryRowPrint = ({ index, expenseItem }) => {

  const quantityRef = useRef()
  const amountRef = useRef()

  return (
    <>

      <div className={` grid grid-cols-12  items-center  text-xs    `}>

        <div className='col-span-10 flex flex-row items-center gap-2 pl-4 border-r-2 border-slate-800'>
          <div className='py-2'>
            <div className='flex flex-row flex-nowrap items-center  '>
              {capitalizeAllWords(expenseItem.expenseHead.name)}


              <div className={`flex flex-row ${expenseItem.expenseItemMonths.length > 6 ? 'gap-1 ml-1' : 'gap-2 ml-2'}`}>
                {expenseItem.expenseItemMonths.map((x, index) => (
                  (<div key={index} className={`
                     border-slate-400  text-slate-800
                   ${expenseItem.expenseItemMonths.length > 6 ? 'text-xs px-1 border-b-2' : 'text-xs border-2 px-2 rounded-md'}
                    font-bold mb-[1px]  `}>
                    {x.month?.shortName}
                  </div>)
                ))}
              </div>


            </div>

          </div>

        </div>

        <div className='col-span-2 text-right '>
          <div className='py-1 pr-4 flex flex-row items-center justify-end'>
            {expenseItem.amount > 0 ? Number(parseFloat(expenseItem.totalAmount)).toFixed(2) : ''}
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


