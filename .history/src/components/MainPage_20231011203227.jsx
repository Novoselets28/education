import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (!loading && data) {
      // Populate rows with data from the query
      setRows(data.characters.results);
    }
  }, [data, loading]);

  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows = rows.slice(); // Create a copy of the rows
  
    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      added.forEach((row, index) => {
        changedRows.push({
          id: startingAddedId + index,
          ...row
        });
      });
    }
  
    if (changed) {
      changedRows = rows.map((row) => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    }
  
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter((row) => !deletedSet.has(row.id));
    }
  
    setRows(changedRows);
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
