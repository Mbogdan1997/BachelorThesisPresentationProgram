import React from "react";
import Container from 'react-bootstrap/Container'
import Button  from 'react-bootstrap/Button'
import './css-contact.css'
import {Form,Row,Col} from "react-bootstrap";
import translate from "./I18N/translate";
import {Redirect
} from "react-router-dom";
import Direction from "./Direction";

class Contact extends React.Component{

    constructor(){
        super();
        this.state = {
            cityName:'Cluj-Napoca',
            error: null,
            isLoaded: false,
            message:'Mesajul care e transmis',email:'example@yahoo.com',readOnly: true,editButton:false,submitButton:true}
        this.edit = this.edit.bind(this);
        this.submit = this.submit.bind(this);
        this.email=this.email.bind(this);
    }

    componentDidMount() {
        this.getCityName()
    }

    edit(){
        this.setState(prevState => ({readOnly: false,editButton: true,submitButton: false}))
    }
    submit(){

    }

    email(){
        let obj={email:this.state.email,message:this.state.message }
        fetch( 'http://127.0.0.1:5000/email',{
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
                    console.log(result)
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )

    }

    getCityName(){
        fetch( 'http://localhost:8000/api/user/getCity',{
            mode:"cors",
            method: 'GET',
            headers: { 'Accept':"application/json",
                'Content-Type':"application/json",
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers':  'Origin, Content-Type, X-Auth-Token',
                'Authorization':'Bearer '+ window.sessionStorage.getItem('token')
            },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if(result.success.cityName!=null) {
                        console.log(result.success.cityName)
                        this.setState({cityName: result.success.cityName})
                    }
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    alert("Date incorecte");
                    console.log(error);
                }
            )

    }

    setCityName(cityName){

        let obj={cityName:cityName}
        fetch( 'http://localhost:8000/api/user/setCity',{
            mode:"cors",
            method: 'PUT',
            headers: { 'Accept':"application/json",
                'Content-Type':"application/json",
                'Access-Control-Allow-Methods': 'PUT',
                'Access-Control-Allow-Headers':  'Origin, Content-Type, X-Auth-Token',
                'Authorization':'Bearer '+ window.sessionStorage.getItem('token')
            },
            body:JSON.stringify(obj)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if(result.success!==undefined) {
                        console.log(result.success.cityName)
                        this.setState(prevState => ({readOnly: true,editButton: false,submitButton: true}))
                    }
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    alert("Date incorecte");
                    console.log(error);
                }
            )

    }



    render() {

        const myMailStyle={backgroundColor:'#00A2E8',
            width:'100%',
            padding: '20px 0 20px 20px'}

            const editMailStyle={
                display: 'inline-block'
            }



        return(
           <div className="contact-form">
            <Form>

                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                        {/*{translate("email")}:*/}
                        Email:
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control value={this.state.email} readOnly={this.state.readOnly} type="email" placeholder="example@yahoo.com"
                                      onChange={(e) => {
                                          let {email} = this.state.email;

                                          email = e.target.value;

                                          this.setState({email:email});
                                      }}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalAddress">
                    <Form.Label column sm={2}>
                        {/*{translate("address")}:*/}
                        Address:
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control  readOnly={this.state.readOnly} type="text" placeholder={this.state.cityName}
                                       onChange={(e) => {
                                           let {cityName} = this.state.cityName;

                                           cityName = e.target.value;

                                           this.setState({cityName:cityName});
                                       }}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalPhoneNumber">
                    <Form.Label column sm={2}>
                        {/*{translate("pnumber")}:*/}
                        Phone Number:
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control  readOnly={this.state.readOnly} type="text" placeholder="0744662619" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalPhoneNumber">
                    <Form.Label column sm={2}>
                        {/*{translate("msg")}:*/}
                        Mesaj:
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control  readOnly={this.state.readOnly} type="text" placeholder="Mesaj trimis prin email"
                        onChange={(e)=>{
                            this.setState({message:e.target.value})
                        }}
                        />
                    </Col>
                </Form.Group>



                <Button  disabled={this.state.editButton} onClick={this.edit} variant="success" type="button">
                    Edit
                </Button>
                <Button  disabled={this.state.submitButton} onClick={this.setCityName.bind(this,this.state.cityName)} variant="danger" type="button">
                    Submit
                </Button>
                <Button  onClick={this.email} variant="primary" type="button">
                    Sent Email
                </Button>
                <Direction city={this.state.cityName}/>
            </Form>
           </div>
        )
    }



}

export default Contact;