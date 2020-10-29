import React from 'react';
import translate from "./I18N/translate";
import {Redirect
} from "react-router-dom";

class Logout extends React.Component{



    render() {

        const isLogged = !!window.sessionStorage.getItem('token');
        if(!isLogged)
        {console.log(window.sessionStorage.getItem('token'));
           return (<h1>Nu sunteti autentificat</h1>);
        }
        else {
            window.sessionStorage.removeItem('token')
            console.log(window.sessionStorage.getItem('token'));
            return (<h1>V-ati delogat cu succes</h1>);
        }
    }

}

export default Logout;