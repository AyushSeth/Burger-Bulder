import order from '../../components/Order/Order';
import * as actionsTypes from'../actions/actionsTypes';
import {updatedObject} from './../utility';

const initialState = {
    orders: [],
    loading:false,
    purchased:false
};

const reducer = (state = initialState , action) => {
    switch (action.type) {
        case actionsTypes.PURCHASE_INIT:
            return updatedObject(state, {purchased:true})
        case actionsTypes.PURCHASED_BURGER_START:
            return updatedObject(state, {loading:true})
        case actionsTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = updatedObject(action.orderData,{id:action.orderId});
            return updatedObject(state, {
                loading:false,
                purchased:true,
                orders:state.orders.concat(newOrder)
            })
        case actionsTypes.PURCHASE_BURGER_FAILED:
            return updatedObject(state, {loading:false})
        case actionsTypes.FETCH_ORDER_START:
            return updatedObject(state, {loading:true})
        case actionsTypes.FETCH_ORDER_SUCCESS:
            return updatedObject(state, {
                orders:action.orders,
                loading:false
            })
        case actionsTypes.FETCH_ORDER_FAAIL:
            return updatedObject(state, {loading:false})
        default:
            return state;
    }
}

export default reducer;
