import { useUserprofile } from "@/modules/User/hooks/useUserProfile";
import { TbReportAnalytics } from "react-icons/tb";
import { NavLink } from "react-router";
import SidebarLinkGroup from "../Common/SidebarLinkGroup";
import { useSidebar } from "../contexts/features/useSidebar";

const ExpenseMenuGroup = () => {
  const { pathname, sidebarExpanded, setSidebarExpanded } = useSidebar()
  const userProfile = useUserprofile()
  return (
    <SidebarLinkGroup
      activeCondition={
        pathname === '/' || pathname.includes('dashboard')
      }
    >
      {(handleClick, open) => {
        return (
          <>
            <NavLink
              to="#"
              className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/' ||
                pathname.includes('riders')) &&
                'bg-graydark dark:bg-meta-4'
                }`}
              onClick={(e) => {
                e.preventDefault();
                sidebarExpanded
                  ? handleClick()
                  : setSidebarExpanded(true);
              }}
            >
              <TbReportAnalytics className="text-2xl" />

              Report
              <svg
                className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'
                  }`}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                  fill=""
                />
              </svg>
            </NavLink>
            {/* <!-- Dropdown Menu Start --> */}
            <div
              className={`translate transform overflow-hidden ${!open && 'hidden'
                }`}
            >
              <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                <li>
                  <NavLink to={`/${userProfile.data?.data?.role}/income_reports`} className={({ isActive }) =>
                    'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' + (isActive && '!text-blue-500')
                  }>Income Reports</NavLink>
                </li>
                <li>
                  <NavLink to={`/${userProfile.data?.data?.role}/expense_reports`} className={({ isActive }) =>
                    'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' + (isActive && '!text-blue-500')
                  }>Expense Reports</NavLink>
                </li>
                <li>
                  <NavLink to={`/${userProfile.data?.data?.role}/daily_collection_reports`} className={({ isActive }) =>
                    'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' + (isActive && '!text-blue-500')
                  }>Daily Collection</NavLink>
                </li>
                <li>
                  <NavLink to={`/${userProfile.data?.data?.role}/monthly_collection_reports`} className={({ isActive }) =>
                    'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' + (isActive && '!text-blue-500')
                  }>Monthly Collection</NavLink>
                </li>

              </ul>
            </div >
            {/* <!-- Dropdown Menu End --> */}
          </>
        );
      }}
    </SidebarLinkGroup >
  )
}


export default ExpenseMenuGroup