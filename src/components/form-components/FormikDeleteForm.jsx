import { Loader } from 'lucide-react';
import { Button } from '../ui/button';

const FormikDeleteForm = ({formik,setModalOpen}) => {

    

    return (
        <div className="grid grid-rows-[1fr] h-full max-h-full relative">


            <form onSubmit={formik.handleSubmit} className="flex flex-col h-full ">
                {/* Scrollable Content */}

                 

                {/* Fixed Footer with Save Button */}
                <div className="flex flex-col gap-4 justify-center items-center sticky bottom-0 
              border-blue-300/50 dark:border-blue-300/20 py-4 px-4 mt-2">
                    <div className="flex gap-2 text-xl items-start
                     text-red-600 dark:text-red-400 px-4 justify-center text-center">
                        { ' Are you absolutely sure you want to permanently delete this record? This action is irreversible and cannot be undone. '}
                    </div>
                    <div className="flex flex-row gap-4 border-t-2 border-blue-300/50 dark:border-blue-300/20 py-4 px-4 mt-2">
                        <Button type="submit" className="btn bg-red-400 dark:bg-red-500 btn-wide flex items-center gap-2" disabled={formik.isSubmitting}>
                            {formik.isSubmitting && (
                                <Loader className="w-6 h-6 ml-n2 animate-spin" />

                            )}
                            {"delete"}
                        </Button>
                        <Button type="button" 
                        onClick={()=>setModalOpen(false)} className="btn bg-background btn-wide flex items-center gap-2"  >
                            {"Cancel"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default FormikDeleteForm