import { CustomSelect } from './CustomSelect';

export const StudentFilterSelect = ({ formik,  name, label, exclude }) => {

const filterOption=[
    {
        label: 'Active',
        value: 'active',
    },
    {
        label: 'Admission',
        value: 'admission',
    },
    // {
    //     label: 'Promoted',
    //     value: 'promoted',
    // },
    // {
    //     label: 'Transferred',
    //     value: 'transferred',
    // },
    // {
    //     label: 'Inactive',
    //     value: 'inactive',
    // },
]

    return (

        <CustomSelect formik={formik} name={name ?? "filterOption"} label={label ?? 'Choose'}
            options={filterOption &&
                filterOption.map(({ value: key,   label:value }, index) => (

                    exclude && exclude === key ? null :
                        <option key={index} value={key}>{value}</option>
                ))} />

    );

};
