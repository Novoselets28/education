import React, { useState } from 'react';
import {
  Grid, PagingPanel, SearchPanel, Table, TableEditColumn, TableFilterRow, TableHeaderRow, TableSelection, Toolbar
} from '@devexpress/dx-react-grid-material-ui';
import { useQuery } from '@apollo/client';

import {
  FilteringState,
  IntegratedFiltering,
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

  const [rows, setRows] = useState(data.characters.results);

  const handleSelectionChange = (selectedRows) => {
    setSelection(selectedRows);
  };

  const handleDelete = () => {
    const newRows = rows.filter(row => !selection.includes(row));
    setRows(newRows);
    setSelection([]);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Grid
        rows={rows}
        columns={columns}
      >
        <SearchState defaultValue="" />
        <FilteringState defaultFilters={[]} />
        <IntegratedFiltering />
        <SelectionState
          selection={selection}
          onSelectionChange={handleSelectionChange}
        />
        <PagingState
          defaultCurrentPage={0}
          pageSize={5}
        />
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
          onExecute={handleDelete}
        />
        <PagingPanel />
      </Grid>
    </div>
  );
};

export default MainPage;
