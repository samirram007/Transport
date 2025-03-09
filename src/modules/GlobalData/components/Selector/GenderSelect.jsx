 
import { Loader } from 'lucide-react';
import { useGender } from '../../hooks/queries';
import { ENumSelect } from './ENumSelect';


export const GenderSelect = ({ formik, name,label,exclude }) => {


    const GenderData = useGender();
    if (GenderData.isLoading) return <Loader className='animate-spin' />;
    return (

        <ENumSelect formik={formik} name={name??"gender"}
        label={label??'Gender'}
            options={
                GenderData.data.data && Object.entries(GenderData.data.data).map(([key, value], index) => (
                    <option key={index} value={key}>{value}</option>
                ))
            }  />

    );

};
