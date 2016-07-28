import fetch from 'isomorphic-fetch'

export const EXPAND_SERVER = 'EXPAND_SERVER';

export const REQUEST_SERVERS = 'REQUEST_SERVERS';
export const RECEIVE_SERVERS = 'RECEIVE_SERVERS';
export const RECEIVE_SERVERS_FAILURE = 'RECEIVE_SERVERS_FAILURE';

export const REQUEST_RSACCOUNTS = 'REQUEST_RSACCOUNTS';
export const RECEIVE_RSACCOUNTS = 'RECEIVE_RSACCOUNTS';
export const RECEIVE_RSACCOUNTS_FAILURE = 'RECEIVE_RSACCOUNTS_FAILURE';

export const REQUEST_INITSERVER = 'REQUEST_INITSERVER';
export const RECEIVE_INITSERVER = 'RECEIVE_INITSERVER';
export const RECEIVE_INITSERVER_FAILURE = 'RECEIVE_INITSERVER_FAILURE';

export const OPEN_DEPLOY_MODAL = 'OPEN_DEPLOY_MODAL';
export const CLOSE_DEPLOY_MODAL = 'CLOSE_DEPLOY_MODAL';

export const REQUEST_DEPLOY = 'REQUEST_DEPLOY';
export const RECEIVE_DEPLOY_RESPONSE = 'RECEIVE_DEPLOY_RESPONSE';
export const RECEIVE_DEPLOY_RESPONSE_FAILURE = 'RECEIVE_DEPLOY_RESPONSE_FAILURE';

export const ADD_ALERT = 'ADD_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';

export const expandServer = (id) => {
    return {
        type: EXPAND_SERVER,
        id: id
    }
};

let requestServers = () => {
    return {
        type: REQUEST_SERVERS
    }
};

let receiveServers = (json) => {
    return {
        type: RECEIVE_SERVERS,
        servers: json.servers
    }
};

let receiveServersFailure = (json) => {
    return {
        type: RECEIVE_SERVERS_FAILURE,
        error: err
    }
};

let requestRsAccounts = () => {
    return {
        type: REQUEST_RSACCOUNTS
    }
};

let receiveRsAccounts = (json) => {
    return {
        type: RECEIVE_RSACCOUNTS,
        rsAccounts: json.rs_accounts
    }
};

let requestInit = (id) => {
    return {
        type: REQUEST_INITSERVER,
        id
    }
};

let receiveInit = (id) => {
    return {
        type: RECEIVE_INITSERVER,
        id
    }
};

let receiveInitFailure = (id, err) => {
    return {
        type: RECEIVE_INITSERVER_FAILURE,
        id,
        err
    }
};

let receiveDeployFailure = (rsAccountId, serverId, scriptName, err) => {
    return dispatch => {
        dispatch(addAlert(err.errors.join(' '), 'danger'));

        return {
            type: RECEIVE_DEPLOY_RESPONSE_FAILURE,
            rsAccountId,
            serverId,
            scriptName,
            err
        }
    }
}

let receiveDeploy = (rsAccountId, serverId, scriptName) => {
    return {
        type: RECEIVE_DEPLOY_RESPONSE,
        rsAccountId,
        serverId,
        scriptName
    }
}

let requestDeploy = (rsAccountId, serverId, scriptName) => {
    return {
        type: REQUEST_DEPLOY,
        rsAccountId,
        serverId,
        scriptName
    }
}

export function openDeployModal(id) {
    return {
        type: OPEN_DEPLOY_MODAL,
        id
    }
}

export function closeDeployModal() {
    return {
        type: CLOSE_DEPLOY_MODAL
    }
}

export function deploy(rsAccountId, serverId, scriptName) {
    return dispatch => {
        dispatch(requestDeploy(rsAccountId, serverId, scriptName));

        return fetch(`http://localhost:3001/deploy_script?server_id=${serverId}&rs_account_id=${rsAccountId}&script_name=${scriptName}`, {
            method: 'POST'
        }).then(response => {
                if (response.status >= 200 && response.status < 300) {
                    dispatch(receiveDeploy(rsAccountId, serverId, scriptName))
                } else {
                    response.json().then((json) => dispatch(receiveDeployFailure(rsAccountId, serverId, scriptName, json)));
                }
            })
    }
}

export function initServer(id) {
    return dispatch => {
        dispatch(requestInit(id));

        return fetch('http://localhost:3001/bootstrap_server?server_id=' + id, {
            method: 'POST'
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                dispatch(receiveInit(id));
                dispatch(fetchServers());
            } else {
                response.json().then((json) => dispatch(receiveInitFailure(id, json)));
            }
        })
    }
}

export function fetchServers() {
    return dispatch => {
        dispatch(requestServers());
        return fetch('http://localhost:3001/servers')
            .then(response => response.json())
            .then(json => dispatch(receiveServers(json)))
    }
}

export function fetchRsAccounts() {
    return dispatch => {
        dispatch(requestRsAccounts());
        return fetch('http://localhost:3001/rs_accounts')
            .then(response => response.json())
            .then(json => dispatch(receiveRsAccounts(json)))
    }
}

export function addAlert(text, type) {
    return {
        type: ADD_ALERT,
        text,
        alertType: type
    }
}

export function removeAlert(id) {
    return {
        type: REMOVE_ALERT,
        id
    }
}