import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { firebase } from '../firebase/firebase-config';
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [ cheking, setCheking ] = useState( true );

    const [ isLoggedIn, setIsLoggedIn ] = useState( false );

    useEffect(() => {
        firebase.auth().onAuthStateChanged( user => {
            if ( user?.uid ) {
                dispatch( login( user.uid, user.displayName ) );
                setIsLoggedIn( true );
            } else {
                setIsLoggedIn( false );
            };

            setCheking( false );
        });

    }, [ dispatch, setCheking, setIsLoggedIn ]);

    if ( cheking ) {
        return <p>Cargando...</p>;
    };

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        isAuthenticated={ isLoggedIn }
                        path="/auth" 
                        component={ AuthRouter } 
                    />
                    
                    <PrivateRoute 
                        exact 
                        isAuthenticated={ isLoggedIn }
                        path="/" 
                        component={ JournalScreen }
                    />

                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    );
};