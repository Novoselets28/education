import React, { useState, useEffect } from 'react';
import {
  Grid, 
  PagingPanel, 
  SearchPanel, 
  Table, 
  TableEditColumn, 
  TableFilterRow, 
  TableHeaderRow, 
  TableSelection, 
  Toolbar, 
  TableEditRow
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

  useEffect(() => {
    if (!loading && data) {
      // Populate rows with data from the query
      setRows(data.characters.results);
    }
  }, [data, loading]);

  const commitChanges = ({ added, deleted }) => {
    let newRows = rows.slice(); // Create a copy of the rows

    if (added) {
      console.log('Add Rows:', added);

      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      added.forEach((addedRow, index) => {
        newRows.push({
          id: startingAddedId + index,
          ...addedRow
        });
      });
    }

    if (deleted) {
      console.log('Deleted Rows:', deleted);

      const deletedIds = deleted.map((deletedRowIndex) => newRows[deletedRowIndex].id);
      console.log('Deleted IDs:', deletedIds);

      newRows = newRows.filter((row) => !deletedIds.includes(row.id));

      console.log('newRows:', newRows);
    }

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
        <TableEditRow />
        <TableEditColumn
          showAddCommand
          showDeleteCommand
        />
        <PagingPanel />
      </Grid>
    </div>
  );
};

export default MainPage;
