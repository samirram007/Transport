import { Loader } from "lucide-react"
import { Button } from "../ui/button"


const FormikSubmitPanel = ({formik}) => {
    return (
        <div className="flex justify-center items-center sticky bottom-0 
        border-t-6 border-blue-300/50 dark:border-blue-300/20 py-4 px-4 mt-2">
                <div className="flex gap-2 items-center text-red-600">
                    
                </div>
                <Button type="submit" className="btn bg-primary btn-wide flex items-center gap-2" disabled={formik.isSubmitting}>
                    {formik.isSubmitting && (
                        <Loader className="w-6 h-6 ml-n2 animate-spin" />

                    )}
                    {"Save"}
                </Button>
            </div>
    )
}
export default FormikSubmitPanel