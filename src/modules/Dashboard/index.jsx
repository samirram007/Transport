import { lazy } from 'react';
const Dashboard = lazy(() => import('./components/Dashboard'))
const AdminDashboard = lazy(() => import('./components/AdminDashboard'))
const Calender = lazy(() => import('./components/Calender'))
const BusinessDashboard = lazy(() => import('./components/BusinessDashboard'))
export { BusinessDashboard, Calender, Dashboard, AdminDashboard };




