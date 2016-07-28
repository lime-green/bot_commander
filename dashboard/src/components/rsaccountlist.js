import React, { PropTypes } from 'react';

export const RsAccountList = ({ items, isFetching, onRsAccountClick }) => (
    <div className="rsAccountList">
        <h1><span className="glyphicon glyphicon-user"></span>Accounts</h1>
        <ul>
            {items.map(rsAccount =>
                <RsAccount
                    key={rsAccount.id}
                    {...rsAccount}
                    onButtonClick={onRsAccountClick}
                />
            )}
        </ul>
    </div>
);
export default RsAccountList;

RsAccountList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        server: PropTypes.string
    }).isRequired).isRequired,

    isFetching: PropTypes.bool.isRequired,
    onRsAccountClick: PropTypes.func.isRequired
};

class RsAccount extends React.Component {
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
        return this.state.hover;
    }

    onClick(e) {
        e.preventDefault();
        this.props.onButtonClick(this.props.id);
    }

    render() {
        return (
            <div className="rsAccount" onMouseOver={() => this.onMouseOver()} onMouseOut={() => this.onMouseOut()}>
                <li>
                    <div className="details">
                        <div className="username">
                            <label>Username: </label> {this.props.username}
                        </div>
                        <div className="password">
                            <label>Password: </label> {this.props.password}
                        </div>
                        <div className="state">
                            <label>State: </label> {this.props.state}
                        </div>
                        {this.props.server ?
                            <div className="server">
                                <label>Server: </label> {this.props.server}
                            </div>
                            : ""}
                    </div>
                    <div className={this.showDiv() ? 'deployDiv' : 'deployDiv hidden-h'}>
                        <button onClick={(e) => this.onClick(e)} className="deployButton btn btn-primary">Deploy</button>
                    </div>
                </li>
            </div>
        );
    }
}

RsAccount.propTypes = {
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    server: PropTypes.string,
    onButtonClick: PropTypes.func.isRequired
};