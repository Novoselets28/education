import React, { useState } from 'react';
import {
  Grid, PagingPanel, SearchPanel, Table, TableEditColumn, TableHeaderRow, TableSelection, Toolbar
} from '@devexpress/dx-react-grid-material-ui';
// eslint-disable-next-line max-len
import { EditingState, IntegratedFiltering, IntegratedPaging, PagingState, SearchState, SelectionState } from '@devexpress/dx-react-grid';
import { useQuery } from '@apollo/client';

import { GET_CHARACTERS } from './apollo/people';

 const App = () => {

  const [selection, setSelection] = useState([]);
  
  const [columns] = useState([
    { name: 'species', title: 'species' },
    { name: 'name', title: 'name' },
    {
      name: 'image',
      title: 'Image',
      getCellValue: (row) => (
        <img src={row.image} alt={row.name} style={{ maxWidth: '100px' }} />
      )
    }
  ]);

  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter(row => !deletedSet.has(row.id));
    }
    setRows(changedRows);
  };

  const { loading, error, data } = useQuery(GET_CHARACTERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Grid
        rows={data.characters.results}
        columns={columns}>
        <SearchState defaultValue="" />
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
        <TableSelection
          selectByRowClick
        />
        <TableEditColumn
          showAddCommand
          showEditCommand
          showDeleteCommand
        />
        <PagingPanel />
      </Grid>
    </div>
  );
};

export default App;