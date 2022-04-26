import React from 'react'
import DataTable from './js/DataTable'
import { createRoot } from 'react-dom/client';

import './css/style.css'

const container = document.getElementById('react-container'); // eslint-disable-line no-undef
const root = createRoot(container);
root.render(<DataTable tab="react-container" />);

if (module.hot) // eslint-disable-line no-undef  
  module.hot.accept() // eslint-disable-line no-undef  
