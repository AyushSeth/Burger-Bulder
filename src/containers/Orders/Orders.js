import React, { Component } from 'react';
import './Orders.css';
import axios from '../../axios-orders'
import Order from './../../components/Order/Order';
import withErrorHandeller from '../../hoc/withErrorHandeller/withErrorHandelle';
import * as action from './../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from './../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders();
    }

    render() {
        let orders = <Spinner/>;
        // console.log("cam before orders");
        // console.log(this.props.orders);
        // console.log(this.props.loading);
        // console.log("cam before orders");
        if(!this.props.loading) {
            orders = this.props.orders.map(order => (
                    // console.log();
                     <Order 
                        key = {order.id}
                        ingredients={order.ingredienst}
                        price={order.price}
                    />
                ))
            }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProp = state => {
    return {
        orders:state.order.orders,
        loading:state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(action.fetchOrders())
    };
};

export default connect(mapStateToProp,mapDispatchToProps)(withErrorHandeller(Orders,axios));