import { useEffect, useState } from 'react'

const TestProfileHeader=({data,fetchedAcademicSessions})=>{
    const [academicSessions, setAcademicSessions] = useState([])
    const [studentSessions, setStudentSessions] = useState(data?.student_sessions ?? [])

    const [selectedSession, setSelectedSession] = useState({})
    useEffect(()=>{
        console.log(studentSessions.find(x => x.academic_session.isCurrent == 1)?.academic_session);
    //   const studentSessionData=  studentSessions.length > 0
    //     ? (studentSessions.find(x => x.academic_session.isCurrent == 1).academic_session
    //       ?? studentSessions[0].academic_session)
    //     : null
    },[])
    return <div> 
        {/* {JSON.stringify(fetchedAcademicSessions)} */}
        </div>
  }

export default TestProfileHeader
