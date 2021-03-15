import React, { Component } from 'react';
import {Redirect, Route} from 'react-router-dom';
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData'
import * as actions from './../../store/actions/index';

class Checkout extends Component {


        checkoutCancel = () => {
            this.props.history.goBack();
        }


        checkoutContinue = () => {
            // console.log("[Checkout] inside checkoutContinue() function");
            // console.log(this.props);
            this.props.history.replace('/checkout/contact-data');
        }

    render() {
        let summary = <Redirect to ="/" />;
        // let summary = '';
        // console.log("[Checkout] outside if condition ");
        // console.log(this.props.purchase);
        if ( this.props.purchase ) {
            const purchasedRedirect =this.props.purchased ?<Redirect to="/" /> :null;
            // console.log("[Checkout] if condition ")
            summary = (
                <div>
                <CheckoutSummary 
                ingredients={this.props.ings} 
                checkoutSummaryCancel ={this.checkoutCancel}
                checkoutSummaryContinue={this.checkoutContinue}/>
                <Route 
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData}
                    />
                </div>
            )
        }
        return (
            <div>
                {summary}
                
            </div>
        );
    }
}

const mapStateTpProps = state => {
    // console.log(state.order);
    return {    
        ings:state.burgerBuilder.ingredients,
        purchase:state.order.purchased
    };
};


export default connect(mapStateTpProps)(Checkout);