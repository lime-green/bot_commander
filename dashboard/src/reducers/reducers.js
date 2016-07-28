import {RECEIVE_SERVERS, REQUEST_SERVERS, RECEIVE_RSACCOUNTS, REQUEST_RSACCOUNTS, RECEIVE_INITSERVER, REQUEST_INITSERVER, RECEIVE_INITSERVER_FAILURE, OPEN_DEPLOY_MODAL, CLOSE_DEPLOY_MODAL, REQUEST_DEPLOY, RECEIVE_DEPLOY_RESPONSE, RECEIVE_DEPLOY_RESPONSE_FAILURE, ADD_ALERT, REMOVE_ALERT} from '../actions/actions';

const initialState = {
    servers: {
        isFetching: false,
        items: []
    },

    rsAccounts: {
        isFetching: false,
        items: []
    },

    modal: {
        active: false,
        id: null
    },

    alerts: []
};

function serverReducer(state = initialState.servers, action) {
    switch(action.type) {
        case REQUEST_INITSERVER:
            return Object.assign({}, state, {items:
                state.items.map((server => {
                    if (server.id == action.id) {
                        return Object.assign({}, server, {isInitializing: true});
                    }
                    return server;
                }))
            });
        case RECEIVE_INITSERVER:
        case RECEIVE_INITSERVER_FAILURE:
            return Object.assign({}, state, {items:
                state.items.map((server => {
                    if (server.id == action.id) {
                        return Object.assign({}, server, {isInitializing: false});
                    }
                    return server;
                }))
            });
        case RECEIVE_SERVERS:
            return Object.assign({}, state, {
                items: action.servers.map((server) => Object.assign({}, server, {isInitializing: false})),
                isFetching: false
            });
        case REQUEST_SERVERS:
            return Object.assign({}, state, {isFetching: true});
        default:
            return state;
    }
}

function rsAccountReducer(state = initialState.rsAccounts, action) {
    switch(action.type) {
        case RECEIVE_RSACCOUNTS:
            return Object.assign({}, state, {items: action.rsAccounts, isFetching: false});
        case REQUEST_RSACCOUNTS:
            return Object.assign({}, state, {isFetching: true});
        default:
            return state;
    }
}

function modalReducer(state = initialState.modal, action) {
    switch(action.type) {
        case OPEN_DEPLOY_MODAL:
            return {active: true, id: action.id}
        case CLOSE_DEPLOY_MODAL:
            return {active: false, id: null}
        default:
            return state
    }
}

function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function alertsReducer(state = initialState.alerts, action) {
    switch(action.type) {
        case ADD_ALERT:
            return Array.prototype.concat(state, [{id: generateId(), text: action.text, type: action.alertType}]);
        case REMOVE_ALERT:
            let newState = state.slice();
            newState.splice(state.findIndex(alert => alert.id === action.id), 1);
            return newState;
        default:
            return state
    }
}

function rootReducer(state = {}, action) {
    return {
        servers: serverReducer(state.servers, action),
        rsAccounts: rsAccountReducer(state.rsAccounts, action),
        modal: modalReducer(state.modal, action),
        alerts: alertsReducer(state.alerts, action)
    }
}

export default rootReducer;