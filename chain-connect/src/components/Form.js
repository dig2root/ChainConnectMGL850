import './Form.scss';
import React, { useState } from 'react';
import { useEthers } from '@usedapp/core'
import { useAddUser } from './contracts/Users/useAddUser';

export default function Form() {

    const [form, setForm] = useState({
        firstname: '',
        lastname: '',
        email: '',
        age: '',
    });

    const { activateBrowserWallet, deactivate, account } = useEthers()

    const handleChange = (event) => {
        // Change the corresponding state variable to the value of the input field
        setForm({ ...form, [event.target.id]: event.target.value });
    }

    const { loading, success, error, send } = useAddUser(account);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        await send(form.firstname, form.lastname, form.email, parseInt(form.age));
        // Alert the status of the transaction
        if (loading) alert('Transaction is pending...');
        if (error) alert('Transaction failed...');
        if (success) alert('User successfully added!');
    }

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
                <form className='form' onSubmit={handleSubmit} >
                    <div className='form-input'>
                        <input className='form-input--field' placeholder="Firstname" type="text" id="firstname" value={form.firstname} onChange={handleChange} />
                    </div>
                    <div className='form-input'>
                        <input className='form-input--field' placeholder="Lastname" type="text" id="lastname" value={form.lastname} onChange={handleChange} />
                    </div>
                    <div className='form-input'>
                        <input className='form-input--field' placeholder="Email" type="email" id="email" value={form.email} onChange={handleChange} />
                    </div>
                    <div className='form-input'>
                        <input className='form-input--field' placeholder="Age" type="number" id="age" value={form.age} onChange={handleChange} />
                    </div>
                    <button className='form-button' type="submit">Register</button>
                </form>
            </div>
            <div className='metamask'>
                {!account && <img className='metamask-image' onClick={activateBrowserWallet} alt="MetaMask Fox" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/512px-MetaMask_Fox.svg.png" />}
                {account && <button className='metamask-button' onClick={deactivate}>Disconnect</button>}
                <p className='metamask-address'>{account}</p>
            </div>
        </div>
    );
}