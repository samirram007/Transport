import { useSchools } from '@/modules/School/hooks/queries'
import { Loader } from 'lucide-react'
import { useGlobalDataContext } from '../../contexts/features/useGlobalDataContext'

const SchoolDataLoader = () => {
  const { schoolsData } = useSchools()
  const { setSchoolsData } = useGlobalDataContext()
  if (schoolsData.isFetching) {
    return <Loader className='animate-spin' size={32} />
  }
  if (schoolsData.isSuccess) {
    console.log((schoolsData.data))
    setSchoolsData(schoolsData.data)
  }

  return (
    <></>
  )
}

export default SchoolDataLoader