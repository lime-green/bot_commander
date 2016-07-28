import React, { PropTypes } from 'react';

export class Modal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.active ? "modalContainer" : "modalContainer hidden-h"}>
                <div className="modal-m">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    active: PropTypes.bool.isRequired
};

export default Modal;