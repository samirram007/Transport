import useDebouncedFormik from "../../hooks/useDebouncedFormik";
export const FormikViewBox = (
    { formik, label, name, placeholder, type, ...props }
) => {
    const debouncedFormik = useDebouncedFormik(formik, 1000);
    return (
        <div className="grid grid-cols-[100px_10px_1fr] md:grid-cols-[100px_40px_1fr] text-sm justify-center items-start w-full max-w-md  gap-1.5 overflow-x-auto">

            <div className="text-sm ">{label}</div>
            <div className="text-sm  text-right">:</div>
            <div className={`text-sm font-semibold   `}
            >{formik.values[name]}</div>
        </div>

    )
}