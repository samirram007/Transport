
import { Loader } from 'lucide-react';
 
import { useSchools } from '@/modules/School/hooks/queries';
import { CustomSelect } from './CustomSelect';

export const SchoolSelect = ({ formik, name, label, exclude }) => {

    const SchoolData = useSchools();
    if (SchoolData.isLoading) return <Loader className='animate-spin' />;


    return (
        <CustomSelect formik={formik} name={name ?? "schoolId"}
            label={label ?? 'School'}
            options={SchoolData.data && SchoolData.data.data &&
                SchoolData.data.data.map(({ id: key, name: value }, index) => (

                    exclude && exclude === key ? null :
                        <option key={index} value={key}>{value}</option>

                ))} />



    );

};
