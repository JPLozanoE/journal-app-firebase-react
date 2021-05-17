import {React,useEffect, useState} from 'react'
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import { AuthRouter } from './AuthRouter';
import { JournalScreen } from './../components/journal/JournalScreen';
import { useDispatch } from 'react-redux';
import {firebase} from '../firebase/firebase-config'
import {login} from '../actions/auth'
import { LoadingScreen } from './../components/misc/LoadingScreen';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
// import { loadNotes } from './../helpers/loadNotes';
import {  startLoadingNotes } from './../actions/notes';

export const AppRouter = () => {
    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(() => {
        
        firebase.auth().onAuthStateChanged((user)=>{
            if(user?.uid){
                dispatch(login(user.uid,user.displayName));
                setIsLoggedIn(true);
                // console.log(notes);
                dispatch(startLoadingNotes(user.uid));
            }
            else{
                setIsLoggedIn(false);
            }
            setChecking(false);
        })
    }, [dispatch,setChecking,setIsLoggedIn])

    if(checking){return(
        <LoadingScreen/>
    )}


    return (
        <Router>
        <div>
            <Switch>
                <PublicRoute 
                    path="/auth" 
                    component={AuthRouter} 
                    isAuth={isLoggedIn}
                />
                
                <PrivateRoute 
                    exact 
                    path="/" 
                    component={JournalScreen}
                    isAuth={isLoggedIn}
                />

            <Redirect to="auth/login"/>
            </Switch>
        </div>
        </Router>
    )
}
