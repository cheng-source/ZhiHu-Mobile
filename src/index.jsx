import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import 'lib-flexible'
import './index.less';

import { ConfigProvider } from "antd-mobile";
import 	zhCN from 'antd-mobile/es/locales/zh-CN'

(function() {
  const handleMax = function() {
    let html = document.documentElement,
        root = document.getElementById('root'),
        deviceW = html.clientWidth;
    root.style.maxWidth = "750px";
    if (deviceW >= 750) {
      html.style.fontSize = '75px';
    }
  }
  handleMax();
})()


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={zhCN}>
  <App />
</ConfigProvider>
);