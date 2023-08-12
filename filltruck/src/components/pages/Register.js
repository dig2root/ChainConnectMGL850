import { useState } from 'react';
import { Link } from 'react-router-dom';
import './scss/Register.scss';
import axios from './../functions/Axios';
import PageTitle from '../functions/PageTitle';

function Register() {

    PageTitle("Inscription");

    const [dataForm, setDataForm] = useState({
        lastname: "",
        firstname: "",
        email: "",
        password: "",
        confirm_password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('/register', JSON.stringify(dataForm), {
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
            <div className="register">
                <div className="register-box">
                    <h1 className="register-title">Inscrivez-vous !</h1>
                    <form className="register-form" onSubmit={handleSubmit}>
                        <label>Nom</label>
                        <input type="text" value={dataForm.lastname} onChange={(e) => setDataForm({...dataForm, lastname:e.target.value})} required/>
                        <label>Prénom</label>
                        <input type="text" value={dataForm.firstname} onChange={(e) => setDataForm({...dataForm, firstname:e.target.value})} required/>
                        <label>Email</label>
                        <input type="email" value={dataForm.email} onChange={(e) => setDataForm({...dataForm, email:e.target.value})} required/>
                        <label>Mot de passe</label>
                        <input type="password" value={dataForm.password} onChange={(e) => setDataForm({...dataForm, password:e.target.value})} required/>
                        <label>Répéter le mot de passe</label>
                        <input type="password" value={dataForm.confirm_password} onChange={(e) => setDataForm({...dataForm, confirm_password:e.target.value})} required/>
                        <div className='cgu-box'>
                            <input type="checkbox" required/>
                            <label>J'accepte les CGU</label>
                        </div>
                        <button type="submit">S'inscrire</button>
                    </form>
                    <div className="register-login">Vous avez déjà un compte ? <Link to="/login" className="link">Se connecter</Link></div>
                </div>
            </div>
        </div>
    );
};

export default Register;