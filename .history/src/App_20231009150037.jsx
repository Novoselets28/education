import React, { useState } from 'react';
import {
  Grid, PagingPanel, SearchPanel, Table, TableHeaderRow, TableSelection, Toolbar
} from '@devexpress/dx-react-grid-material-ui';
// eslint-disable-next-line max-len
import { IntegratedFiltering, IntegratedPaging, PagingState, SearchState, SelectionState } from '@devexpress/dx-react-grid';
import { useQuery } from '@apollo/client';

import { GET_CHARACTERS } from './apollo/people';

 const App = () => {

  const [selection, setSelection] = useState([]);
  
  const [columns] = useState([
    { name: 'species', title: 'species' },
    { name: 'name', title: 'name' },
    { name: 'image', title:'image' }
  ]);

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
        <PagingPanel />
      </Grid>
    </div>
  );
};

export default App;