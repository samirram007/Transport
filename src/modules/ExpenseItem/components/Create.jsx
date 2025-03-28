
import React from 'react'
import EntryForm from './EntryForm'
import { useFeeTemplateItem } from '../hooks/queries'

const Create = ({ initialValues }) => {

  const initValues =   {
      name: '',
      sort_index: 1,
      expense_id: initialValues.id,
      fee_head_id: '',
      amount: 0,
      is_customizable: false,
      keep_periodic_details: false,
      is_active: true
    }

  return (
    <>
 <div className='border-2 border-blue-400 rounded-lg  '>
      <EntryForm
        initialValues={initValues}
        entryMode={'create'}  />
        </div>
    </>
  )
}

export default Create