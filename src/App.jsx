import React, { useState } from 'react';
import {
  Grid, PagingPanel, SearchPanel, Table, TableHeaderRow, TableSelection, Toolbar
} from '@devexpress/dx-react-grid-material-ui';
// eslint-disable-next-line max-len
import { IntegratedFiltering, IntegratedPaging, PagingState, SearchState, SelectionState } from '@devexpress/dx-react-grid';
import { useQuery } from '@apollo/client';

import { PEOPLE } from './apollo/people';

 const App = () => {

  const [selection, setSelection] = useState([1]);
  
  const [columns] = useState([
    { name: 'height', title: 'height' },
    { name: 'name', title: 'name' },
    { name: 'gender', title:'gender' }
  ]);

  const { loading, error, data } = useQuery(PEOPLE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Grid
        rows={data.allPeople.people}
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