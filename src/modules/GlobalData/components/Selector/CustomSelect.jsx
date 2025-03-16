import { Label } from "@/components/ui/label";
import { SelectNative } from "@/components/ui/select-native";
import { lowerCase } from "@/lib/removeEmptyStrings";
import { useId } from "react";

export const CustomSelect = (
    { formik, label, name, placeholder, type, disabled, defaultValue = '', ...props }
) => {
    const id = useId();
    return (
        <div className='form-group'>
            <Label htmlFor={id}>{label}</Label>
            <SelectNative name={name} id={id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[name] ?? defaultValue}
                disabled={disabled}
                className={`  ${formik.errors[name] ? 'select-error' : 'form-select'}`}
            >
                <option value="" disabled>
                    -- please select {lowerCase(label)} --
                </option>

                {props.options}
            </SelectNative>
            {formik.touched[name] && formik.errors[name] ? <div className='text-error text-sm pl-2'>{formik.errors[name]}</div> : null}
        </div>

    )
}


