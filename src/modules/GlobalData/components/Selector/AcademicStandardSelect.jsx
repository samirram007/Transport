import Loader from '../../../../components/Loader';

import { useAcademicStandards } from '../../../AcademicStandard/hooks/queries';
import { CustomSelect } from './CustomSelect';


export const AcademicStandardSelect = ({ formik}) => {
    const AcademicStandardData = useAcademicStandards();
    if (AcademicStandardData.isLoading) return <Loader size={16} label={'Academic Standard'} />;
    return (

        <CustomSelect formik={formik} name="academic_standard_id" label={'Academic Standard'}
            options={ AcademicStandardData.data && AcademicStandardData.data.data &&
                AcademicStandardData.data.data.map(({ id: key, name: value }, index) => (
                    <option key={index} value={key}>{value}</option>
                ))} />

    );

};
