 
import { Loader } from 'lucide-react';
import { useStandard } from '../../hooks/queries';
import { ENumSelect } from './ENumSelect';


export const StandardSelect = ({ formik, name,label,exclude }) => {


    const StandardData = useStandard();
    if (StandardData.isLoading) return <Loader className='animate-spin' />;
    return (

        <ENumSelect formik={formik} name={name??"standard"}
        label={label??'Standard'}
            options={
                StandardData.data.data && Object.entries(StandardData.data.data).map(([key, value], index) => (
                    <option key={index} value={key}>{value}</option>
                ))
            }  />

    );

};
