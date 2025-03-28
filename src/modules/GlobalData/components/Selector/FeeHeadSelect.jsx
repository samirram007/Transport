import Loader from '../../../../components/Loader';

import { useFeeHeads } from '../../../FeeHead/hooks/queries';
import { CustomSelect } from './CustomSelect';



export const FeeHeadSelect = ({ formik, auto,income_group_ids, name,label  }) => {

    const FeeHeadData = useFeeHeads({income_group_ids:income_group_ids??[]});
    if (FeeHeadData.isLoading) return <Loader size={6} label={'Fee Head'} />;

    return (
        <CustomSelect formik={formik} name={name ?? "feeHeadId"}
            label={label ?? 'Fee Head '}
            options={FeeHeadData.data && FeeHeadData.data.data &&
                FeeHeadData.data.data.map(({ id: key, name: value }, index) => (
                     <option key={index} value={key}>{value}</option>
                ))} />

    )

}


