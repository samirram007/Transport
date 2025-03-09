import Loader from '../../../../components/Loader';

import { useIncomeGroups } from '../../../IncomeGroup/hooks/queries';
import { CustomSelect } from './CustomSelect';

export const IncomeGroupSelect = ({ formik,  name,label,exclude }) => {


    const IncomeGroupData = useIncomeGroups();
    if (IncomeGroupData.isLoading) return <Loader />;
    return (

        <CustomSelect formik={formik} name={name??"income_group_id"} label={label??'IncomeGroup'}
            options={IncomeGroupData.data && IncomeGroupData.data.data &&
                IncomeGroupData.data.data.map(({ id: key, name: value }, index) => (

                    exclude && exclude===key? null :
                    <option key={index} value={key}>{value}</option>
                ))} />

    );

};
