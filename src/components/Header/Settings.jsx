import { useUserprofile } from '@/modules/User/hooks/useUserProfile'
import { useEffect, useState } from 'react'
import { CiSettings } from 'react-icons/ci'
import { useLocation, useNavigate } from 'react-router'

const Settings = () => {
    const navigate=useNavigate()
    const userProfile=useUserprofile()
    // navigate(`${userProfile.data?.data?.role}/dashboard`)
    const location=useLocation()
    const [open,setOpen]=useState(false)
    const handleOnClick=()=>{
       console.log(location)
        navigate(`/${userProfile.data?.data?.role}/settings`)
    }
    useEffect(()=>{
         
        if(location.pathname===`/${userProfile.data?.data?.role}/settings`){
            setOpen(true)
        }
        return ()=>{
            setOpen(false)
        }
    },[location.pathname])
  return (
      <div onClick={handleOnClick} className='hidden md:block  rounded-full dark:bg-meta-4 dark:text-white'>
        <CiSettings className={`text-3xl cursor-pointer ${open?'text-blue-500':'text-slate-500 dark:text-white hover:text-slate-600 active:text-slate-700'} `}  /></div>
  )
}

export default Settings