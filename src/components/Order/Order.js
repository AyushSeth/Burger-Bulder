import React from 'react';
import './Order.css';
import {connect} from 'react-redux';

const order = (props) => {

    const ingredients = [];
    // console.log("Hello 1");
    // console.log(props.ingredients);
    // console.log("Hello 1");

    for(let ingredientsname in props.ingredients) {
        // console.log(ingredientsname[ingredientsname]);
        // console.log(props.ingredients[ingredientsname]);
        ingredients.push({ name: ingredientsname, amount:props.ingredients[ingredientsname]});
        
    }
    
    const ingredientOutput = ingredients.map(ig => {
        // console.log(ig);
        return <span 
                    key={ig.name}
                    style={{
                        textTransform:'capitalize',
                        display:'inline-block',
                        margin: '0 8px',
                        border: '1px solid #ccc',
                        padding: '5px'
                    }}
                    >{ig.name} {ig.amount}</span>
    });

    return (
        <div className="Order">
            <p>Ingredients : {ingredientOutput}</p>      
            <p>Price: <strong>$ {Number.parseFloat(props.price).toFixed(2)}</strong></p>      
        </div>
    );
};


// const mapStateToProps = state => {
//     return {
//         ingredients:state.burgerBuilder.ingredients
//         price:state.burgerBuilder.totalPrice
//     }
// }

export default order;