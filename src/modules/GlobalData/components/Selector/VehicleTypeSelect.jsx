 
import { useVehicleTypes } from '@/modules/VehicleType/hooks/queries';
import { Loader } from 'lucide-react';
import { CustomSelect } from './CustomSelect';


export const VehicleTypeSelect = ({ formik, name,label,exclude }) => {


    const VehicleTypeData = useVehicleTypes();
    if (VehicleTypeData.isLoading) return <Loader className='animate-spin' />;
    return (

        <CustomSelect formik={formik} name={name??"vehicleTypeId"}
        label={label??'Vehicle Type'}
            options={VehicleTypeData.data && VehicleTypeData.data.data &&
                VehicleTypeData.data.data.map(({ id: key, name: value }, index) => (

                    exclude && exclude===key? null :
                    <option key={index} value={key}>{value}</option>
                ))} />

    );

};
