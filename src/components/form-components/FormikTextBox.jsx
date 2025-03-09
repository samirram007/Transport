import useDebouncedFormik from "../../hooks/useDebouncedFormik";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
export const FormikTextBox = (
    { formik, label, name, placeholder, type, ...props }
) => {
    const debouncedFormik = useDebouncedFormik(formik, 1000);
    return (
        <div className="grid w-full max-w-md items-center gap-1.5">

            <Label htmlFor={name}>{label}</Label>

            <Textarea
                id={name}
                name={name}
                cols="30" rows="4"
                type={type ?? 'text'}
                placeholder={placeholder ?? `Enter ${label}`}
                onChange={debouncedFormik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[name]}
                className={`w-full  input mb-0 input-bordered border-zinc-700 dark:border-zinc-500 input-primary    ${formik.errors[name] ? 'input-error' : ''}`}
            />
            {formik.touched[name] && formik.errors[name] ? <div className='text-error text-sm pl-2'>{formik.errors[name]}</div> : null}
        </div>

    )
}