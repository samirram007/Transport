 
import { useVehicles } from '@/modules/Vehicle/hooks/queries';
import { Loader } from 'lucide-react';
import { CustomSelect } from './CustomSelect';


export const VehicleSelect = ({ formik, name,label,exclude }) => {


    const VehicleData = useVehicles();
    if (VehicleData.isLoading) return <Loader className='animate-spin' />;
    return (

        <CustomSelect formik={formik} name={name??"vehicleId"}
        label={label??'Vehicle'}
            options={VehicleData.data && VehicleData.data.data &&
                VehicleData.data.data.map(({ id: key, name: value }, index) => (

                    exclude && exclude===key? null :
                    <option key={index} value={key}>{value}</option>
                ))} />

    );

};
