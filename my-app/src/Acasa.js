import React from 'react';
import translate from "./I18N/translate";
import {Redirect
} from "react-router-dom";

class Acasa extends React.Component{



    render() {
        return(<div className="titlu-acasa">
            <h2 style={{ color: 'orange',fontWeight: 'bold' }}>{translate("home_text")}</h2>
        </div>)
    }

}

export default Acasa;