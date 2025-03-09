import { lazy } from 'react';



import FeeContextProvider from '../contexts/FeeContextProvider';
import DisplayCard from './DisplayCard';

const FilterTable = lazy(() => import('./FilterTable'))



const DataTable = () => {


  /** @type {import('@tanstack/react-table').ColumnDef<any>} */
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
      visible: false,
      size: 50,

    },

    { header: "Fee No", accessorKey: "feeNo", },
    { header: "Fee Date", accessorKey: "feeDate", },
    { header: "Rider", accessorKey: "rider.name", id: 'rider' },
    { header: "School", accessorKey: "rider.school.name", id: 'school' },
    { header: "Fiscal Year", accessorKey: "fiscalYear.name", id: 'fiscalYear' },


    {
      header: "Action", accessorKey: "action", size: 300, visible: true,
      className: '    ',
      cell: ({ row }) => {
        return (
          <FeeContextProvider mode="edit" selectedData={row.original}>
            <DisplayCard />
          </FeeContextProvider>
        )
      }
    },


  ]


  return (
    <FilterTable columns={columns}
    />
  )
}

export default DataTable
