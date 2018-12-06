import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

import { ConnectedRouter } from 'connected-react-router';
import { history } from './store/router';

import { Provider } from 'react-redux';

// import { PersistGate } from 'redux-persist/integration/react'

import { store } from './store'; // persistor

jest.mock("react-monaco-editor", () => jest.fn());

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
      </Provider>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});
