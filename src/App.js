import React, { useState } from 'react';
import {
  Grid, PagingPanel, SearchPanel, Table, TableHeaderRow, Toolbar
} from '@devexpress/dx-react-grid-material-ui';
import { IntegratedFiltering, IntegratedPaging, PagingState, SearchState } from '@devexpress/dx-react-grid';
import { useQuery } from '@apollo/client';
import { PEOPLE } from './apollo/people';

 const App = () => {
  
  const [columns] = useState([
    { name: 'height', title: 'height' },
    { name: 'name', title: 'name' },
    { name: 'hairColor', title:'hair_color' }
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
        <PagingState
          defaultCurrentPage={0}
          pageSize={5}
        />
        <IntegratedPaging />
        <Table />
        <TableHeaderRow />
        <Toolbar />
        <SearchPanel />
        <PagingPanel />
      </Grid>
    </div>
  );
};
export default App;