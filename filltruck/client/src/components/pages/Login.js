import { useState } from 'react';
import { Link } from 'react-router-dom';
import './scss/Login.scss';
import axios from './../functions/Axios';
import pageTitle from '../functions/PageTitle';

function Login() {

    pageTitle("Connexion");

    const [dataForm, setDataForm] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('/login', JSON.stringify(dataForm), {
                headers: { 'Content-type': 'application/json'},
                withCredentials: true
            });
            console.log(res.data);
            window.location.href = "/";
        } catch (err) {
            console.log(err)
        }
    };

    return(
        <div className="container">
            <div className="login">
                <div className='login-box'>
                    <h1 className="login-title">Connectez-vous !</h1>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <label>Email</label>
                        <input type="email" value={dataForm.email} onChange={(e) => setDataForm({...dataForm, email:e.target.value})} required/>
                        <label>Mot de passe</label>
                        <input type="password" value={dataForm.password} onChange={(e) => setDataForm({...dataForm, password:e.target.value})} required/>
                        <button type="submit">Connexion</button>
                    </form>
                    <div className="login-register">Pas encore de compte ? <Link to="/register" className="link">S'inscrire</Link></div>
                </div>
            </div>
        </div>
    );
};

export default Login;