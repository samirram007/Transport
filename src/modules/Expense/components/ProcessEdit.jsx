import { lazy } from 'react';
import ExpenseContextProvider from '../contexts/ExpenseContextProvider';
import ExpenseDataContextProvider from '../contexts/ExpenseDataContextProvider';

const EntryForm = lazy(() => import('./EntryForm'))
const ProcessEdit = ({ selectedData }) => {
    return (
        <>
            <ExpenseDataContextProvider>
                <ExpenseContextProvider action={'edit'} selectedData={selectedData}>
                    <EntryForm />
                </ExpenseContextProvider>
            </ExpenseDataContextProvider>
        </>
    )
}

export default ProcessEdit

