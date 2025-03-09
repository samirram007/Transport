 
import { Loader } from 'lucide-react';
import { useLanguage } from '../../hooks/queries';
import { ENumSelect } from './ENumSelect';


export const LanguageSelect = ({ formik, name,label,exclude }) => {


    const LanguageData = useLanguage();
    if (LanguageData.isLoading) return <Loader className='animate-spin' />;
    return (

        <ENumSelect formik={formik} name={name??"language"}
        label={label??'Language'}
            options={
                LanguageData.data.data && Object.entries(LanguageData.data.data).map(([key, value], index) => (
                    <option key={index} value={key}>{value}</option>
                ))
            }  />

    );

};
