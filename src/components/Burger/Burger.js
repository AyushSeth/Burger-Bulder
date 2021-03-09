import React from 'react';
import { withRouter } from 'react-router-dom';
import './Burger.css'
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

const burger = (props) => {

    let transformedIngrediendts = Object.keys(props.ingredients).map(
        (igKey) => {
            return [...Array(props.ingredients[igKey])].map((_,i) => {
                return <BurgerIngredients key = {igKey+i} type={igKey}/>;
            });
        }
    ).reduce((arr, el) => {
        return arr.concat(el)
    }, []);
    if(transformedIngrediendts.length === 0) {
        transformedIngrediendts = <p>Please start adding ingredients.</p>
    }
    // console.log(transformedIngrediendts);
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

export default withRouter(burger);