import Loader from '../../../../components/Loader';

import { useSubjects } from '../../Subject/hooks/queries';
import { CustomSelect } from './CustomSelect';


export const SubjectSelect = ({ formik, name,label,exclude }) => {


    const SubjectData = useSubjects();
    if (SubjectData.isLoading) return <Loader />;
    return (

        <CustomSelect formik={formik} name={name??"school_id"}
        label={label??'Subject'}
            options={SubjectData.data && SubjectData.data.data &&
                SubjectData.data.data.map(({ id: key, name: value }, index) => (

                    exclude && exclude===key? null :
                    <option key={index} value={key}>{value}</option>
                ))} />

    );

};
