import React, { PropTypes } from 'react';

export class DeployForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scriptNameValue: '',
            serverIdValue: this.props.servers[0].id
        }
    }

    submit(e) {
        e.preventDefault();
        this.props.onSubmitForm(this.props.account.id, this.state.serverIdValue, this.state.scriptNameValue);
    }

    handleScriptNameChange(e) {
        this.setState(Object.assign({}, this.state, {scriptNameValue: e.target.value}))
    }

    handleServerIdChange(e) {
        this.setState(Object.assign({}, this.state, {serverIdValue: e.target.value}))
    }

    render() {
        return (
            <form className="deployForm">
                <div className="form-group">
                    <label>Deploying account: </label> {this.props.account ? this.props.account.username : "Account not found"}
                </div>

                <div className="form-group">
                    <label>Script Name:</label>
                    <input value={this.state.scriptNameValue} onChange={this.handleScriptNameChange.bind(this)} type="text" className="form-control" id="scriptName" />
                </div>

                <div className="form-group">
                    <label>Deploy to server: </label>

                    <div className="select-style">
                        <select onChange={this.handleServerIdChange.bind(this)}>
                            {this.props.servers.map(server => {
                                return <option key={server.id} value={server.id}>{server.name}</option>
                            })}
                        </select>
                    </div>
                    <div className="buttonContainer">
                        <button onClick={(e) => this.submit(e)} type="submit" className="btn btn-primary">Submit</button>
                        <button onClick={() => this.props.onCancelForm()} type="button" className="btn btn-warning">Cancel</button>
                    </div>
                </div>
            </form>
        )
    }
}

DeployForm.propTypes = {
    account: PropTypes.shape({
        username: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired
    }).isRequired,
    servers: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onCancelForm: PropTypes.func.isRequired,
    onSubmitForm: PropTypes.func.isRequired
};

export default DeployForm;