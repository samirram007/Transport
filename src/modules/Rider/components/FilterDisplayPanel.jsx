import AcademicClassCard from "@/modules/AcademicClass/components/AcademicClassCard"
import AcademicSessionCard from "@/modules/AcademicSession/components/AcademicSessionCard"

const FilterDisplayPanel = () => {
  return (
    <div className="flex flex-row flex-wrap justify-start items-center gap-6 pt-4 font-bold border-b-2 border-red-600/5 pb-1">
        <AcademicSessionCard />
        <AcademicClassCard />
    </div>
  )
}

export default FilterDisplayPanel

 
  