import React, { useState } from 'react';
import {
  Grid, PagingPanel, SearchPanel, Table, TableFilterRow, TableHeaderRow, Toolbar
} from '@devexpress/dx-react-grid-material-ui';
import { useQuery } from '@apollo/client';

import {
  FilteringState,
  IntegratedFiltering,
  PagingState,
  SearchState
} from '@devexpress/dx-react-grid';

import { GET_CHARACTERS } from '../apollo/people';

const MainPage = () => {
  const { loading, error, data } = useQuery(GET_CHARACTERS);
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

  const [rows, setRows] = useState(data.characters.results);

  const commitChanges = ({ deleted }) => {
    if (deleted) {
      const deletedSet = new Set(deleted);
      const newRows = rows.filter(row => !deletedSet.has(row));
      setRows(newRows);
      setSelection([]);
    }
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
        <PagingState
          defaultCurrentPage={0}
          pageSize={5}
        />
        <Table />
        <TableHeaderRow />
        <Toolbar />
        <SearchPanel />
        <TableFilterRow />
        <PagingPanel />
      </Grid>
    </div>
  );
};

export default MainPage;
