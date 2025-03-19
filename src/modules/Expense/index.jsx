
import { lazy } from 'react';

const Expenses = lazy(() => import('./components/DataList'));
const CreateExpense = lazy(() => import('./components/Process'));
const EditExpense = lazy(() => import('./components/Edit'));

export { CreateExpense, EditExpense, Expenses };

