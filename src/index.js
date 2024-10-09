import React from 'react';
import ReactDOM from 'react-dom/client';
import { Offline, Online } from 'react-detect-offline';
import { Alert } from 'antd';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    {/* <Online> */}
    <App />
    {/* </Online> */}
    {/* <Offline>
      <div className="alert">
        <Alert type="error" message={'Error, что-то пошло не так!'} className="alert__error"></Alert>
      </div>
    </Offline> */}
  </>
);
