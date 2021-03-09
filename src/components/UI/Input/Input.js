import React from 'react';
import './Input.css';

const input = (props) => {

    let inputElement = null;
    const inputClassesForm = ["InputElement"];

    if(props.isValid && props.shouldValidate && props.touched) {
        inputClassesForm.push('Invalid');
    }

    switch(props.elementType) {
        case ('input') :
            inputElement = <input className={inputClassesForm.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />
            break;
        case ('textarea') :
            inputElement = <textarea className={inputClassesForm.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />
            break;
        case ('select') :
                inputElement = (<select className={inputClassesForm.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}>
                       {props.elementConfig.options.map(option => {
                           return <option key ={option.value} value={option.value}>{option.displayValue}</option>
                       })}
                </select> ); 
                break;
        default:
            inputElement = <input className={inputClassesForm.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />
    }

    return (
        <div className="Input">
            <label className="Label">{props.labl}</label>
            {inputElement}
        </div>
    );
};

export default input;