 
import { Loader } from 'lucide-react';
import { useNationality } from '../../hooks/queries';
import { ENumSelect } from './ENumSelect';


export const NationalitySelect = ({ formik, name,label,exclude }) => {


    const NationalityData = useNationality();
    if (NationalityData.isLoading) return <Loader className='animate-spin' />;
    return (

        <ENumSelect formik={formik} name={name??"nationality"}
        label={label??'Nationality'}
            options={
                NationalityData.data.data && Object.entries(NationalityData.data.data).map(([key, value], index) => (
                    <option key={index} value={key}>{value}</option>
                ))
            }  />

    );

};
