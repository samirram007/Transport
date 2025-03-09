 
import { useSlots } from '@/modules/Slot/hooks/queries';
import { Loader } from 'lucide-react';
import { CustomSelect } from './CustomSelect';


export const SlotSelect = ({ formik, name,label,exclude }) => {


    const SlotData = useSlots();
    if (SlotData.isLoading) return <Loader className='animate-spin' />;
    return (

        <CustomSelect formik={formik} name={name??"slotId"}
        label={label??'Slot'}
            options={SlotData.data && SlotData.data.data &&
                SlotData.data.data.map(({ id: key, name: value }, index) => (

                    exclude && exclude===key? null :
                    <option key={index} value={key}>{value}</option>
                ))} />

    );

};
