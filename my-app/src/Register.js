import React from "react";
import Button  from 'react-bootstrap/Button'
import './css-contact.css'
import {Form,Row,Col} from "react-bootstrap";
import translate from "./I18N/translate";


class Register extends React.Component{



    constructor(){
        super();
        this.state = { error: null,
            isLoaded: false,
            name:'Numele Meu',
            password:'',
            c_password:'',
           email:'example@yahoo.com'}

       this.register=this.register.bind(this);
    }

    register(){
        console.log("register")
        console.log(this.state.email);
        console.log(this.state.password)
        console.log(this.state.c_password)
        console.log(this.state.name)
        let obj={email:this.state.email,password:this.state.password,c_password: this.state.c_password,name:this.state.name }
        fetch( 'http://localhost:8000/api/user/register',{
            mode:"cors",
            method: 'POST',
            headers: { 'Accept':"application/json",
                'Content-Type':"application/json",
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers':  'Origin, Content-Type, X-Auth-Token'
            },
            body:JSON.stringify(obj)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                    });
                    if(result.success!==undefined) {
                        console.log(result.success.token);
                        window.sessionStorage.setItem("token", result.success.token);
                        console.log(sessionStorage.getItem("token"));
                        window.location.href = "http://localhost:3000/acasa"
                    }
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    alert("Acest email este utilizat sau parolele nu coincid")
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )

    }




    render() {

       /* const myMailStyle={backgroundColor:'#00A2E8',
            width:'100%',
            padding: '20px 0 20px 20px'}

        const editMailStyle={
            display: 'inline-block'
        }*/


        return(
            <div className="contact-form">
                <Form>

                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            {translate("email")}:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control value={this.state.email}  type="email" placeholder="example@yahoo.com"
                                          onChange={(e) => {
                                              let {email} = this.state.email;

                                              email = e.target.value;

                                              this.setState({email});
                                          }}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                            {translate("password")}:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control   type="password"

                                            onChange={(e) => {
                                                let {password} = this.state.password;

                                                password = e.target.value;

                                                this.setState({password});
                                            }}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalConfirmPassword">
                        <Form.Label column sm={2}>
                            {translate("c_password")}:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control  type="password"

                                           onChange={(e) => {
                                               let {c_password} = this.state.c_password;

                                               c_password = e.target.value;

                                               this.setState({c_password});
                                           }}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalName">
                        <Form.Label column sm={2}>
                            {translate("name")}:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Numele Meu"
                                           onChange={(e)=>{
                                               this.setState({name:e.target.value})
                                           }}
                            />
                        </Col>
                    </Form.Group>

                    <Button  onClick={this.register} variant="primary" type="button">
                        Register
                    </Button>
                </Form>
            </div>
        )
    }



}

export default Register;