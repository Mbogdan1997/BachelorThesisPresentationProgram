import React from "react";
import "./comment.css";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import './despre.css';
import translate from "./I18N/translate";
import {Redirect
} from "react-router-dom";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { VictoryLine, VictoryChart } from "victory";


class Despre extends React.Component{

    constructor(){
        super();
        this.state = {title:"Preprocesarea Imagenilor Satelitare",readOnly: true,editButton:false,submitButton:true,
        description:"Preprocesarea imaginilor satelitare pentru a eficientiza o retea neuronala care incearca determinarea tipurilor de sol pe baza acestora." +
            "\n"+
            "Prelucrarea preliminară a imaginilor satelitare (preprocesarea) presupune aplicarea următoarelor corecţii:"+"\n"
            +"Corecţiile radiometrice care se aplică pentru eliminarea erorilor provocate de către senzorul de teledetecţie şi de mediul înconjurător."
            +"Corecţiile geometrice care se aplică în scopul eliminării erorilor ce deformează geometria imaginilor."+"\n",
            author:'',
            showComments: false,
            comments: [
            ],
            data: [
            ]
        }
        this.edit = this.edit.bind(this);
        this.submit = this.submit.bind(this);
        this.loadUser=this.loadUser.bind(this);
        this.loadComments=this.loadComments.bind(this);
        this.getChartData=this.getChartData.bind(this);
    }

    componentDidMount() {
        this.loadUser();
        this.loadComments();
        this.getChartData();

    }

    getChartData(){
        fetch( 'http://localhost:8000/api/comment/chart',{
            mode:"cors",
            method: 'GET',
            headers: { 'Accept':"application/json",
                'Content-Type':"application/json",
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers':  'Origin, Content-Type, X-Auth-Token',
                'Authorization':'Bearer '+ window.sessionStorage.getItem('token')
            },
            //body:JSON.stringify(obj)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    //console.log(result)
                    this.setState({
                        data: result.success.chart,
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

    loadComments(){
        fetch( 'http://localhost:8000/api/comment/view',{
            mode:"cors",
            method: 'GET',
            headers: { 'Accept':"application/json",
                'Content-Type':"application/json",
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers':  'Origin, Content-Type, X-Auth-Token',
                'Authorization':'Bearer '+ window.sessionStorage.getItem('token')
            },
            //body:JSON.stringify(obj)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    //console.log(result)
                    this.setState({
                        comments: result.success.comments,
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
    loadUser(){
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
                    console.log(result.success.name)
                    this.setState({
                       author: result.success.name,
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

    edit(){
        this.setState(prevState => ({readOnly: false,editButton: true,submitButton: false}))
    }
    submit(){

    }

    deleteComment(id){
        fetch( 'http://localhost:8000/api/comment/remove',{
            mode:"cors",
            method: 'DELETE',
            headers: { 'Accept':"application/json",
                'Content-Type':"application/json",
                'Access-Control-Allow-Methods': 'DELETE',
                'Access-Control-Allow-Headers':  'Origin, Content-Type, X-Auth-Token',
                'Authorization':'Bearer '+ window.sessionStorage.getItem('token')
            },
            body:JSON.stringify(id)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if(result.success!==undefined) {
                        console.log(result.success.id)
                        this.loadComments();
                        this.getChartData();
                    }
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    //alert("Date incorecte");
                    // console.log(error);
                }
            )
    }

    _addComment(author, body) {
        let dateFormat = require('dateformat');
        console.log(dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"))
        let commentForDb={text:body,date:dateFormat(new Date(), "yyyy-mm-dd HH:mm:ss")};
        console.log( JSON.stringify(commentForDb));
        fetch( 'http://localhost:8000/api/comment/add',{
            mode:"cors",
            method: 'POST',
            headers: { 'Accept':"application/json",
                'Content-Type':"application/json",
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers':  'Origin, Content-Type, X-Auth-Token',
                'Authorization':'Bearer '+ window.sessionStorage.getItem('token')
            },
            body:JSON.stringify(commentForDb)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if(result.success!==undefined) {
                        console.log(result.success.comment)
                    }
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    //alert("Date incorecte");
                   // console.log(error);
                }
            )
        this.loadComments();
        this.getChartData();// *new array references help React stay fast, so concat works better than push here.
    }

    _handleClick() {
        this.setState({
            showComments: !this.state.showComments
        });
    }

    _getComments() {
        return this.state.comments.map((comment) => {
            return (
                <Comment
                    deleteComment={this.deleteComment.bind(this)}
                    author={this.state.author}
                    body={comment.text}
                    id={comment.id}
                    key={comment.id} />
            );
        });
    }

    _getCommentsTitle(commentCount) {
        if (commentCount === 0) {
            return 'No comments yet';
        } else if (commentCount === 1) {
            return "1 comment";
        } else {
            return `${commentCount} comments`;
        }
    }

render() {

        const comments = this._getComments();
        let commentNodes;
         let buttonText = 'Show Comments';

     if (this.state.showComments) {
        buttonText = 'Hide Comments';
        commentNodes = <div className="comment-list">{comments}</div>;
        }
        return(
            <div>

                <Form>
                    <Form.Group controlId="formBasicTitlulLucrarii">
                        <Form.Label>Title:</Form.Label>
                        <Form.Control  value={this.state.title} readOnly={this.state.readOnly} type="text" placeholder="Introduceti titlul lucrarii" />
                    </Form.Group>

                    <Form.Group controlId="formBasicDescriereaLucrarii">
                        <Form.Label>About:</Form.Label>
                        <Form.Control value={this.state.description} readOnly={this.state.readOnly} as="textarea" rows="10" />
                    </Form.Group>

                    {/*<Button  disabled={this.state.editButton} onClick={this.edit} variant="success" type="button">*/}
                    {/*    Edit*/}
                    {/*</Button>*/}
                    {/*<Button  disabled={this.state.submitButton} onClick={this.submit} variant="danger" type="submit">*/}
                    {/*    Submit*/}
                    {/*</Button>*/}
                </Form>
                <br></br>

                <div className="comment-box">
                    <h2>Descrieti Lucrarea de Licenta!</h2>
                    <CommentForm author={this.state.author} addComment={this._addComment.bind(this)}/>
                    <button id="comment-reveal" onClick={this._handleClick.bind(this)}>
                        {buttonText}
                    </button>
                    <h3>Comments</h3>
                    <h4 className="comment-count">
                        {this._getCommentsTitle(comments.length)}
                    </h4>
                    {commentNodes}
                </div>
                <h1>Statistica Comentarii</h1>
                <VictoryChart>
                    <VictoryLine data={this.state.data} />
                </VictoryChart>

            </div>






        )
    }

}

export default Despre;