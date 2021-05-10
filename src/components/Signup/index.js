import React, {useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import {FirebaseContext} from '../Firebase';

const Signup = (props) => {

    const firebase = useContext(FirebaseContext);

    const data = {
        pseudo: '',
        email: '',
        password: '',
        confirmPassword: ''

    }
    const [loginData, setLoginData] = useState(data);

    const handleChange = e => {
        setLoginData({...loginData, [e.target.id]: e.target.value})

    }

    const [error, setError] = useState('');

    const {pseudo, email, password, confirmPassword} = loginData;

    const btn =  pseudo === '' || email === '' || password === '' || password !== confirmPassword 
    ? <button disabled>Inscription</button> : <button>Inscription</button>

    const handleSubmit = e => {
        e.preventDefault();
        const {email, password, pseudo} = loginData;
        firebase.signupUser(email, password)
        .then(authUser => {
            return firebase.user(authUser.user.uid).set({
                pseudo,
                email
            })
        })
        .then(() => {
            setLoginData({...data});
            props.history.push('/welcome');
        })
        .catch(error => {
            setError(error);
            setLoginData({...data});
        })
    }

    // Gestion erreurs
    const errorMsg = error !== '' && <span>{error.message}</span>

    return (
        <div className="signUpLoginBox">
                <div className="slContainer">
                    <div className="formBoxLeftSignup">

                    </div>
                    <div className="formBoxRight">
                        <div className="formContent">
                            {errorMsg}
                            <h2>Inscription</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="inputBox">
                                    <input onChange={handleChange} value={pseudo} type="text" id="pseudo" required autoComplete="off" />
                                    <label htmlFor="pseudo">Pseudo</label>
                                </div>
                                <div className="inputBox">
                                    <input onChange={handleChange} value={email}  type="email" id="email" required autoComplete="off" />
                                    <label htmlFor="email">Email</label>
                                </div>
                                <div className="inputBox">
                                    <input onChange={handleChange} value={password} type="password" id="password" required autoComplete="off" />
                                    <label htmlFor="password">Mot de passe</label>
                                </div>
                                <div className="inputBox">
                                    <input onChange={handleChange} value={confirmPassword} type="password" id="confirmPassword" required autoComplete="off" />
                                    <label htmlFor="password">Confirmer le mot de passe</label>
                                </div>
                                {btn}
                            </form>
                            <div className="linkContainer">
                                <Link className="simpleLink" to="/login">Déjà inscrit? Connectez-vous.</Link>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Signup