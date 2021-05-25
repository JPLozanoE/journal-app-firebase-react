import React from 'react'
import { Link } from 'react-router-dom';
import { useForm } from './../../hooks/useForm';
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from './../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch=useDispatch();
    const {ui}=useSelector(state=>state);
    const {msgError}=ui;
    console.log(msgError);

    const[{name,email,password,password2},handleInputChange]=useForm({
        name:'',
        email:'',
        password:'',
        password2:''
    });

    const handleRegister=(e)=>{
        e.preventDefault();
        if(isFormValid()){
            dispatch(startRegisterWithEmailPasswordName(email,password,name));
            console.log('Formulario correcto')
        }
        // console.log(name,email,password,password2,)
    }

    const isFormValid=()=>{
        // let error=false;

        if(name.trim().length===0){
            // console.log('Name is required')
            // error=true;
            dispatch(setError('Name is required'));
            return false
        }

        if(!validator.isEmail(email)){
            // console.log('Email is not valid')
            // error=true;
            dispatch(setError('Email is not valid'));
            return false
            
        }

        if(password!==password2||password.length<5){
            // console.log('Password should be at least 6 characters and match eachother');
            // error=true;
            dispatch(setError('Password should be at least 6 characters and match eachother'));
            return false

        }
        dispatch(removeError());
        return true
        // return error===false ? true : false
    }

    return (
        <>
        
            <h3 className="auth__title">Register</h3>
            <form onSubmit={handleRegister}>
                {
                    msgError&&(
                        <div className="auth__alert-error">{msgError}</div> 
                    )
                }

                <input 
                    className="auth__input" 
                    type="text" 
                    placeholder="Name" 
                    name="name"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />
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

                <input 
                    className="auth__input" 
                    type="password" 
                    placeholder="Confirm password" 
                    name="password2"  
                    value={password2}  
                    onChange={handleInputChange}
                />

                <button 
                    // disabled={true}
                    className="btn btn-primary btn-block mb-5"
                    type="submit"
                >
                    Register
                </button>

                <Link 
                to="/auth/login" 
                className="link">
                    Already registered?
                </Link>
            </form>
        </>
    )
}
