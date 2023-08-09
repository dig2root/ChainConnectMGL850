import './Form.scss';
import React from 'react';

export class Form extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            address: '0x000000',
            firstname: '',
            lastname: '',
            email: '',
            age: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        // Change the corresponding state variable to the value of the input field
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit = async (event) => {
        // 
    }

    render() {
        return (
            <div>
                <div className='container'>
                    <pre>
    ________          _       ______                            __ <br/>
    / ____/ /_  ____ _(_)___  / ____/___  ____  ____  ___  _____/ /_<br/>
    / /   / __ \/ __ `/ / __ \/ /   / __ \/ __ \/ __ \/ _ \/ ___/ __/<br/>
    / /___/ / / / /_/ / / / / / /___/ /_/ / / / / / / /  __/ /__/ /_  <br/>
    \____/_/ /_/\__,_/_/_/ /_/\____/\____/_/ /_/_/ /_/\___/\___/\__/  <br/>                                   
                    </pre>
                    <form className='form' onSubmit={this.handleSubmit} >
                        <div className='form-input'>
                            <input className='form-input--field' placeholder="Firstname" type="text" id="firstname" value={this.state.firstname} onChange={this.handleChange} />
                        </div>
                        <div className='form-input'>
                            <input className='form-input--field' placeholder="Lastname" type="text" id="lastname" value={this.state.lastname} onChange={this.handleChange} />
                        </div>
                        <div className='form-input'>
                            <input className='form-input--field' placeholder="Email" type="email" id="email" value={this.state.email} onChange={this.handleChange} />
                        </div>
                        <div className='form-input'>
                            <input className='form-input--field' placeholder="Age" type="number" id="age" value={this.state.age} onChange={this.handleChange} />
                        </div>
                        <button className='form-button' type="submit">Register</button>
                    </form>
                </div>
                <div className='metamask'>
                    <img className='metamask-image' alt="MetaMask Fox" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/512px-MetaMask_Fox.svg.png" />
                    <p className='metamask-address'>{this.state.address}</p>
                </div>
            </div>
        );
    }
}