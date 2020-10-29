import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav, Navbar,Button} from 'react-bootstrap';
import './css-footer.css';
import Acasa from "./Acasa";
import Noutati from "./Noutati";
import Despre from "./Despre";
import Logout from "./Logout";
import {I18NProvider,LOCALES} from './I18N';
import {FormattedMessage} from "react-intl";
import translate from "./I18N/translate";
import Cookie from "js-cookie";

import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link
} from "react-router-dom";
import Contact from "./Contact";
import Coordonator from "./Coordonator";
import Profil from "./Profil";
import Register from "./Register";
import Login from "./Login";

const PrivateRoute = ({ ...props }) =>(


    !!window.sessionStorage.getItem('token')
        ? <Route { ...props } />
        : <Redirect to="/login" />
)

class App extends Component {


  changeLanguage(event) {
    console.log(event.target.value)
    if(event.target.value==="ro") {
      Cookie.set("language","ro")
      console.log("Setam la" + Cookie.get("language"))
      this.setState({
        language: LOCALES.ROMANIAN
      })
    }
    else {
      Cookie.set("language","en")
      console.log("Setam la" + Cookie.get("language"))
      this.setState({
        language: LOCALES.ENGLISH
      })
    }
  }

  constructor(props){
    super(props)
    let defaultValue=LOCALES.ROMANIAN;

    console.log("A ramas setat" + Cookie.get("language"))
    if(Cookie.get("language")===undefined){
      Cookie.set("language","ro")
    }
    else if(Cookie.get("language")==="en"){
      defaultValue=LOCALES.ENGLISH
    }

    this.state={
      language:defaultValue
    };

    this.changeLanguage= this.changeLanguage.bind(this)


  }

  render() {
    return (
        <I18NProvider locale={this.state.language}>
          <div className="App">
            <Navbar bg="dark" variant="dark">
              <Navbar.Brand href="/acasa">{translate("license")}</Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Link href="/acasa"> {translate("home")}</Nav.Link>
                <Nav.Link href="/noutati"> {translate("news")}</Nav.Link>
                <Nav.Link href="/despre">{translate("about")}</Nav.Link>
                <Nav.Link href="/coordonator">{translate("teacher")}</Nav.Link>
                <Nav.Link href="/contact">{translate("contact")}</Nav.Link>
                  <Nav.Link href="/login">{translate("login")}</Nav.Link>
                  <Nav.Link href="/register">{translate("register")}</Nav.Link>
                  <Nav.Link href="/logout">{translate("logout")}</Nav.Link>
                <Button variant={"danger"} href="/profil">{translate("profile")}</Button>
                <select id="language" defaultValue={Cookie.get("language")} onChange={this.changeLanguage}>
                  <option value="en">EN</option>
                  <option value="ro">RO</option>
                </select>
              </Nav>

            </Navbar>

            <Router>
              <div>
                <Switch>

                <Route
                    exact
                    path='/register'
                    render={() => <Register/>}
                />
                <PrivateRoute path="/acasa" component={Acasa} />
                <PrivateRoute

                    path='/noutati'
                    component={Noutati}
                />
                <PrivateRoute

                    path='/despre'
                    component={Despre}
                />

                <PrivateRoute

                    path='/contact'
                    component={Contact}
                />
                <PrivateRoute

                    path='/coordonator'
                    component={Coordonator}
                />


                <PrivateRoute

                    path='/profil'
                    component={Profil}
                />
                <Route
                    exact
                    path='/login'
                    render={() => <Login/>}
                />
                <PrivateRoute

                    path='/logout'
                    component={Logout}
                />
                </Switch>

              </div>
            </Router>
            <footer>
              <div className="push"></div>
              <div className="bar">
                <div className="bar-wrap">
                  <ul className="links">
                    <li><a href="/acasa">{translate("home")}</a></li>
                    <li><a href="/noutati">{translate("news")}</a></li>
                    <li><a href="/despre">{translate("about")}</a></li>
                    <li><a href="/coordonator">{translate("teacher")}</a></li>
                    <li><a href="/contact">{translate("contact")}</a></li>
                  </ul>
                  <div className="clear"></div>
                  <div className="copyright">&copy;  Bogdan All Rights Reserved</div>
                </div>
              </div>
            </footer>

          </div>
        </I18NProvider>

    );
  }
}

export default App;
