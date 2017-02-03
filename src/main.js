let regeneratorRuntime =  require("regenerator-runtime");
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import * as reducers from './reducers';


// Apollo API definition
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
export const apiClient = new ApolloClient({
    networkInterface: createNetworkInterface('//localhost:4000/graphql', {
        credentials: 'same-origin',
    }),
    shouldBatch: false
});


// Redux store definition
const logger = createLogger();
const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const storeMiddleware = composeEnhancers(applyMiddleware(logger));
const combinedReducer = combineReducers({
    projectsReducer: reducers.projectsReducer,
    issuesReducer: reducers.issuesReducer
});

const store = createStore(combinedReducer, persistedState, storeMiddleware);

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

// Components
import App from './components/App';

// Stylesheets
import '../public/css/bootstrap.min.css';
import '../public/css/main.css';
import '../public/css/styles.css';
import '../public/css/loader1.css';
import '../public/css/loader2.css';
import '../public/css/toastr.min.css';

// JavaScripts with Exposes
import 'expose?$!expose?jquery!expose?jQuery!../public/js/jquery.min';

// JavaScripts
import '../public/js/bootstrap.min';
import '../public/js/toastr.min.js';
import '../public/js/bootstrap-datepicker.js';


ReactDOM.render((
    <ApolloProvider client={apiClient}>
        <Provider store={store}>
            <App />
        </Provider>
    </ApolloProvider>
), document.getElementById('app'));
