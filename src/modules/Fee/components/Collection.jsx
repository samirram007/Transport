
import { lazy } from 'react';
import FeeContextProvider from '../contexts/FeeContextProvider';
import FeeDataContextProvider from '../contexts/FeeDataContextProvider';


const EntryForm = lazy(() => import('./EntryForm'))
const Collection = () => {


    return (
        <>

            <FeeDataContextProvider>
                <FeeContextProvider action={'create'}>
                    <EntryForm />
                </FeeContextProvider>
            </FeeDataContextProvider>



        </>



    )
}


export default Collection



