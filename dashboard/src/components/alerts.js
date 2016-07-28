import React, { PropTypes } from 'react';

export default class Alerts extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="alerts">
                {this.props.alerts.reverse().map(alert => <Alert {...alert} handleClose={this.props.handleAlertClose}/>)}
            </div>
        )
    }
}

Alerts.propTypes = {
    alerts: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
    }).isRequired).isRequired,
    handleAlertClose: PropTypes.func.isRequired
};

class Alert extends React.Component {
    constructor(props) {
        super(props);
    }

    getClassName() {
        return `alert alert-${this.props.type}`;
    }

    render() {
        return (
            <div key={this.props.id} className={this.getClassName()}>
                <i onClick={() => this.props.handleClose(this.props.id)} className="fa fa-close" />
                {this.props.text}
            </div>
        )
    }
}

Alert.propTypes = {
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired
};