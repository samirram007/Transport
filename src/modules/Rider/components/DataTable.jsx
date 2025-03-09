import { lazy } from 'react';


import { RiderContextProvider } from '../contexts/RiderContextProvider';
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

    {
      header: "Name",
      accessorKey: "name",
      size: 200,
    },


    {
      header: "Action", accessorKey: "action", size: 300, visible: true,
      className: '    ',
      cell: ({ row }) => {
        return (
          <RiderContextProvider mode="edit" selectedData={row.original}>
            <DisplayCard />
          </RiderContextProvider>
        )
      }
    },


  ]


  return (
    <>
      <FilterTable columns={columns} />
    </>
  )
}

export default DataTable
