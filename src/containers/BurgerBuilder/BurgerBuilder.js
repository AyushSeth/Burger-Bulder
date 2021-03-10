import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../../hoc/AUXiliary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal'
import OrderSummary from './../../components/Burger/OrderSummary//OrderSummary';
import axios from '../../axios-orders'
import Spinner from './../../components/UI/Spinner/Spinner';
import withErrorHandeller from '../../hoc/withErrorHandeller/withErrorHandelle'
import * as actionTypes from './../../store/actions';

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
        // ingredients : null,
        totalPrice: 4,
        purchasable : false,
        purchasing:false,
        loading :false,
        error:false
    }

    componentDidMount() {
        // axios.get('https://burger-builder-react-app-48b8c-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json')
        // .then(response => {
        //     this.setState({ingredients:response.data});
        // })
        // .catch(error => {
        //     this.setState({error:true});
        // });
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
        return  sum > 0;
        // this.setState({purchasable: sum > 0})
    }

    purchaseHandeller = () => {
        this.setState({purchasing:true});
    }

    purchaseCancelHandeller = () => {
        this.setState({purchasing:false});
    }

    purchaseContinueHandeller = () => {
        this.props.history.push('/checkout');
    }

    render() {

        const disabledInfo = {
            ...this.props.ings
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummaryData =null;
     
        if(this.state.loading) {
            orderSummaryData = <Spinner />;
        }
        let burger = this.state.error ? <p>Ingredient's can't be loaded</p> : <Spinner />
        if(this.props.ings) {
        burger =  (
                <Auxiliary>
                    <Burger ingredients = {this.props.ings}/>
                    <BuildControls 
                        purchasable = {this.updatePurchasable(this.props.ings)}
                        ingredientAdded = {this.props.onIngredientAddedProperty}
                        ingredientsRemoved = {this.props.onIngredientRemoveProperty}
                        disabled = {disabledInfo}
                        price = {this.props.price}
                        purchasing={this.purchaseHandeller}
                    />
                </Auxiliary>
                );
                orderSummaryData =  <OrderSummary ingredients={this.props.ings} 
                purchaseCancelEvent={this.purchaseCancelHandeller}
                purchaseContinueEvent={this.purchaseContinueHandeller}
                price={this.props.price}
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

const mapStateToProp = state => {
    return {
        ings:state.ingredients,
        price:state.totalPrice
    };
}

const mapDispatchTotProp = dispatch =>  {
    return {
        onIngredientAddedProperty: (ingname) => dispatch({type:actionTypes.ADD_INGREDIENTS , ingredientName:ingname}),
        onIngredientRemoveProperty: (ingname) => dispatch({type:actionTypes.REMOVE_INGREDIENTS , ingredientName:ingname})
    };
}

export default connect(mapStateToProp,mapDispatchTotProp)(withErrorHandeller(BurgerBuilder,axios));