import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { useForm } from '../../hooks/useForm';
import { setError, removeError } from '../../actions/ui';
import { startRegisterNameEmailPassword } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const { msg } = useSelector( state => state.ui );

    const [ values, handleInputChange ] = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = values;

    const handleRegister = e => {
        e.preventDefault();
        
        if ( ifFormValid() ) {
            dispatch( startRegisterNameEmailPassword( name, email, password ) );
        };
    };

    const ifFormValid = () => {
        if ( name.trim().length === 0 ) {
            dispatch( setError( 'Name is required' ) );
            return false;
        } else if ( !validator.isEmail( email ) ) {
            dispatch( setError( 'Email is not valid' ) );
            return false;
        } else if ( password !== password2 || password.length < 6 ) {
            dispatch( setError( 'Password should be ar least 6 characters and match each other' ) );
            return false;
        }

        dispatch( removeError() );

        return true;
    };

    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form 
                onSubmit={ handleRegister }
                className="animate__animated animate__fadeIn animate__faster"
            >
                { msg && <div className="auth__alert-error">{ msg }</div> }

                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={ name }
                    onChange={ handleInputChange }
                />

                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={ email }
                    onChange={ handleInputChange }
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={ password }
                    onChange={ handleInputChange }
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    className="auth__input"
                    value={ password2 }
                    onChange={ handleInputChange }
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >Register</button>

                <Link 
                    to="/auth/login"
                    className="link"
                >Already registered?</Link>
            </form>
        </>
    );
};