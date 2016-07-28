import React, { PropTypes } from 'react';

export default class Refresh extends React.Component {
    constructor(props) {
        super(props);
    }

    getClassName() {
        let refresh = 'fa fa-refresh';
        return this.props.isRefreshing ? `${refresh} fa-spin` : refresh;
    }

    render() {
        return (
            <div className="refreshDiv">
                <i className={this.getClassName()} onClick={this.props.onClick}></i>
            </div>
        )
    }
}

Refresh.propTypes = {
    onClick: PropTypes.func.isRequired,
    isRefreshing: PropTypes.bool.isRequired
}