/* eslint-disable react/prop-types */
// import LogoIcon from '@/assets/images/logo/logo-icon.svg';
import LogoIcon from '@/assets/logo.png';

import { useUserprofile } from '@/modules/User/hooks/useUserProfile';
import { User } from 'lucide-react';
import { GiCash } from 'react-icons/gi';
import { IoCashOutline } from 'react-icons/io5';
import { Link, NavLink } from 'react-router';
import { useSidebar } from '../Sidebar/contexts/features/useSidebar';
import DarkModeSwitcher from './DarkModeSwitcher';
import DataDisplaySwitcher from './DataDisplaySwitcher';
import DropdownUser from './DropdownUser';
import Settings from './Settings';

const Header = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  return (
    <header className="sticky top-0  flex  w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none z-[9999]">
      <div className="flex items-center justify-between flex-grow px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 ">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark 
            dark:bg-boxdark  "
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="absolute right-0 w-full h-full du-block">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black 
                    delay-75 duration-200 ease-in-out 
                    dark:bg-white ${!sidebarOpen && '!w-full delay-300'}`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${!sidebarOpen && 'delay-400 !w-full'
                    }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${!sidebarOpen && '!w-full delay-500'
                    }`}
                ></span>
              </span>
              <span className="absolute right-0 w-full h-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${!sidebarOpen && '!h-0 !delay-0'
                    }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${!sidebarOpen && '!h-0 !delay-200'
                    }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="flex-shrink-0 hidden" to="/">
            <img src={LogoIcon} alt="Logo" />
          </Link>
        </div>

        <div className="hidden  ">
          <form action="https://formbold.com/s/unique_form_id" method="POST">
            <div className="relative">
              <button className="absolute left-0 -translate-y-1/2 top-1/2">
                <svg
                  className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                    fill=""
                  />
                </svg>
              </button>

              <input
                type="text"
                placeholder="Type to search..."
                className="w-full pr-4 text-black bg-transparent pl-9 focus:outline-none dark:text-white xl:w-125"
              />
            </div>
          </form>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Dark Mode Toggler --> */}
            <DarkModeSwitcher />
            {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Notification Menu Area --> */}
            {/* <DropdownNotification /> */}
            {/* <!-- Notification Menu Area --> */}

            {/* <!-- Chat Notification Area --> */}
            {/* <DropdownMessage /> */}
            <Settings />
            <span className='hidden md:block'>

            <DataDisplaySwitcher />
            </span>
            <RiderMenu />
            <FeesMenu />
            <ExpenseMenu />
            {/* <!-- Chat Notification Area --> */}
          </ul>

          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;

const RiderMenu = () => {
  const userProfile = useUserprofile()
  return (
    <div className="relative"  >
      <NavLink to={`/${userProfile.data?.data?.role}/riders`}>

        <User className='text-2xl text-blue-600 dark:text-blue-500' title='Riders/ Students' />

      </NavLink>
    </div>
  )
}
const FeesMenu = () => {
  const userProfile = useUserprofile()
  return (
    <div className="relative"  >
      <NavLink to={`/${userProfile.data?.data?.role}/fees`}>

        <IoCashOutline className='text-2xl text-green-600 dark:text-green-300' title='Income/ Fees' />

      </NavLink>
    </div>
  )
}
const ExpenseMenu = () => {
  const userProfile = useUserprofile()
  return (
    <div className="relative"  >
      <NavLink to={`/${userProfile.data?.data?.role}/expenses`}>

        <GiCash className='text-2xl text-red-600 dark:text-red-400' title='Expense' />

      </NavLink>
    </div>
  )
}