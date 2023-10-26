import React, { useState, useEffect } from 'react';
import {
  Grid, 
  PagingPanel, 
  SearchPanel, 
  Table, 
  TableEditColumn, 
  TableHeaderRow, 
  TableSelection, 
  Toolbar, 
  TableEditRow
} from '@devexpress/dx-react-grid-material-ui';
import { useQuery } from '@apollo/client';

import {
  EditingState,
  IntegratedFiltering,
  IntegratedPaging,
  PagingState,
  SearchState,
  SelectionState,
  ChangeSet
} from '@devexpress/dx-react-grid';

import { GET_CHARACTERS } from '../../apollo/people';

interface Character {
  id: number;
  gender: string[];
  name: string[];
  image: string[];
}

interface AddedCharacter {
  gender: string[];
  name: string[];
  image: string[];
}

const MainPage: React.FC = () => {
  const [selection, setSelection] = useState<(string | number)[]>([]);
  const [columns] = useState([
    { name: 'gender', title: 'Gender' },
    { name: 'name', title: 'Name' },
    {
      name: 'image',
      title: 'Image',
      getCellValue: (row: { image: string; name: string; }) => (
        <img src={row.image} alt={row.name} style={{ maxWidth: '100px' }} />
      )
    }
  ]);

  const { loading, error, data } = useQuery(GET_CHARACTERS);
  const [rows, setRows] = useState<Character[]>([]);

  useEffect(() => {
    if (!loading && data) {
      setRows(data.characters.results);
    }
  }, [data, loading]);

  const commitChanges = ({ added, deleted }: ChangeSet) => {
    let newRows = rows.slice();
  
    if (added) {
      console.log('Add Rows:', added);
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      added.forEach((addedRow: AddedCharacter, index: number) => {
        newRows.push({
          id: startingAddedId + index,
          ...addedRow
        });
      });
    }
  
    if (deleted) {
      const deletedIds = (deleted as number[]).map((deletedRowIndex) => newRows[deletedRowIndex].id);
      newRows = newRows.filter((row) => !deletedIds.includes(row.id));
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
