



import AcademicClassContextProvider from '../context/UserAcademicClassContextProvider';
import DisplayCard from './DisplayCard';
import FilterTable from './FilterTable';
const DataTable = () => {

  /** @type {import('@tanstack/react-table').ColumnDef<any>} */
  const columns = [
    {
      header: "ID", accessorKey: "id", visible: false, size: 50,
    },
    {
      header: "Class", accessorKey: "class", size: 300,
    }, 
    {
      header: 'Action', accessorKey: 'action', align: 'center',
      cell: ({ row }) => {
        return (
          <AcademicClassContextProvider mode="edit" selectedData={row.original}>
            <DisplayCard />
          </AcademicClassContextProvider>
        )
      }
    }

  ]

  return (
    <FilterTable columns={columns} />
  )
}

export default DataTable
