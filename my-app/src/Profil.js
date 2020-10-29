import React from "react";
import ImageUploader from 'react-images-upload'
import './css-profil.css'
import {Form, Button, Col} from "react-bootstrap";
import TechnologiesOfInterestTable from "./TechnologiesOfInterestTable";
import './styling.css';
import translate from "./I18N/translate";
import  "fuctbase64";
import {Redirect
} from "react-router-dom";

const fileUpload = require('fuctbase64');

class Profil extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            areasOfInterest:'',
            base64Image:'',
            name:'',
            password:'123456',
            email:'',
            file: '', imagePreviewUrl: 'https://emerging-europe.com/wp-content/uploads/2019/03/bigstock-gorgeous-spring-countryside-la-280866130-990x556.jpg', readOnly: true, editButton: false, submitButton: true
        }
        this.edit = this.edit.bind(this);
        this.getUsersDetails=this.getUsersDetails.bind(this);
        this.update=this.update.bind(this);
        //this.addImage=this.addImage.bind(this);
        this.state.filterText = "";
        this.state.technologies = [
        ];
    }

    componentDidMount() {
        this.getUsersDetails();
        this.getImage();
        this.getAreasOfInterest();

    }

    getAreasOfInterest(){

        fetch( 'http://localhost:8000/api/field/view',{
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
                    if(result.success.fields!=null) {
                        console.log(result.success.image)
                        this.setState({areasOfInterest: result.success.fields})
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

    handleUserInput(filterText) {
        this.setState({filterText: filterText});
    };
    handleRowDel(technology) {
        let index = this.state.technologies.indexOf(technology);
        this.state.technologies.splice(index, 1);
        this.setState(this.state.technologies);
    };

    handleAddEvent(technologyName) {
        //let id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
        let technology = {
            name: technologyName,
        }
        this.state.technologies.push(technology);
        this.setState(this.state.technologies);

    }

    getUsersDetails(){
        console.log("register")
        console.log(this.state.email);
        console.log(this.state.password);
        console.log('Bearer '+window.sessionStorage.getItem('token'));
        //let obj={email:this.state.email,password:this.state.password }
        fetch( 'http://localhost:8000/api/user/details',{
            mode:"cors",
            method: 'GET',
            headers: { 'Accept':"application/json",
                'Content-Type':"application/json",
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers':  'Origin, Content-Type, X-Auth-Token',
                'Authorization':'Bearer '+ window.sessionStorage.getItem('token')
            },
            //body:JSON.stringify(obj)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    //console.log(result)
                    this.setState({email:result.success.email,
                    name:result.success.name,
                    })
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    alert("Date incorecte");
                }
            )


    }

    update(){
       // console.log('Bearer '+window.sessionStorage.getItem('token'));
        let obj={email:this.state.email,password:this.state.password ,name:this.state.name}
        fetch( 'http://localhost:8000/api/user/update',{
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
                    console.log(result)
                    if(result.success!==undefined) {
                        console.log(result.success.token);
                        window.sessionStorage.setItem("token", result.success.token);
                        console.log(sessionStorage.getItem("token"));
                    }
                    this.setState(prevState => ({readOnly: true,editButton: false,submitButton: true}))
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    alert("Date incorecte");
                }
            )


    }

   // handleProductTable(evt) {
   //      let item = {
   //          //id: evt.target.id,
   //          name: evt.target.name,
   //         // value: evt.target.value
   //      };
   //      let technologies = this.state.technologies;
   //      technologies.add(item)
   //      /*let newProducts = technologies.map(function(technology) {
   //
   //          for (let key in technology) {
   //              if (key === item.name && technology.id === item.id) {
   //                  technology[key] = item.value;
   //
   //              }
   //          }
   //          return technology;
   //      });
   //      */
   //      this.setState({technologies:technologies});
   //      //  console.log(this.state.products);
   //  };

    getImage(){
        fetch( 'http://localhost:8000/api/user/getImage',{
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
                    if(result.success.image!=null) {
                        console.log(result.success.image)
                        this.setState({base64Image: result.success.image})
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







    edit(){
        this.setState(prevState => ({readOnly: false,editButton: true,submitButton: false}))
    }

    _handleImageChange(evt) {

        let reader = new FileReader();
        let file = evt.target.files[0];

        fileUpload(evt)
            .then((data) => {
                console.log("base64 :",data.base64);
                this.addImage(data.base64);
                this.setState({base64Image:data.base64})
                //this.processImage(data.base64);
            })
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
       // console.log("Imagine");
       reader.readAsDataURL(file);

    }

    addFieldsToDatabase(){


                this.state.technologies.forEach(
                    (technology)=>{
                        let fieldOfInterest={field_name:technology.name}
                        fetch( 'http://localhost:8000/api/field/add',{
                            mode:"cors",
                            method: 'POST',
                            headers: { 'Accept':"application/json",
                                'Content-Type':"application/json",
                                'Access-Control-Allow-Methods': 'POST',
                                'Access-Control-Allow-Headers':  'Origin, Content-Type, X-Auth-Token',
                                'Authorization':'Bearer '+ window.sessionStorage.getItem('token')
                            },
                            body:JSON.stringify(fieldOfInterest)
                        })
                            .then(res => res.json())
                            .then(
                                (result) => {
                                    if(result.success!==undefined) {
                                        console.log(result.success.field)
                                        this.getAreasOfInterest();
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
                )

        this.setState({technologies:[]});


    }

    addImage(base64String){

        let obj={profile_image:base64String}
        fetch( 'http://localhost:8000/api/user/addImage',{
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
                        console.log(result.success.image)
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

        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if(this.state.base64Image!==''){
            $imagePreview=<img src={`data:image/jpeg;base64,${this.state.base64Image}`} />
            console.log(this.state.base64Image)

        }
        else if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<div className="previewText">Selectati o imagine de profil</div>);
        }

        return (
            <div>
            <div className="previewComponent">
                <form onSubmit={(e)=>this._handleSubmit(e)}>
                    <input className="fileInput "
                           type="file"
                           onChange={(e)=>this._handleImageChange(e)} />
                </form>
               <center><div className="imgPreview" >
                {$imagePreview}
                </div> </center>
            </div>


                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>{translate("name")}:</Form.Label>
                            <Form.Control readOnly={this.state.readOnly }  type="text" placeholder={this.state.name}
                                          onChange={(e)=>{
                                              this.setState({name:e.target.value})
                                          }}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>{translate("email")}:</Form.Label>
                            <Form.Control readOnly={this.state.readOnly}   type="email" placeholder={this.state.email}
                                          onChange={(e) => {
                                              let {email} = this.state.email;

                                              email = e.target.value;

                                              this.setState({email});
                                          }}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>{translate("password")}:</Form.Label>
                            <Form.Control readOnly={this.state.readOnly}  type="password" placeholder={this.state.password}
                                          onChange={(e)=>{
                                              this.setState({password:e.target.value})
                                          }}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formGridAreasOfInterest">
                        <Form.Label>{translate("areasOfInterest")}:</Form.Label>
                        <Form.Control as="textarea" rows="3" readOnly   placeholder={this.state.areasOfInterest}
                        />
                    </Form.Group>
                </Form.Row>
                </Form>
                <Button  disabled={this.state.editButton} onClick={this.edit} variant="success" type="button">
                    Edit
                </Button>
                <Button  disabled={this.state.submitButton} onClick={this.update} variant="danger" type="submit">
                    Submit
                </Button>

                <div className="container1">
                    <TechnologiesOfInterestTable //onProductTableUpdate={this.handleProductTable.bind(this)}
                        addFields={this.addFieldsToDatabase.bind(this)}
                        onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} technologies={this.state.technologies} filterText={this.state.filterText}/>
                </div>

            </div>






        )
    }
}




export default Profil;