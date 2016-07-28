import React, { PropTypes } from 'react';

const ServerList = ({ items, isFetching, onServerClick, onServerButtonClick }) => (
    <div className="serverList">
        <h1><span className="glyphicon glyphicon-cloud-upload"></span>Servers</h1>
        <ul>
            {items.map(server =>
                <Server
                    key={server.id}
                    {...server}
                    onClick={() => onServerClick(server.id)}
                    onButtonClick={() => onServerButtonClick(server.id)}
                />
            )}
        </ul>
    </div>
);

export default ServerList;

ServerList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string,
        ip: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        rs_accounts: PropTypes.arrayOf(PropTypes.number),
        isInitializing: PropTypes.bool.isRequired
    }).isRequired).isRequired,

    isFetching: PropTypes.bool.isRequired,
    onServerButtonClick: PropTypes.func.isRequired
};

class Server extends React.Component {
    constructor(props) {
        super(props);

        this.state = {hover: false};
    }

    onMouseOver() {
        this.setState({hover: true})
    }

    onMouseOut() {
        this.setState({hover: false})
    }

    showDiv() {
        if(this.props.isInitializing) return false;
        return this.props.state === "spawned" && this.state.hover;
    }

    buttonClick(e) {
        e.preventDefault();
        this.props.onButtonClick();
    }

    render() {
        return (
            <div onClick={this.props.onClick} className="server" onMouseOver={() => this.onMouseOver()} onMouseOut={() => this.onMouseOut()}>
                <div className={this.props.isInitializing ? "isInitializingDiv" : "isInitializingDiv hidden-h"}>
                    <i className="fa fa-spinner fa-spin" />
                </div>

                <li>
                    <div className="details">
                        <div className="name">
                            <label>Name: </label> {this.props.name || 'Not named'}
                        </div>

                        <div className="id">
                            <label>ID: </label> {this.props.id}
                        </div>

                        <div className="ip">
                            <label>IP Address: </label> {this.props.ip}
                        </div>

                        <div className="state">
                            <label>State: </label> {this.props.state}
                        </div>

                        <div className="rsAccounts">
                            <label>Number of accounts: </label> {this.props.rs_accounts.length}
                        </div>
                    </div>
                    <div className={this.showDiv() ? 'initializeDiv' : 'initializeDiv hidden-h'}>
                        <button onClick={(e) => this.buttonClick(e)} className="initializeButton btn btn-primary">Initialize</button>
                    </div>
                </li>
            </div>
        );
    }
}

Server.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    ip: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    rs_accounts: PropTypes.arrayOf(PropTypes.number),
    onClick: PropTypes.func.isRequired,
    onButtonClick: PropTypes.func.isRequired,
    isInitializing: PropTypes.bool.isRequired
};