import React from 'react'
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import {useDispatch, useSelector} from 'react-redux'
import validator from 'validator'
import { removeError, setError } from './../../actions/ui';
import { startGoogleLogin, startLoginEmailPassword } from './../../actions/auth';

export const LoginScreen = () => {
    const {ui}=useSelector(state=>state);
    const {msgError,loading}=ui;
    console.log(msgError);
    console.log(loading);

    const dispatch = useDispatch();

    const[formValues,handleInputChange]=useForm({
        email:'juanpa9200@gmail.com',
        password: 'mocanero906'
    });

    const {email,password} = formValues;

    const handleLogin=(e)=>{
        e.preventDefault();
        isFormValid();
        console.log(email,password);
        dispatch(startLoginEmailPassword(email,password));
    }

    const isFormValid=()=>{
        if(!validator.isEmail(email)){
            dispatch(setError('Email is not valid'));
            return false
        }

        if(password.length<6){
            dispatch(setError('Invalid password'));
            return false
        }

        dispatch(removeError());
        return true
    }

    const handleGoogleLogin=()=>{
        dispatch(startGoogleLogin());
    }

    return (
        <>
            <h3 className="auth__title">Login</h3>
            <form onSubmit={handleLogin}>
            {
                    msgError&&(
                        <div className="auth__alert-error">{msgError}</div> 
                    )
                }
                <input 
                    className="auth__input" 
                    type="text" 
                    placeholder="Email" 
                    name="email"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />

                <input 
                    className="auth__input" 
                    type="password" 
                    placeholder="Password" 
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                />

                <button
                    // {loading && (disabled={true})} 
                    disabled={loading}
                    className="btn btn-primary btn-block mb-1"
                    type="submit"
                >
                    Login
                </button>

                {/* <hr/> */}
                <div className="auth__social-networks mt-1">
                    <p>Login with Social Networks</p>
                    <div 
                        className="google-btn"
                        onClick={handleGoogleLogin}
                        >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button"/>
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
                <Link 
                to="/auth/register" 
                className="link">
                    Create new account
                </Link>
            </form>
        </>
    )
}
