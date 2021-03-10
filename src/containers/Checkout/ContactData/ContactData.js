import React, { Component } from 'react';
import './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders'
import Spinner from './../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { valid } from 'semver';
import { connect } from 'react-redux';

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
        formIsValid:false,
        loading:false

    }

    checkValididity(value,rules) {
        
        let isValid = false;

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
                axios.post('/orders.json' , orders)
                .then(response => {
                    // console.log(response),
                    this.setState({loading:false });
                    this.props.history.push('/');
                    } )
                    .catch(error => {
                        // console.log(error), 
                        this.setState({loading:false })
                         } );
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
                    <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandeller}>ORDER</Button>
                </form>
        );
        if(this.state.loading) {
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
        ings:state.ingredients,
        price:state.totalPrice
    };
}

export default connect(mapStateToProp)(ContactData);