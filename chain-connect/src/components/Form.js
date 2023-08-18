import './Form.scss';
import React, { useState, useEffect } from 'react';
import { useEthers } from '@usedapp/core'
import { useGetUser } from './contracts/Users/useGetUser';
import { useAddUser } from './contracts/Users/useAddUser';
import { useModifyUser } from './contracts/Users/useModifyUser';
//import { useDeleteUser } from './contracts/Users/useDeleteUser';

export default function Form() {

    const [form, setForm] = useState({
        firstname: '',
        lastname: '',
        email: '',
        age: '',
    });

    const handleChange = (event) => {
        // Change the corresponding state variable to the value of the input field
        setForm({ ...form, [event.target.id]: event.target.value });
    }

    const { activateBrowserWallet, deactivate, account } = useEthers()

    const useGetUserHandler = useGetUser(account);
    const useAddUserHandler = useAddUser();
    const useModifyUserHandler = useModifyUser();
    //const useDeleteUserHandler = useDeleteUser();

    const [registered, setRegistered] = useState(false);

    useEffect(() => {
        if (account) {
            if (!registered) {
                const result = useGetUserHandler;
                if (result !== undefined) {
                    const { value, error } = result;
                    if (!error) {
                        const data = value[0];
                        if (data[3].toString() === '0') {
                            setRegistered(false);
                        } else {
                            setRegistered(true);
                            setForm({
                                firstname: data[0],
                                lastname: data[1],
                                email: data[2],
                                age: data[3],
                            });
                        }
                    }
                }
            }
        } else {
            setRegistered(false);
            setForm({
                firstname: '',
                lastname: '',
                email: '',
                age: '',
            });
        };
    }, [account, useGetUserHandler, registered]);

    const handleAddUser = async (event) => {
        event.preventDefault();
        await useAddUserHandler.send(form.firstname, form.lastname, form.email, parseInt(form.age));
        // Alert the status of the transaction
        if (useAddUserHandler.loading) alert('Transaction is pending...');
        if (useAddUserHandler.error) alert('User already exists...');
        if (useAddUserHandler.success) alert('User successfully added!');
    }

    const handleModifyUser = async (event) => {
        event.preventDefault();
        await useModifyUserHandler.send(form.firstname, form.lastname, form.email, parseInt(form.age));
        // Alert the status of the transaction
        if (useModifyUserHandler.loading) alert('Transaction is pending...');
        if (useModifyUserHandler.error) alert('User already exists...');
        if (useModifyUserHandler.success) alert('User successfully added!');
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
                <form className='form'>
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
                    {!registered && <button className='form-button' onClick={handleAddUser}>Register</button>}
                    {registered && <button className='form-button' onClick={handleModifyUser}>Modify</button>}
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