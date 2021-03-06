import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from '@/App.jsx';
import * as serviceWorker from '@/serviceWorker';

// 样式
import 'normalize.css';
import '@/index.styl';

// redux
import { Provider } from 'react-redux';
import { store } from '@/redux';

// 错误边界
import ErrorBoundary from '@/ErrorBoundary.jsx';

// 环境
import { SAP_CONTROL } from '@/config/app-config';
import { ENVIRONMENT } from '@/constants/app-constants';

// 生产环境设置
if (ENVIRONMENT.PRO === SAP_CONTROL) {
  console.log = () => {};
}

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
