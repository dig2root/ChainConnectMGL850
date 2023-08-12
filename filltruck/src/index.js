import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { DAppProvider, Localhost } from '@usedapp/core'

const config = {
  readOnlyChainId: Localhost.chainId,
  readOnlyUrls: {
    [Localhost.chainId]: 'http://127.0.0.1:7545',
  },
}

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);