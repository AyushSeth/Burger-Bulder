import * as actionTypes from './actionsTypes';
import axios from './../../axios-orders';

export const purchasedBurgerSuccess = (id,orderData) => {
    return {
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    };
};

export const purchaseBurgerFailed = (error)=> {
    return {
        type:actionTypes.PURCHASE_BURGER_FAILED,
        error:error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type:actionTypes.PURCHASED_BURGER_START
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json' , orderData)
            .then(response => {
                dispatch(purchasedBurgerSuccess(response.data, orderData))
        } )
        .catch(error => {
            dispatch(purchaseBurgerFailed(error))
        } );
    };
};

export const purchaseInit = () => {
    // console.log(" came to purchaseInit()) now it isin function ");
    return {
        type:actionTypes.PURCHASE_INIT
    }
}

export const fetchOerderSuccess = (orders) => {
    return {
        type:actionTypes.FETCH_ORDER_SUCCESS,
        orders:orders
    }
}

export const fetchOerderFail = (error) => {
    return {
        type:actionTypes.FETCH_ORDER_FAAIL,
        error:error
    }
}

export const fetchOerderStart = (error) => {
    return {
        type:actionTypes.FETCH_ORDER_START,
        error:error
    }
}

export const fetchOrders =() => {
    return dispatch => {
        // dispatch(fetchOerderStart());
        axios.get('/orders.json')
        .then(res => {
            const fetchedOrderData = []; 
            for(let key in res.data) {
                fetchedOrderData.push({...res.data[key],id: key});
            }
            // console.log(fetchedOrderData);
            // console.log("Came out of detting order data.");
            dispatch(fetchOerderSuccess(fetchedOrderData));
        })
        .catch(err => {
            dispatch(fetchOerderFail(err));
        });   
    }
}