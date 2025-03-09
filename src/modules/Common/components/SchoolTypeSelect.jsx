 
import { Loader } from 'lucide-react';
 
import { useSchoolTypes } from '@/modules/SchoolType/hooks/queries';
import { CustomSelect } from './CustomSelect';

export const SchoolTypeSelect = ({ formik,  name,label,exclude }) => {

    const SchoolTypeData = useSchoolTypes();
    if (SchoolTypeData.isLoading) return <Loader className='animate-spin' />;
    return (

        <CustomSelect formik={formik} name={name??"schoolTypeId"}
        label={label??'School Type'}
            options={SchoolTypeData.data && SchoolTypeData.data.data &&
                SchoolTypeData.data.data.map(({ id: key, name: value }, index) => (

                    exclude && exclude===key? null :
                    <option key={index} value={key}>{value}</option>
                ))} />

    );

};
