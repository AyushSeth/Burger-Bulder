import React, { Component } from 'react';
import './Orders.css';
import axios from '../../axios-orders'
import Order from './../../components/Order/Order';
import withErrorHandeller from '../../hoc/withErrorHandeller/withErrorHandelle';

class Orders extends Component {

    state = {
        orders : [],
        loading:true
    }

    componentDidMount() {
        axios.get('/orders.json')
        .then(res => {
            const fetchedOrderData = []; 
            for(let key in res.data) {
                fetchedOrderData.push({...res.data[key],id: key});
            }
            // console.log(fetchedOrderData);
            this.setState({loading:false, orders:fetchedOrderData}); 
        })
        .catch(err => {
            this.setState({loading:false});
        });
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                        <Order 
                            key = {order.id}
                            ingredients={order.ingredienst}
                            price={order.price}
                        />
                ))}
                 
            </div>
        );
    }
}


export default withErrorHandeller(Orders,axios);