import React from "react";
import ReactDOM from 'react-dom';
import Contact from "./Contact";
import Direction from "./Direction";

it("render without crushing",()=>{
 const div=document.createElement("div");
 ReactDOM.render(<Contact/>,div)
})

it("render map corectly",()=>{
    const div=document.createElement("div");
    ReactDOM.render(<Direction city='Cluj-Napoca'/>,div)
})
