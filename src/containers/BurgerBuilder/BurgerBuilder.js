import React, { Component } from 'react';

import Auxiliary from '../../hoc/AUXiliary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal'
import OrderSummary from './../../components/Burger/OrderSummary//OrderSummary';
import axios from '../../axios-orders'
import Spinner from './../../components/UI/Spinner/Spinner';
import withErrorHandeller from '../../hoc/withErrorHandeller/withErrorHandelle'

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
        ingredients : null,
        totalPrice: 4,
        purchasable : false,
        purchasing:false,
        loading :false,
        error:false
    }

    componentDidMount() {
        axios.get('https://burger-builder-react-app-48b8c-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json')
        .then(response => {
            this.setState({ingredients:response.data});
        })
        .catch(error => {
            this.setState({error:true});
        });
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

    purchaseHandeller = () => {
        this.setState({purchasing:true});
    }

    purchaseCancelHandeller = () => {
        this.setState({purchasing:false});
    }

    purchaseContinueHandeller = () => {
        // alert('Clicked on Continue');
        
        

        const queryParams = [];
        for(let i in  this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        } 
        queryParams.push('price='+this.state.totalPrice);
        const queryString = queryParams.join('&'); 

        this.props.history.push({
            pathname : '/checkout',
            search: '?' + queryString
        });
    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummaryData =null;
     
        if(this.state.loading) {
            orderSummaryData = <Spinner />;
        }
        let burger = this.state.error ? <p>Ingredient's can't be loaded</p> : <Spinner />
        if(this.state.ingredients) {
        burger =  (
                <Auxiliary>
                    <Burger ingredients = {this.state.ingredients}/>
                    <BuildControls 
                        purchasable = {this.state.purchasable}
                        ingredientAdded = {this.addIngredientHandeller}
                        ingredientsRemoved = {this.removeIngredientHandeller}
                        disabled = {disabledInfo}
                        price = {this.state.totalPrice}
                        purchasing={this.purchaseHandeller}
                    />
                </Auxiliary>
                );
                orderSummaryData =   <OrderSummary ingredients={this.state.ingredients} 
                purchaseCancelEvent={this.purchaseCancelHandeller}
                purchaseContinueEvent={this.purchaseContinueHandeller}
                price={this.state.totalPrice}
            />
        }
        if(this.state.loading) {
            orderSummaryData = <Spinner />;
        }

        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClose={this.purchaseCancelHandeller}>
                {orderSummaryData}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

export default withErrorHandeller(BurgerBuilder,axios);