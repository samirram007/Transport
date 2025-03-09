import Loader from '../../../../components/Loader';

import { useJourneyTypes } from '../../../JourneyType/hooks/queries';
import { CustomSelect } from './CustomSelect';



export const JourneyTypeSelect = ({ formik, name,label,exclude }) => {


    const JourneyTypeData = useJourneyTypes();
    if (JourneyTypeData.isLoading) return <Loader size={6} label={'Journey Type'}/>;
    return (

        <CustomSelect formik={formik} name={name??"journey_type_id"}
        label={label??'Journey Type'}
            options={JourneyTypeData.data && JourneyTypeData.data.data &&
                JourneyTypeData.data.data.map(({ id: key, name: value }, index) => (

                    exclude && exclude===key? null :
                    <option key={index} value={key}>{value}</option>
                ))} />

    );

};
