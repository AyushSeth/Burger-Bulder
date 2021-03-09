import React from 'react';
import Auxilary from '../../../hoc/AUXiliary/Auxilary';
import Butron from './../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
    .map((igKey) => {
        return (<li key={igKey}><span>{igKey}</span> : {props.ingredients[igKey]}</li>);
    }); 
    return (
        <Auxilary>
            <h3>Your Order</h3>
            <p>A delicious burger with following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <h4>Total Price : <strong>$ {props.price.toFixed(2)}</strong></h4>
            <p>Continue to checkout ?</p>
            <Butron btnType="Danger" clicked ={props.purchaseCancelEvent} >CANCEL</Butron>
            <Butron btnType="Success" clicked={props.purchaseContinueEvent} >CONTINUE</Butron>
        </Auxilary>
    );
};

export default orderSummary;