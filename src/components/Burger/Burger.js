import React from 'react';
import { withRouter } from 'react-router-dom';
import './Burger.css'
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import {connect} from 'react-redux';

const burger = (props) => {
    console.log("1");
    console.log(props.ingredients);
    console.log("1");
    
    let transformedIngrediendts = Object.keys(props.ingredients).map(
        (igKey) => {
            // console.log("hello_below_lenth");
            // console.log(igKey);
            // console.log(...Array(props.ingredients[igKey]));
            // console.log("2");
            // return [...Array(props.ingredients[igKey])].map((_,i) => {
                return <BurgerIngredients key = {igKey} type={igKey}/>;
            ;
        }
    ).reduce((arr, el) => {
        return arr.concat(el)
    }, []);
    if(transformedIngrediendts.length === 0) {
        transformedIngrediendts = <p>Please start adding ingredients.</p>
    }
    console.log(transformedIngrediendts);
    return (
        <div className='Burger'>
            <BurgerIngredients type ="bread-top"/>
            {transformedIngrediendts}
            <BurgerIngredients type ="bread-button"/>
            {/* <BurgerIngredients type ="salad"/>
            <BurgerIngredients type ="bacon"/> */}
        </div>
    );
};

// const mapStateToProps = state => {
//     return {
//         ingredients:state.ingredients,
        
//     }
// }

export default withRouter(burger);