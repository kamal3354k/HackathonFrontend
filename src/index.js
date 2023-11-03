import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./styles.css"

import { BrowserRouter } from 'react-router-dom';
import UserProvider from './provider/userProvider';

ReactDOM.render(
    <BrowserRouter>
        <UserProvider>
            <App />
        </UserProvider>
    </BrowserRouter>
    , document.getElementById('root')
);