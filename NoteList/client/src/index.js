import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

//react-alert optional configuration
const options = {
    //You can also just use 'bottom center'
    position: positions.MIDDLE_RIGHT,
    timeout: 5000,
    offset: '30px',
    //You can also just use 'scale'
    transition: transitions.SCALE
}

const Root = () => (
    <AlertProvider template={AlertTemplate} {...options}>
        <App />
    </AlertProvider>
)

ReactDOM.render(<Root />, document.getElementById('root'));

/*
To active Emmet in Visual Studio Code, in settings (json):
"emmet.includeLanguages": {
    "javascript": "javascriptreact"
}
*/