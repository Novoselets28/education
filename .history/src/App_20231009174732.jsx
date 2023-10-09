import React, { useState } from 'react';
import {
  Grid, PagingPanel, SearchPanel, Table, TableEditColumn, TableFilterRow, TableHeaderRow, TableSelection, Toolbar
} from '@devexpress/dx-react-grid-material-ui';
import { useQuery } from '@apollo/client';

import { EditingState, FilteringState, IntegratedFiltering, 
IntegratedPaging, PagingState, SearchState, SelectionState } from '@devexpress/dx-react-grid';

import { Bar } from 'react-chartjs-2';

import { GET_CHARACTERS } from './apollo/people';

const App = () => {
  const [selection, setSelection] = useState([]);
  const [columns] = useState([
    { name: 'gender', title: 'Gender' },
    { name: 'name', title: 'Name' },
    {
      name: 'image',
      title: 'Image',
      getCellValue: (row) => (<img src={row.image} alt={row.name} style={{ maxWidth: '100px' }} />)}]);
  const Chart = ( data ) => {
    const chartData = {
      labels: data.map((item) => item.name),
      datasets: [
        {
          label: 'Species Count',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          data: data.map((item) => item.species.length)
        }
      ]
    };
    const chartOptions = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };
    return <Bar data={chartData} options={chartOptions} />;
  };
  const { loading, error, data } = useQuery(GET_CHARACTERS);
  const [rows, setRows] = useState([]);
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
      changedRows = changedRows.map((row) => {
        const updatedRow = { ...row };
        if (changed[row.id]) {
          updatedRow.name = changed[row.id].name;
          updatedRow.species = changed[row.id].species;
        }
        return updatedRow;
      });
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
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <Grid
        rows={data.characters.results}
        columns={columns}>
        <SearchState defaultValue="" />
        <FilteringState defaultFilters={[]} />
        <IntegratedFiltering />
        <SelectionState
          selection={selection}
          onSelectionChange={setSelection}/>
        <EditingState
          onCommitChanges={commitChanges}/>
        <PagingState
          defaultCurrentPage={0}
          pageSize={5}/>
        <IntegratedPaging />
        <Table />
        <TableHeaderRow />
        <Toolbar />
        <SearchPanel />
        <TableFilterRow />
        <TableSelection
          selectByRowClick/>
        <TableEditColumn
          showAddCommand
          showEditCommand
          showDeleteCommand/>
        <PagingPanel />
      </Grid>
      <Chart data={data.characters.results} />
    </div>
  );
};
export default App;