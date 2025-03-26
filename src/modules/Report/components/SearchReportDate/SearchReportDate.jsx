import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";





const SearchReportDate = ({reportDate,setReportDate,labelName}) => {
    return(
        <>
            <Label htmlFor="">{labelName}</Label>
            <Input type="date" value={reportDate} onChange={(e) => setReportDate(e.target.value)} />
        </>
    )
}



export default SearchReportDate;