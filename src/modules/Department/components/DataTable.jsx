



 
import DepartmentContextProvider from '../context/DepartmentContextProvider';
import DisplayCard from './DisplayCard';
import FilterTable from './FilterTable';
const DataTable = () => {

  /** @type {import('@tanstack/react-table').ColumnDef<any>} */
  const columns = [
    {
      header: "ID", accessorKey: "id", visible: false, size: 50,
    },
    {
      header: "Name", accessorKey: "name", size: 300,
    },
    {
      header: "Code", accessorKey: "code", size: 50,
    },
    {
      header: "Contact No", accessorKey: "contactNo", size: 50,
    },
    {
      header: "Email", accessorKey: "email", size: 50,
    },
    {
      header: "Website", accessorKey: "website", size: 50,
    },
    {
      header: "Establishment Date", accessorKey: "establishmentDate", size: 50,
    },
    {
      header: 'Action', accessorKey: 'action', align: 'center',
      cell: ({ row }) => {
        return (
          <DepartmentContextProvider mode="edit" selectedData={row.original}>
            <DisplayCard />
          </DepartmentContextProvider>
        )
      }
    }

  ]

  return (
    <FilterTable columns={columns} />
  )
}

export default DataTable
