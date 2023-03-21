import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import { useSelector } from 'react-redux';

const DonationsTable=()=>{
   const data=useSelector(state=>state.donations)
   const columns = useMemo(
    () => [
      
      {
        accessorKey: 'name', //normal accessorKey
        header: 'Name',
      },
      {
        accessorKey: 'sum',
        header: 'Sum',
      },
    
    ],
    [],
  );

  return <MaterialReactTable columns={columns} data={data} />;
}
export default DonationsTable