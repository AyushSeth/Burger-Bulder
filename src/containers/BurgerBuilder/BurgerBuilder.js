import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Auxiliary from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENTS_PRICES =  {
    salad : 0.5,
    bacon : 0.4,
    cheese : 0.6,
    meat : 1.3
}

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {

    //     } 
    // }

    state = {
        ingredients : {
            salad : 0,
            bacon : 0,
            cheese : 0,
            meat : 0
        },
        totalPrice: 4,
        purchasable : false
    }

    updatePurchasable(ingredients) {
        // const ingredients = {
        //     ...this.state.ingredients
        // };
        const sum = Object.keys(ingredients)
        .map( igKey => {
            return ingredients[igKey]
        })
        .reduce((sum ,el)=> {
            return sum + el;
        }, 0);
        this.setState({purchasable: sum > 0})
    }

    addIngredientHandeller = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+1;
        const updateIngredients = {...this.state.ingredients};
        updateIngredients[type] = updatedCount;
        const priceAddition = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice+priceAddition;
        this.setState({totalPrice:newPrice,ingredients:updateIngredients});
        this.updatePurchasable(updateIngredients);
    }

    removeIngredientHandeller = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount-1;
        const updateIngredients = {...this.state.ingredients};
        updateIngredients[type] = updatedCount;
        const priceReduction = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice-priceReduction;
        this.setState({totalPrice:newPrice,ingredients:updateIngredients});
        this.updatePurchasable(updateIngredients);
    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return (
            <Auxiliary>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls 
                    purchasable = {this.state.purchasable}
                    ingredientAdded = {this.addIngredientHandeller}
                    ingredientsRemoved = {this.removeIngredientHandeller}
                    disabled = {disabledInfo}
                    price = {this.state.totalPrice }
                />
            </Auxiliary>
        );
    }
}

BurgerBuilder.propTypes = {

};

export default BurgerBuilder;