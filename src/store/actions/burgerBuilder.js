import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';

export const addIngredients = (name) => {
    return {
        type:actionTypes.ADD_INGREDIENTS,
        ingredientsName:name
    };
};

export const removeIngredients = (name) => {
    return {
        type:actionTypes.REMOVE_INGREDIENTS,
        ingredientsName:name
    };
};

export  const setIngredients = (ingredients) => {
    return {
        type:actionTypes.SET_INGREDIENTS,
        ingredients:ingredients
    };
};

export  const fetchIngredientsFailed = (ingredients) => {
    return {
        type:actionTypes.FETCH_INGREDIENTS_FAILED,
    };
};

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
        .then(response => {
            // alert("Wait");
            // console.log("Hello");
            // console.log(response);
            dispatch(setIngredients(response.data));
        })
        .catch(error => {
            dispatch(fetchIngredientsFailed());
        });
    };
};