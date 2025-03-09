import { useFiscalYears } from '@/modules/FiscalYear/hooks/queries';
import Loader from '../../../../components/Loader';

import { CustomSelect } from './CustomSelect';


export const FiscalYearSelect = ({ formik, name, label, exclude, isCurrent, disabled, ...props }) => {



    const FiscalYearData = useFiscalYears();
    if (FiscalYearData.isPending) return <Loader size={6} label={'Fiscal Year'} />
    return (

        <CustomSelect formik={formik} props={props} disabled={disabled}
            name={name ?? "fiscalYearId"} label={label ?? 'Fiscal Year'}
            options={FiscalYearData.data && FiscalYearData.data.data &&

                FiscalYearData.data.data.map(({ id: key, year: value, isCurrent }, index) => (

                    exclude && exclude === key ? null :
                        <option key={index} value={key} disabled={disabled} >{value}</option>
                ))} />

    );

};
