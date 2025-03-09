import Loader from '../../../../components/Loader';

import { useCampusAcademicClasses } from '../../../AcademicClass/hooks/queries';
import { CustomSelect } from './CustomSelect';


export const CampusAcademicClassSelect = ({ formik,  name, label, exclude }) => {
    const AcademicClassData = useCampusAcademicClasses();
    if (AcademicClassData.isLoading) return <Loader size={6} label={'Academic Class'} />
    return (

        <CustomSelect formik={formik} name="academicClassId" label={label ?? 'Academic Class'}
            options={AcademicClassData.data && AcademicClassData.data.data &&
                AcademicClassData.data.data.map(({ id: key, name: value,campus }, index) => (
                    exclude && exclude === key ? null :
                        <option key={index} value={key}>{campus.code} : {value}</option>
                ))} />

    );

};
