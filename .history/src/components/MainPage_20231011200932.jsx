import React, { useState } from 'react';
import {
  Grid, PagingPanel, SearchPanel, Table, TableEditColumn, TableFilterRow, TableHeaderRow, TableSelection, Toolbar
} from '@devexpress/dx-react-grid-material-ui';
import { useQuery } from '@apollo/client';

import {
  EditingState,
  FilteringState,
  IntegratedFiltering,
  IntegratedPaging,
  PagingState,
  SearchState,
  SelectionState
} from '@devexpress/dx-react-grid';

import { GET_CHARACTERS } from '../apollo/people';

const MainPage = () => {
  const [selection, setSelection] = useState([]);
  const [columns] = useState([
    { name: 'gender', title: 'Gender' },
    { name: 'name', title: 'Name' },
    {
      name: 'image',
      title: 'Image',
      getCellValue: (row) => (
        <img src={row.image} alt={row.name} style={{ maxWidth: '100px' }} />
      )
    }
  ]);

  const { loading, error, data } = useQuery(GET_CHARACTERS);

  const [rows, setRows] = useState([]);
  
  const commitChanges = ({ deleted }) => {
    if (deleted) {
      const deletedRows = deleted.map(deletedRowIndex => data.characters.results[deletedRowIndex].id);
  
      const newRows = rows.filter(row => !deletedRows.includes(row.id));
  
      console.log('Deleted Rows:', deletedRows);
      console.log('newRows:', newRows);
  
      setRows(newRows);
      setSelection([]);
    }
  };
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Grid
        rows={data.characters.results}
        columns={columns}
      >
        <SearchState defaultValue="" />
        <FilteringState defaultFilters={[]} />
        <IntegratedFiltering />
        <SelectionState
          selection={selection}
          onSelectionChange={setSelection}
        />
        <EditingState
          onCommitChanges={commitChanges}
        />
        <PagingState
          defaultCurrentPage={0}
          pageSize={5}
        />
        <IntegratedPaging />
        <Table />
        <TableHeaderRow />
        <Toolbar />
        <SearchPanel />
        <TableFilterRow />
        <TableSelection
          selectByRowClick
        />
        <TableEditColumn
          showDeleteCommand
        />
        <PagingPanel />
      </Grid>
    </div>
  );
};

export default MainPage;
