import React, { Component } from 'react';
import { Player } from 'video-react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

import XMLParser from 'react-xml-parser';
import ReactPlayer from "react-player"
import translate from "./I18N/translate";
import {Redirect
} from "react-router-dom";

class Student {
    constructor(name, license) {
        this.name = name;
        this.license = license;
    }
}

export default class Noutati extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            /*playerSource: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
            inputVideoUrl: 'http://www.w3schools.com/html/mov_bbb.mp4',
            books:[]*/
           students:[]
        };


        let xmlContent=''
        let tableBooks=document.getElementById("books")

        fetch('http://localhost:3000/news.xml').then((response)=>{response.text().then((xml)=>{
            console.log("aici")
            xmlContent=xml
            console.log(xml)
            let parser=new DOMParser();
            let xmlDOM=parser.parseFromString(xmlContent,'text/xml');
            let x = xmlDOM.getElementsByTagName("ARTIST");
            let y=xmlDOM.getElementsByTagName("TITLE");
            let txt=""
            let objs=[]

            for (let i = 0; i < x.length; i++) {
                txt += x[i].childNodes[0].nodeValue + "<br>";
                let student=new Student(x[i].childNodes[0].nodeValue, y[i].childNodes[0].nodeValue)
                objs.push(student)
                this.setState({students:objs})


            }
        })})


       /* this.handleValueChange = this.handleValueChange.bind(this);
        this.updatePlayerInfo = this.updatePlayerInfo.bind(this);
        */
    }

   /* componentDidUpdate(prevProps, prevState) {
        if (this.state.playerSource !== prevState.playerSource) {
            this.player.load();
        }
    }

    handleValueChange(e) {
        const { value } = e.target;
        this.setState({
            inputVideoUrl: value
        });
    }

    updatePlayerInfo() {
        const { inputVideoUrl } = this.state;
        this.setState({
            playerSource: inputVideoUrl
        });
    }
    */

    render() {
        let students= this.state.students.map((student) => {
            return (
                <tr >
                    <td>{student.name}</td>
                    <td>{student.license}</td>
                </tr>
            )
        });

        return (
            <div>

                <table id="students">
                    <thead>
                    <tr>
                        <th>{translate("name")}</th>
                        <th>{translate("title")}</th>
                    </tr>
                    </thead>

                    <tbody>
                    {students}
                    </tbody>
                </table>

                <div>
                    <ReactPlayer
                        url="https://www.youtube.com/watch?v=ug50zmP9I7s"
                    />
                </div>
            </div>
        );
    }
}