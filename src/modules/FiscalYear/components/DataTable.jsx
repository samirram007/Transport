



import FiscalYearContextProvider from '../context/UserFiscalYearContextProvider';
import DisplayCard from './DisplayCard';
import FilterTable from './FilterTable';
const DataTable = () => {

  /** @type {import('@tanstack/react-table').ColumnDef<any>} */
  const columns = [
    {
      header: "ID", accessorKey: "id", visible: false, size: 50,
    },
    {
      header: "Session", accessorKey: "session", size: 300,
    },
    {
      header: 'Action', accessorKey: 'action', align: 'center',
      cell: ({ row }) => {
        return (
          <FiscalYearContextProvider mode="edit" selectedData={row.original}>
            <DisplayCard />
          </FiscalYearContextProvider>
        )
      }
    }

  ]

  return (
    <FilterTable columns={columns} />
  )
}

export default DataTable
