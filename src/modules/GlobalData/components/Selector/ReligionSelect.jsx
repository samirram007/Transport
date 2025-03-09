 
import { Loader } from 'lucide-react';
import { useReligion } from '../../hooks/queries';
import { ENumSelect } from './ENumSelect';


export const ReligionSelect = ({ formik, name,label,exclude }) => {


    const ReligionData = useReligion();
    if (ReligionData.isLoading) return <Loader className='animate-spin' />;
    return (

        <ENumSelect formik={formik} name={name??"religion"}
        label={label??'Religion'}
            options={
                ReligionData.data.data && Object.entries(ReligionData.data.data).map(([key, value], index) => (
                    <option key={index} value={key}>{value}</option>
                ))
            }  />

    );

};
