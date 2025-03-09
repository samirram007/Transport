



import SlotContextProvider from '../context/SlotContextProvider';
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
      header: "Type", accessorKey: "slotType", size: 50,
    },
    {
      header: "Capacity", accessorKey: "capacity", size: 50,
    },
    {
      header: "Start time", accessorKey: "startTime", size: 50,
    },
    {
      header: "End Time", accessorKey: "endTime", size: 50,
    },
    {
      header: 'Action', accessorKey: 'action', align: 'center',
      cell: ({ row }) => {
        return (
          <SlotContextProvider mode="edit" selectedData={row.original}>
            <DisplayCard />
          </SlotContextProvider>
        )
      }
    }

  ]

  return (
    <FilterTable columns={columns} />
  )
}

export default DataTable
