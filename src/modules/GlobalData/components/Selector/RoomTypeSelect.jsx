import Loader from '../../../../components/Loader';

import { useRoomType } from '../../../hooks/queries';
import { CustomSelect } from './CustomSelect';


export const RoomTypeSelect = ({ formik,  name,label,exclude }) => {

    const RoomTypeData = useRoomType();
    if (RoomTypeData.isLoading) return <Loader />;
    return (

        <CustomSelect formik={formik} name={name??"room_type"}
        label={label??'Room Type'}
            options={RoomTypeData.data && RoomTypeData.data.data &&
                Object.entries(RoomTypeData.data.data).map(([ key, value ], index) => (

                    exclude && exclude===key? null :
                    <option key={index} value={key}>{value}</option>
                ))} />

    );

};
