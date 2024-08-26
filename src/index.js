import React from 'react';
import ReactDOM from 'react-dom/client';
import { Offline, Online } from 'react-detect-offline';
import { Alert } from 'antd';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Online>
      <App />
    </Online>
    <Offline>
      <>
        <Alert type="error" message={'Отстутсвует подключение к интернету'}></Alert>
      </>
    </Offline>
  </>
);
