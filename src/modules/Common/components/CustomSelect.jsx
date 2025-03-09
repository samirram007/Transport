import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"

export const CustomSelect = (
    { formik, label, name, placeholder, type, defaultValue = '', ...props }
) => {
console.log('props  ',name, props.options)
    return (
        <div className='form-group'>
            <Label htmlFor={name}>{label}</Label>
            <Select name={name} id={name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[name] ?? defaultValue}
                className={`select form-input  ${formik.errors[name] ? 'select-error' : 'form-select'}`}
            >
                <SelectTrigger value=''>
                    <SelectValue placeholder="-- please select" />
                </SelectTrigger>
                <SelectContent>
                    {/* <SelectItem /> */}
                {props.options}
                </SelectContent>
            </Select>
            {formik.touched[name] && formik.errors[name] ? <div className='text-error text-sm pl-2'>{formik.errors[name]}</div> : null}
        </div>

    )
}


