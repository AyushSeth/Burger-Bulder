import React from 'react';
import './Button.css';

const button = (props) => {
    let color = 'Button';
    let btnType = props.btnType;
    color = color+' '+btnType;
       return (
             <button onClick={props.clicked} disabled={props.disabled}  className={color}> {props.children} </button>
       );
};

export default button;