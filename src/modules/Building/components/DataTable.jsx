import React from 'react'


import { useMemo } from 'react';

import FilterTable from '../../../components/tables/FilterTable';

import { useBuildings } from '../hooks/queries';
import Create from './Create';
import Edit from './Edit';

import Delete from './Delete';
import Filter from './Filter';

const initialValues = {
  name: '',
  code: '',
  campus_id: 1,
  capacity:0

}
const initialFilterValues = {
  campus_id: initialValues.campus_id
}

const DataTable = () => {

  const BuildingData = useBuildings(initialFilterValues)


  const mData = BuildingData.data?.data ?? [];

  const data = useMemo(() => [...mData], [mData]);

  /** @type {import('@tanstack/react-table').ColumnDef<any>} */
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
      visible: false,
      size: 50,

    },
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Code',
      accessorKey: 'code',
    },
    {
      header: 'Campus',
      accessorKey: 'campus.name',
    },
    {
      header: 'Capacity',
      accessorKey: 'capacity',
    },
    {
      header: 'Action',
      accessorKey: 'action',
      align: 'center',
      cell: ({ row }) => {

        return (
          <div className="flex justify-start md:justify-center  items-center gap-2">
           <Edit initialValues={row.original} />
           {/* <Delete initialValues={row.original} /> */}

          </div>
        )
      }
    }

  ]

  return (
    <FilterTable
      data={data} columns={columns}
      createForm={<Create modal={true} />}
      createFormTitle="Create Building"
      filter={
        <Filter BuildingData={BuildingData} initialFilterValues={initialFilterValues} />
      }
    />
  )
}

export default DataTable
