import { useSchoolTypes } from '@/modules/SchoolType/hooks/queries';
 
 
import { Loader } from 'lucide-react';
import { CustomSelect } from './CustomSelect';

export const SchoolTypeSelect = ({ formik,  name,label,exclude }) => {

    const SchoolTypeData = useSchoolTypes();
    if (SchoolTypeData.isLoading) return <Loader className='animate-spin' />;
    return (

        <CustomSelect formik={formik} name={name??"school_type_id"}
        label={label??'SchoolTypeSelect'}
            options={SchoolTypeData.data && SchoolTypeData.data.data &&
                SchoolTypeData.data.data.map(({ id: key, name: value }, index) => (

                    exclude && exclude===key? null :
                    <option key={index} value={key}>{value}</option>
                ))} />

    );

};
