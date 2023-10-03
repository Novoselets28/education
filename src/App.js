import React, { useEffect, useState } from 'react'
import {
  Grid, PagingPanel, SearchPanel, Table, TableHeaderRow, TableRowDetail, Toolbar
} from '@devexpress/dx-react-grid-material-ui'
import { IntegratedFiltering, IntegratedPaging, PagingState, RowDetailState, SearchState } from '@devexpress/dx-react-grid';

 const App = () => {
  
  const [films, setFilms] = useState([]);
  const [columns] = useState([
    { name: 'id', title: 'ID' },
    { name: 'title', title: 'Title' },
    {name: 'vote_count', title:'vote_count'}
  ]);

  const RowDetail = ({ row }) => (
    <div>
      {<img
        src={`https://image.tmdb.org/t/p/w500${row.poster_path}`}
        alt={row.title}
        style={{ width: '100px', height: 'auto' }}
      />}
      {' '}
      {row.title}
      {' '}
    </div>
  );

  useEffect(()=>{
    fetch('https://api.themoviedb.org/3/trending/all/day?api_key=3d9706b6cce789c4f8aaf7a09aec0943')
  .then(response => response.json())
  .then(data => setFilms(data.results))
  .catch(err => console.error(err));
  })

  return (
    <div>
      <Grid
        rows={films}
        columns={columns}>
        <RowDetailState
          defaultExpandedRowIds={[2, 5]}/>
        <SearchState defaultValue="" />
        <IntegratedFiltering />
        <PagingState
          defaultCurrentPage={0}
          pageSize={5}
        />
        <IntegratedPaging />
        <Table />
        <TableHeaderRow />
        <TableRowDetail
          contentComponent={RowDetail}/>
        <Toolbar />
        <SearchPanel />
        <PagingPanel />
      </Grid>
    </div>
  )
}
export default App;