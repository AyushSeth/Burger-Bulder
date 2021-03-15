import { object } from 'prop-types';
import * as actionTypes from '../actions/actionsTypes';
import {updatedObject} from './../utility';

const initialState = {
    ingredients : null,
    error:false,
    totalPrice: 4,
};

const INGREDIENTS_PRICES =  {
    salad : 0.5,
    bacon : 0.4,
    cheese : 0.6,
    meat : 1.3
};

const addIngredients = (state,action) => {
    // console.log("Clicked on add 1");
    // console.log([action.ingredientName]);
    // console.log(action.ingredientsName);
    // console.log(state.ingredients);

    // console.log(state.ingredients[action.ingredientsName]);
    // console.log("Clicked on add 2 ");
   
    const updatedIngredients = {[action.ingredientsName] : state.ingredients[action.ingredientsName] + 1};
    // console.log("Clicked on add 3 ");
    // console.log(updatedIngredients);
    // console.log("Clicked on add 4");
    const updateIngredients = updatedObject(state.ingredients,updatedIngredients);
    const updatdState = {
        ingredients:updateIngredients,
        totalPrice:state.totalPrice + INGREDIENTS_PRICES[action.ingredientsName]
    }
    return updatedObject(state,updatdState);
};

const removeIngredients = (state,action) => {
    const updatedIngre = {[action.ingredientsName] : state.ingredients[action.ingredientsName] - 1}
    const updateIngre = updatedObject(state.ingredients,updatedIngre);
    const updatdSt = {
        ingredients:updateIngre,
        totalPrice:state.totalPrice - INGREDIENTS_PRICES[action.ingredientsName]
    }
    return updatedObject(state,updatdSt);
};

const setIngredients = (state,action) => {
    // console.log("action");
    // console.log(action);
    // console.log("action");
    return updatedObject(object , {
        ingredients: {
            salad:action.ingredients.salad,
            bacon:action.ingredients.bacon,
            cheese:action.ingredients.cheese,
            meat:action.ingredients.meat,
        },
        totalPrice:4,
        error:false
    })
};

const fetchIngredientsFailed = (state,action) => {
    return updatedObject(object , {
        ingredients: {
            salad:action.ingredients.salad,
            bacon:action.ingredients.bacon,
            cheese:action.ingredients.cheese,
            meat:action.ingredients.meat,
        },
        totalPrice:4,
        error:false
    })
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENTS:
            return addIngredients(state,action);
        case actionTypes.REMOVE_INGREDIENTS:
            return removeIngredients(state,action );
        case actionTypes.SET_INGREDIENTS:
            return setIngredients(state,action);
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fetchIngredientsFailed(state,action)
    }
    return state;
};

export default reducer;