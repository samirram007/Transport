import Loader from '../../../../components/Loader';

import { useExpenseGroups } from '../../../ExpenseGroup/hooks/queries';
import { CustomSelect } from './CustomSelect';

export const ExpenseGroupSelect = ({  formik,  name,label,exclude  }) => {


    const ExpenseGroupData = useExpenseGroups();
    if (ExpenseGroupData.isLoading) return <Loader />;
    return (

        <CustomSelect formik={formik} name={name??"expense_group_id"} label={label??'ExpenseGroup'}
            options={ExpenseGroupData.data && ExpenseGroupData.data.data &&
                ExpenseGroupData.data.data.map(({ id: key, name: value }, index) => (

                    exclude && exclude===key? null :
                    <option key={index} value={key}>{value}</option>
                ))} />

    );

};
