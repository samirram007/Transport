import Loader from '../../../components/Loader';

import { useAcademicClasses } from '../../AcademicClass/hooks/queries';
import { CustomSelect } from './CustomSelect';


export const AcademicClassSelect = ({ formik, campusId, name, label, exclude }) => {
    const AcademicClassData = useAcademicClasses({campusId:(formik.values.campusId??campusId)});
    if (AcademicClassData.isLoading) return <Loader size={6} label={'Academic Class'} />
    return (

        <CustomSelect formik={formik} name="academicClassId" label={label ?? 'Academic Class'}
            options={AcademicClassData.data && AcademicClassData.data.data &&
                AcademicClassData.data.data.map(({ id: key, name: value }, index) => (
                    exclude && exclude === key ? null :
                        <option key={index} value={key}>{value}</option>
                ))} />

    );

};
