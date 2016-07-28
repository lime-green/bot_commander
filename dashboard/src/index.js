import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import RootReducer from './reducers/reducers';
import App from './containers/App';
import thunkMiddleware from 'redux-thunk';

let store = createStore(
    RootReducer,
    {},
    applyMiddleware(thunkMiddleware)
);

store.subscribe(() => {
    console.log(store.getState());
});

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)