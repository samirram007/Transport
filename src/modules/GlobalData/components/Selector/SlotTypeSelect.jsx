 
import { Loader } from 'lucide-react';
import { useSlotType } from '../../hooks/queries';
import { ENumSelect } from './ENumSelect';


export const SlotTypeSelect = ({ formik, name,label,exclude }) => {


    const SlotTypeData = useSlotType();
    if (SlotTypeData.isLoading) return <Loader className='animate-spin' />;
    return (

        <ENumSelect formik={formik} name={name??"slotType"}
        label={label??'SlotType'}
            options={
                SlotTypeData.data.data && Object.entries(SlotTypeData.data.data).map(([key, value], index) => (
                    <option key={index} value={key}>{value}</option>
                ))
            }  />

    );

};
