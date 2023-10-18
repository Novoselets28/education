import React, { useState } from 'react';
import {
  Grid, PagingPanel, SearchPanel, Table, TableEditColumn, TableHeaderRow, TableSelection, Toolbar
} from '@devexpress/dx-react-grid-material-ui';
import { useQuery } from '@apollo/client';

// eslint-disable-next-line max-len
import { EditingState, IntegratedFiltering, IntegratedPaging, PagingState, SearchState, SelectionState } from '@devexpress/dx-react-grid';

import { GET_CHARACTERS } from './apollo/people';

const App = () => {
  const [selection, setSelection] = useState([]);
  const [columns] = useState([
    { name: 'species', title: 'Species' },
    { name: 'name', title: 'Name' },
    {
      name: 'image',
      title: 'Image',
      getCellValue: (row) => (
        <img src={row.image} alt={row.name} style={{ maxWidth: '100px' }} />
      )
    }
  ]);

  // eslint-disable-next-line no-use-before-define
  const initialRows = data.characters.results.map((character, index) => ({
    id: index, // Use the index as the ID if your data doesn't provide one
    ...character
  }));
  

  const [rows, setRows] = useState(initialRows);

  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows = [...rows];

    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      added.forEach((row) => {
        changedRows.push({
          id: startingAddedId + changedRows.length,
          ...row
        });
      });
    }

    if (changed) {
      changedRows = changedRows.map((row) => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    }

    if (deleted) {
      deleted.forEach((rowId) => {
        const rowIndex = changedRows.findIndex((row) => row.id === rowId);
        if (rowIndex > -1) {
          changedRows.splice(rowIndex, 1);
        }
      });
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
        columns={columns}
      >
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
