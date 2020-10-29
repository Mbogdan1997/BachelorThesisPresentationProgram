import React from "react";
import ReactDOM from 'react-dom';
import Despre from "./Despre";
import CommentForm from "./CommentForm";

it("render without crushing",()=>{
    const div=document.createElement("div");
    ReactDOM.render(<Despre/>,div)
})

it("renders map corectly",()=>{
    const div=document.createElement("div");
    ReactDOM.render(<CommentForm/>,div)
})

