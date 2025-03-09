import { lazy } from 'react';

const FiscalYears = lazy(() => import('./components/DataList'));
const YearSwitcher = lazy(() => import('./components/YearSwitcher'));
export { FiscalYears, YearSwitcher };


