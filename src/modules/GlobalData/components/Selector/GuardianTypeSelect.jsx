import Loader from '../../../../components/Loader';

import { useGuardianType } from '../../../hooks/queries';
import { CustomSelect } from './CustomSelect';


export const GuardianTypeSelect = ({ formik,  name,label,exclude }) => {

    const GuardianTypeData = useGuardianType();
    if (GuardianTypeData.isLoading) return <Loader />;
    return (

        <CustomSelect formik={formik} name={name ?? "guardianType"}
        label={label??'Guardian Type'}
            options={GuardianTypeData.data && GuardianTypeData.data.data &&
                Object.entries(GuardianTypeData.data.data).map(([ key, value ], index) => (

                    exclude && exclude===key? null :
                    <option key={index} value={key}>{value}</option>
                ))} />

    );

};
