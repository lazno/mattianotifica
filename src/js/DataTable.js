import { HotTable } from '@handsontable/react';
import {
  registerCellType,
  DropdownCellType,
  CheckboxCellType,
  DateCellType
} from 'handsontable/cellTypes';
import React, { useState, useEffect } from 'react';
import { registerAllModules } from 'handsontable/registry';
import axios from 'axios';

registerAllModules();
registerCellType(DropdownCellType);
registerCellType(DateCellType);
registerCellType(CheckboxCellType);

const headers = ['COD_CL', 'COGNOME', 'NOME', 'RAGIONE_SOCIALE', 'ADEMPIMENTO', 'SCADENZA_ADEMPIMENTO', 'ANNO_CIVILE', 'PREDISPOSTO', 'NOTE_CLIENTE']

const columns = [
  { type: 'text', editor: false },
  { type: 'text', editor: false },
  { type: 'text', editor: false },
  { type: 'text', editor: false },
  { type: 'text', editor: false },
  {
    type: 'date',
    dateFormat: 'DD/MM/YYYY',
    editor: false
  },
  { type: 'text', editor: false },
  { type: 'checkbox', editor: false },
  { type: 'text', editor: false }
]

const convertData = (apiData) => {
  const res = []
  for (let i in apiData) {
    res.push([
      apiData[i].COD_CL,
      apiData[i].COGNOME,
      apiData[i].NOME,
      apiData[i].RAGIONE_SOCIALE,
      apiData[i].ADEMPIMENTO,
      new Date(apiData[i].SCADENZA_ADEMPIMENTO).toLocaleDateString('it-it'),
      apiData[i].ANNO_CIVILE,
      apiData[i].PREDISPOSTO == 1 ? true : false,
      apiData[i].NOTE_CLIENTE
    ])
  }
  return res
}

const DataTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const apiData = axios.get('/entries')
      .then((apiData) => {
        const res = convertData(apiData.data)
        setData(res)
      });
  }, []);

  return (
    <div>
      <form
        action='/'
        method='post'
        encType='multipart/form-data'
      >
        <input
          type='file'
          name='uploadfile'
          accept='.csv'
        />
        <input type='submit' value='Upload CSV' />
      </form>
      <HotTable
        id='hot'
        licenseKey='non-commercial-and-evaluation'
        columns={columns}
        data={data}
        rowHeaders={true}
        colHeaders={headers}
        height={'auto'}
        width={'auto'}
        columnSorting={{
          initialConfig: {
            column: 1,
            sortOrder: 'asc'
          },
          indicator: true
        }}

      />
    </div>
  )
}

export default DataTable;