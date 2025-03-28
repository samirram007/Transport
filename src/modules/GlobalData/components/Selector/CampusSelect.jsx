import { Label } from '@/components/ui/label'
import { SelectNative } from '@/components/ui/select-native'
import Loader from '../../../../components/Loader'
import { useCampuses } from '../../../Campus/hooks/queries'


export const CampusSelect = ({formik,auto,isLoading,setIsLoading}) => {
    const CampusData = useCampuses()

    if(CampusData.isLoading)   return <Loader size={6} label={'Campus'} />

   // console.log(CampusData.isLoading);
    return (

            CampusData.data &&
                <HandleSelect
                    formik={formik}
                    name="campusId"
                    label={'Campus'}
                    auto={auto}
                    options={
                        CampusData.data.data &&
                        CampusData.data.data.map(({ id: key, name: value }, index) => (
                            <option key={index} value={key}>{value}</option>
                        ))
                    } />
         )

}


export const HandleSelect = (
    { formik, label, name, placeholder, type, ...props }
) => {


    const handleDropdownChange = (event) => {
        const { name, value } = event.target;
        formik.setFieldValue(name, value); // Update the dropdown field that triggered the change
        props.auto && formik.handleSubmit()
        // If campus_id dropdown changes, reset academic_session_id and academic_class_id
        if (name === 'campusId') {
            // formik.values.academic_session_id && formik.setFieldValue('academic_session_id', ''); // Reset academic_session_id
            formik.values.academic_class_id && formik.setFieldValue('academicClassId', ''); // Reset academic_class_id
            formik.values.building_id && formik.setFieldValue('buildingId', ''); // Reset academic_class_id
        }
    };
    return (
        <div className='form-group'>
            <Label htmlFor={name}>{label}</Label>
            <SelectNative name={name} id={name}
                onChange={handleDropdownChange}
                onBlur={formik.handleBlur}
                value={formik.values[name]}
                className={`select  w-full ${formik.errors[name] ? 'select-error' : 'select-primary'}`}
            >
                <option value='0'      >-- please select</option>
                {props.options}
            </SelectNative>
            {formik.touched[name] && formik.errors[name] ? <div className='text-error text-sm pl-2'>{formik.errors[name]}</div> : null}
        </div>

    )
}
