import React from 'react';
import ServerList from '../components/serverlist';
import RsAccountList from '../components/rsaccountlist';
import Modal from '../components/modal';
import DeployForm from '../components/deployform';
import Alerts from '../components/alerts';
import Refresh from '../components/refresh';
import { connect } from 'react-redux';
import { expandServer, fetchServers, fetchRsAccounts, initServer, openDeployModal, closeDeployModal, deploy, addAlert, removeAlert } from '../actions/actions';

const mapStateToProps = (state) => {
  return {
    servers: state.servers,
    rsAccounts: state.rsAccounts,
    modal: state.modal,
    alerts: state.alerts,
    getAccountById: (id) => {
      return state.rsAccounts.items.find((rsAccount) => rsAccount.id === id)
    }
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onServerClick: (id) => {
      dispatch(expandServer(id))
    },
    onServerButtonClick: (id) => {
      dispatch(initServer(id))
    },
    onRsAccountClick: (id) => {
      dispatch(openDeployModal(id))
    },
    dispatchFetchServers: () => {
      dispatch(fetchServers());
    },
    dispatchFetchRsAccounts: () => {
      dispatch(fetchRsAccounts());
    },
    onSubmitForm: (rsAccountId, serverId, scriptName) => {
      dispatch(deploy(rsAccountId, serverId, scriptName));
      //dispatch(closeDeployModal());
    },
    onCancelForm: () => {
      dispatch(closeDeployModal());
    },
    dispatchAddAlert: () => {
      dispatch(addAlert('wow :) you are awesome', 'success'))
    },
    handleAlertClose: (id) => {
      dispatch(removeAlert(id))
    }
  }
};

class App extends React.Component {
  componentDidMount() {
    this.refreshAll();
  }

  refreshAll() {
    this.props.dispatchFetchServers();
    this.props.dispatchFetchRsAccounts();
  }

  render() {
    let rsAccounts = this.props.rsAccounts.items.map((rsAccount) => {
      let server = this.props.servers.items.find((server) => server.id === rsAccount.server);

      if (server && server.ip) {
        return Object.assign({}, rsAccount, {server: server.ip})
      } else {
        return Object.assign({}, rsAccount, {server: ""})
      }
    });

    return (
        <div className="outerContainer">
          <div className="appContainer">
            <Refresh isRefreshing={this.props.servers.isFetching || this.props.rsAccounts.isFetching} onClick={() => this.refreshAll()} />

            <div className="lists">
              <ServerList {...this.props.servers} onServerButtonClick={this.props.onServerButtonClick}/>
              <RsAccountList items={rsAccounts} isFetching={this.props.rsAccounts.isFetching} onRsAccountClick={this.props.onRsAccountClick} />
            </div>
          </div>

          <Modal {...this.props.modal}>
            <div className="modalContent">
              {this.props.modal.active ? <DeployForm onSubmitForm={this.props.onSubmitForm} onCancelForm={this.props.onCancelForm} servers={this.props.servers.items} account={this.props.getAccountById(this.props.modal.id)} /> : ""}
            </div>
          </Modal>

          <Alerts handleAlertClose={this.props.handleAlertClose} alerts={this.props.alerts} />
        </div>
    );
  }
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppContainer;