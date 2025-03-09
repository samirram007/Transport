import { useAcademicSessions } from '@/modules/AcademicSession/hooks/queries';
import { lazy, useMemo, useState } from 'react';
 
// import ProfileHeader from './ProfileHeader';
const ProfileHeader = lazy(() => import('./ProfileHeader'));
 


const Information = () => {
   const [entryMode, setEntryMode] = useState('info');
     return (
    <div className='container-flex md-container max-h-full w-full '>
      <AcademicSessionsCall   />
    </div>
  )
}
export const TestAcademicSessionsCall = ({ data }) => {
  const fetchedData = useAcademicSessions({})
  const mData = fetchedData.data?.data ?? [];
  const fetchedAcademicSessions = useMemo(() => [...mData], [mData]);
  if (fetchedData.isLoading) return <div>Loading..</div>
  return (
    <ProfileHeader  fetchedAcademicSessions={fetchedAcademicSessions} />

  )

}
 
export const AcademicSessionsCall = ({ data }) => {
  const fetchedData = useAcademicSessions({})
  const mData = fetchedData.data?.data ?? [];
  const fetchedAcademicSessions = useMemo(() => [...mData], [mData]);
  if (fetchedData.isFetching) return <div>Loading..</div>
  return (
    <ProfileHeader   fetchedAcademicSessions={fetchedAcademicSessions} />
  )
}
export default Information
