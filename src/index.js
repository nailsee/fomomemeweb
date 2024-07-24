import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './reset.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider,theme } from 'antd';
import { MetaMaskProvider } from '@metamask/sdk-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MetaMaskProvider debug={false} sdkOptions={{
    dappMetadata: {
      name: "FomoMemeWeb",
      url: window.location.href,
    }
    // Other options
  }}>
    <ConfigProvider theme={{
      token: {
        colorPrimary: '#FC6542',
      },
      algorithm:theme.darkAlgorithm,
    }}>
      <App />
    </ConfigProvider>
  </MetaMaskProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
