import React, { Component } from 'react';
import './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders'
import Spinner from './../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { valid } from 'semver';
import { connect } from 'react-redux';
import withErrorHandelle from '../../../hoc/withErrorHandeller/withErrorHandelle';
import * as actions from './../../../store/actions/index'; 

class ContactData extends Component {

    state = {
        orderForm: {
                name: {
                    elementType : 'input',
                    elementConfig : {
                        type : 'text',
                        placeholder : "Your Name"
                    },
                    value:'',
                    validation: {
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                street:{
                    elementType : 'input',
                    elementConfig : {
                        type : 'text',
                        placeholder : "Your Street"
                    },
                    value:'',
                    validation: {
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                locality:{
                    elementType : 'input',
                    elementConfig : {
                        type : 'text',
                        placeholder : "Your Locality"
                    },
                    value:'',
                    validation: {
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                State: {
                    elementType : 'input',
                    elementConfig : {
                        type : 'text',
                        placeholder : "Your State"
                    },
                    value:'',
                    validation: {
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                zipCode: {
                    elementType : 'input',
                    elementConfig : {
                        type : 'text',
                        placeholder : "Your Zip Code"
                    },
                    value:'',
                    validation: {
                        required:true,
                        minLength:5,
                        maxLength:5,
                    },
                    valid:false,
                    touched:false
                },
                country: {
                    elementType : 'input',
                    elementConfig : {
                        type : 'text',
                        placeholder : "Your Country"
                    },
                    value:'',
                    validation: {
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                email:{
                    elementType : 'input',
                    elementConfig : {
                        type : 'text',
                        placeholder : "Your E-Mail"
                    },
                    value:'',
                    validation: {
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                deliveryMethod: {
                    elementType : 'select',
                    elementConfig : {
                        options : [ 
                            {value:'swiggy' , displayValue:'Swiggy'},
                            {value:'zomato' , displayValue:'Zomato'}
                        ] 
                    },
                    value:'',
                    validation: {
                        required:true
                    },
                    valid:true
                },
        },
        formIsValid:false
    }

    checkValididity = (value,rules)  =>  {
        
        let isValid = false;
        // console.log("[ContactData] checkvaliduity() function");
        // console.log(rules);
        if(rules.required) {
            isValid = value.trim() !== '';
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    orderHandeller = (event) => {
        this.setState({loading:true});
        const formData = {};
        for (let formKey in this.state.orderForm) {
            formData[formKey] = this.state.orderForm[formKey].value;
        }
        const orders = {
            ingredienst:this.props.ings,
            price:this.props.price,
            order:formData
        }
        this.props.onOrderBurger(orders);    
    }

    inputChangedHandeller = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm 
        }
        const updatedFormOrderForm = {
            ...updatedOrderForm[inputIdentifier]
        } 
        updatedFormOrderForm.value = event.target.value;
        updatedFormOrderForm.touched = true;
        // console.log("[ContactData] inputChangedHandeller() function");
        // console.log(updatedFormOrderForm);
        // console.log(updatedFormOrderForm);
        updatedFormOrderForm.valid = this.checkValididity(updatedFormOrderForm.value,updatedFormOrderForm.validation);
        updatedOrderForm[inputIdentifier] = updatedFormOrderForm;

        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid });

    }

    render() {
        // console.log("Came here in contact_data on clicked");

        const formElementsArrays = [];
        for(let key in this.state.orderForm) {
            formElementsArrays.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }
        // console.log("[ContactData] render() below is formElementdata");
        // console.log(formElementsArrays);



        let form = (
                <form onSubmit={this.orderHandeller}>

                    {/* <Input elementType="..." elementConfig="..." value="..." /> */}
                    {formElementsArrays.map(element => (
                        <Input 
                        key={element.id}
                        elementType={element.config.elementType} 
                        elementConfig={element.config.elementConfig} 
                        value={element.config.value} 
                        isValid={!element.config.valid}
                        touched={element.config.touched}
                        shouldValidate = {element.config.validation}
                        changed={(event) => this.inputChangedHandeller(event,element.id)}
                        />
                    ))}
                    <Button btnType="Success" disabled={!this.state.formIsValid} onClick={() => this.checkValididity()}>ORDER</Button>
                </form>
        );
        if(this.props.loading) {
            form = <Spinner />; 
        }
        return (
            <div className='ContactData'>
                <h4>Enter your contact data:</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProp = state => {
    return {
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading
    };
}

const mapDispatchToProp = dispatch => {
    return {
        onOrderBurger:(orderData) => dispatch(actions.purchaseBurger(orderData))
    };
}

export default connect(mapStateToProp,mapDispatchToProp)(withErrorHandelle(ContactData,axios));