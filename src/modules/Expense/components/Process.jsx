
import { lazy } from 'react';
import ExpenseContextProvider from '../contexts/ExpenseContextProvider';
import ExpenseDataContextProvider from '../contexts/ExpenseDataContextProvider';


const EntryForm = lazy(() => import('./EntryForm'))
const Process = () => {


    return (
        <>

            <ExpenseDataContextProvider>
                <ExpenseContextProvider action={'create'}>
                    <EntryForm />
                </ExpenseContextProvider>
            </ExpenseDataContextProvider>



        </>



    )
}


export default Process



