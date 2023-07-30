import React from 'react';
import Web3 from "web3";
//import configuration from "../Users.json";

export class Form extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            address: '',
            firstname: '',
            lastname: '',
            email: '',
            age: ''
        };

        this.handleAccountsChanged = this.handleAccountsChanged.bind(this);
        this.checkConnection = this.checkConnection.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount() {
        this.checkConnection();
    }

    checkConnection() {
        window.ethereum.request({ method: 'eth_accounts' }).then(this.handleAccountsChanged).catch((err) => {
            console.error(err);
        });
    }

    handleAccountsChanged(accounts) {
        if (accounts.length === 0) {
            this.setState({ address: 'Not connected' });
        } else {
            this.setState({ address: accounts[0] });
        }
    }

    handleChange(event) {
        // Change the corresponding state variable to the value of the input field
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit = async (event) => {
        let provider = window.ethereum;
        if (typeof provider !== "undefined") {
            await provider.request({ method: 'eth_requestAccounts' });
            const web3 = new Web3(provider);
            const accounts = await web3.eth.getAccounts();
            const account = accounts[0];
            this.checkConnection();
        } else {
            console.log("Non-ethereum browser detected.Please install Metamask");
        }
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <p>Address: {this.state.address}</p>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Firstname:
                        <input type="text" id="firstname" value={this.state.firstname} onChange={this.handleChange} />
                        <br/>
                    </label>
                    <label>
                        Lastname:
                        <input type="text" id="lastname" value={this.state.lastname} onChange={this.handleChange} />
                        <br/>
                    </label>
                    <label>
                        Email:
                        <input type="text" id="email" value={this.state.email} onChange={this.handleChange} />
                        <br/>
                    </label>
                    <label>
                        Age:
                        <input type="number" id="age" value={this.state.age} onChange={this.handleChange} />
                        <br/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}