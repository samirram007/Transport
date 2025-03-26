import { lazy } from 'react';

const Reports = lazy(() => import('./components/DailyCollectionReport/DailyCollectionReport'));
const DailyCollectionReport =  lazy(() => import('./components/DailyCollectionReport/DailyCollectionReport'));
const MonthlyCollectionReport = lazy(()=> import('./components/MonthlyCollectionReport'));
const IncomeReport = lazy(() => import('./components/MonthlyCollectionReport'));
const ExpenseReport = lazy(() => import('./components/MonthlyCollectionReport'));

export { DailyCollectionReport, ExpenseReport, IncomeReport, MonthlyCollectionReport, Reports };


