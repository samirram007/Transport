 
import { Loader } from 'lucide-react';
import { useSchoolTime } from '../../hooks/queries';
import { ENumSelect } from './ENumSelect';


export const SchoolTimeSelect = ({ formik, name,label,exclude }) => {


    const SchoolTimeData = useSchoolTime();
    if (SchoolTimeData.isLoading) return <Loader className='animate-spin' />;
    return (

        <ENumSelect formik={formik} name={name??"schoolTime"}
        label={label??'School Time'}
            options={
                SchoolTimeData.data.data && Object.entries(SchoolTimeData.data.data).map(([key, value], index) => (
                    <option key={index} value={key}>{value}</option>
                ))
            }  />

    );

};
