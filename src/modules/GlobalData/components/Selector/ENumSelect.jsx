import { Label } from "@/components/ui/label"
import { SelectNative } from "@/components/ui/select-native"

 
export const ENumSelect = (
    { formik, label, name, placeholder, type, ...props }
) => {
    return (
        <div className='form-group'>
            <Label htmlFor={name}>{label}</Label>
            <SelectNative name={name} id={name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                defaultValue={formik.values[name]}
                className={`select  w-full ${formik.errors[name] ? 'select-error' : 'select-primary'}`}
            >
                <option value=''      >-- please select</option>
                {props.options}
            </SelectNative>
            {formik.touched[name] && formik.errors[name] ? <div className='text-error text-sm pl-2'>{formik.errors[name]}</div> : null}
        </div>

    )
}


