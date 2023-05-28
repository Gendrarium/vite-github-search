import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App.tsx';
import './styles/styles.scss';
import { ApolloProvider } from '@apollo/client';
import client from './utils/apolloClient.ts';
import { Provider } from 'react-redux';
import { store } from '@redux/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </BrowserRouter>,
  </React.StrictMode>,
);
