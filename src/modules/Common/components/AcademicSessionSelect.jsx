import { useAcademicSessions } from '@/modules/AcademicSession/hooks/queries';
import Loader from '../../../components/Loader';
 
import { CustomSelect } from './CustomSelect';


export const AcademicSessionSelect = ({ formik, name, label, exclude, isCurrent, ...props }) => {



    const AcademicSessionData = useAcademicSessions();
    if (AcademicSessionData.isPending) return <Loader size={6} label={'Academic Session'} />
    return (

        <CustomSelect formik={formik} props={props}
            name={name ?? "academicSessionId"} label={label ?? 'Academic Session'}
            options={AcademicSessionData.data && AcademicSessionData.data.data &&

                AcademicSessionData.data.data.map(({ id: key, session: value, isCurrent }, index) => (

                    exclude && exclude === key ? null :
                        <option key={index} value={key} >{value}</option>
                ))} />

    );

};
