import React from 'react'
import { AppRouter } from './routers/AppRouter';
import {Provider} from 'react-redux'
import { store } from './store/store';
import {Helmet} from "react-helmet";

export const JournalApp = () => {
    return (
        <Provider store={store}>
        <Helmet>
        <link 
            rel="stylesheet" 
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" 
        />

        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
        
        </Helmet>
            <AppRouter/>
        </Provider>
    )
}
