 
import { Loader } from 'lucide-react';
import { useCaste } from '../../hooks/queries';
import { ENumSelect } from './ENumSelect';


export const CasteSelect = ({ formik, name,label,exclude }) => {


    const CasteData = useCaste();
    if (CasteData.isLoading) return <Loader className='animate-spin' />;
    return (

        <ENumSelect formik={formik} name={name??"caste"}
        label={label??'Caste'}
            options={
                CasteData.data.data && Object.entries(CasteData.data.data).map(([key, value], index) => (
                    <option key={index} value={key}>{value}</option>
                ))
            }  />

    );

};
