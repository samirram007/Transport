
import React from 'react'
import EntryForm from './EntryForm'
import { useFeeTemplateDetail } from '../hooks/queries'
import Loader from '../../../components/Loader'

const Delete = ({ initialValues, entryId, setEntryId }) => {

  const editValue = useFeeTemplateDetail(entryId)

  const initValues = editValue.data ?
    editValue.data.data :
    {
      name: '',
      sort_index: 1,
      fee_template_id: initialValues.id,
      fee_head_id: '',
      amount: 0,
      is_customizable: false,
      keep_periodic_details: false,
      is_active: false
    }

  return (
    <>
      <div className='border-2 border-blue-400 rounded-lg  '>
        <EntryForm
          initialValues={initValues}
          entryMode={'edit'}
          setEntryId={setEntryId} />
      </div>

    </>
  )
}

export default Delete