 
import { Loader } from 'lucide-react';
import { useSection } from '../../hooks/queries';
import { ENumSelect } from './ENumSelect';


export const SectionSelect = ({ formik, name,label,exclude }) => {


    const SectionData = useSection();
    if (SectionData.isLoading) return <Loader className='animate-spin' />;
    return (

        <ENumSelect formik={formik} name={name??"section"}
        label={label??'Section'}
            options={
                SectionData.data.data && Object.entries(SectionData.data.data).map(([key, value], index) => (
                    <option key={index} value={key}>{value}</option>
                ))
            }  />

    );

};
