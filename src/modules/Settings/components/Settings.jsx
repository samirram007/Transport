import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import { useUserprofile } from '@/modules/User/hooks/useUserProfile';
import { motion } from "motion/react";
import { useState } from 'react';
import { GoListOrdered } from 'react-icons/go';
import { LiaHotelSolid } from 'react-icons/lia';
import { MdOutlineBedroomParent } from 'react-icons/md';
import { NavLink } from 'react-router';
import { } from './settings.css';
const Settings = () => {
  const [selectedMenu, setSelectedMenu] = useState('All')
  const itemGroups = [
    {
      name: 'General',
      items: [
        
        { title: 'Company', link: 'companies', icon: <LiaHotelSolid />, isActive: true },  
        { title: 'Designation', link: 'designations', icon: <LiaHotelSolid />, isActive: false },
        { title: 'Rider', link: 'riders', icon: <LiaHotelSolid />, isActive: true }, 

      ]
    },
    {
      name: 'Vehicle',
      items: [ 
        { title: 'Vehicle', link: 'vehicles', icon: <LiaHotelSolid />, isActive: true },
        { title: 'Time Slot', link: 'time_slots', icon: <GoListOrdered />, isActive: true },
        { title: 'Driver', link: 'drivers', icon: <MdOutlineBedroomParent />, isActive: false },
      ]
    }, 

    {
      name: 'Financial',
      items: [
        { title: 'Fiscal Year', link: 'fiscal_years', icon: <LiaHotelSolid />, isActive: true },
        { title: 'Income Group', link: 'income_groups', icon: <LiaHotelSolid />, isActive: true },
        { title: 'Expense Group', link: 'expense_groups', icon: <LiaHotelSolid />, isActive: true },
        { title: 'Fee Head', link: 'fee_heads', icon: <LiaHotelSolid />, isActive: true },
        { title: 'Expense Head', link: 'expense_heads', icon: <LiaHotelSolid />, isActive: true },
        { title: 'Fee Template', link: 'fee_templates', icon: <GoListOrdered />, isActive: true },


      ]
    },
   
    {
      name: 'Amenities',
      items: [
        { title: 'School', link: 'schools', icon: <LiaHotelSolid />, isActive: true },
      ]
    },
    {
      name: 'Utilities',
      items: [
        { title: 'Document', link: 'documents', icon: <MdOutlineBedroomParent />, isActive: true },
        { title: 'Key Values', link: 'initial_values', icon: <GoListOrdered />, isActive: true },
        { title: 'User Initial Values', link: 'user_initial_values', icon: <GoListOrdered />, isActive: true },
      ]
    }

  ]
  const [selectedData, setSelectedData] = useState([...itemGroups])


  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
        whileInView={{ opacity: 1 }} className="mx-auto "> 
        <div className='grid md:grid-cols-[200px_1fr]'>

        <Breadcrumb pageName="Settings" parentName='' type='box' />
        <TopMenu itemGroups={itemGroups} selectedMenu={selectedMenu} 
        setSelectedMenu={setSelectedMenu} 
        setSelectedData={setSelectedData}
        />
        </div>
        <div>

        <ChickletPanel itemGroups={selectedData} selectedMenu={selectedMenu} />
        </div>

      </motion.div >
    </>
  );
};

export default Settings;
const TopMenu = ({ itemGroups, selectedMenu, setSelectedMenu ,setSelectedData}) => {
  const handleOnClick = (e) => {
    setSelectedMenu(prev=>e.target.innerText)
    setSelectedData(prev=>itemGroups.filter((itemGroup) => {
      return e.target.innerText === 'All' ? 
      itemGroup.name !== e.target.innerText :
       itemGroup.name === e.target.innerText
    }))
    // itemGroups.filter((itemGroup) => {
    //   return itemGroup.name === e.target.innerText
    // })
  }
  return (
    <div className='top-menu'>
      
      <div className={`menu-item
       ${selectedMenu === 'All' ? 'active' : 'inactive '}
        `} 
        onClick={handleOnClick}>All</div>
      {
        itemGroups && itemGroups.map((itemGroup, groupIndex) => (

          <div key={groupIndex}
            className={`menu-item 
              first-letter:text-7xl first-letter:font-bold first-letter:text-white
  first-letter:mr-3 first-letter:float-left first-letter:ml-1
            ${selectedMenu === itemGroup?.name ? 'active' : 'inactive '}`
            }
            onClick={handleOnClick}>{itemGroup?.name}</div>



        ))

      }
    </div>
  )
}
const ChickletPanel = ({ itemGroups }) => {
  return (
    <motion.div className='chicklet-panel'>
      {
        itemGroups && itemGroups.map((itemGroup, groupIndex) => (
          <div key={groupIndex} className='chicklet-group'>
            <div className='chicklet-header '>{itemGroup?.name}</div>
            <div className='chicklet-body'>
              {itemGroup?.items.map((item, index) => (
                item.isActive &&
                <Chicklet key={index} index={index} link={item.link} title={item.title} icon={item.icon} />
              ))}
            </div>
          </div>


        ))

      }

    </motion.div>
  )
}
const Chicklet = ({ index, link, title, icon }) => {
  const userProfile = useUserprofile()
  const variants = {
    visible: (custom) => ({
      opacity: 1,
      transition: { delay: custom * 0.2 }
    })
  }
  return (
    <>

      <NavLink to={`/${userProfile.data?.data?.role}/settings/${link}`}>
        <motion.div custom={index} icon={icon} animate="visible" variants={index} className='chicklet' >
          <span className='icon'>
            {icon}
          </span>

          <div className='text text-nowrap overflow-x-clip'>
            {title}
          </div>
        </motion.div>
      </NavLink>
    </>
  )

}
