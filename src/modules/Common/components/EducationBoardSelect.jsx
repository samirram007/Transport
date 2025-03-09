 
import { Loader } from 'lucide-react';
import { useEducationBoards } from '../../EducationBoard/hooks/queries';
import { CustomSelect } from './CustomSelect';

export const EducationBoardSelect = ({ formik,  name,label,exclude }) => {
   
    const EducationBoardData = useEducationBoards();
    if (EducationBoardData.isLoading) return <Loader className='animate-spin' />;
    return (

        <CustomSelect formik={formik} name={name??"educationBoardId"}
        label={label??'Education Board'}
            options={EducationBoardData.data && EducationBoardData.data.data &&
                EducationBoardData.data.data.map(({ id: key, name: value }, index) => (

                    exclude && exclude===key? null :
                    <option key={index} value={key}>{value}</option>
                ))} />

    );

};
