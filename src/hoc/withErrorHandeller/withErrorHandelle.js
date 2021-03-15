import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../AUXiliary/Auxilary';

const withErrorHandeller = (WrappedComponent,axios) => {
    return class extends Component {

        state = {
            error:null
        }

        componentWillMount() {
            // console.log("[withErrorHandeller] component ");
            // console.log(axios);
            this.reqInterceptors = axios.interceptors.response.use(req => {
                this.setState({error:null});
                return req;
            });
            this.resInterceptors = axios.interceptors.response.use(response => response,error => {
                this.setState({error:error});
            });
        }
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }
        
        errorConfirmedHandeller = () => {
            this.setState({error:null});
        }

        render() {
            return (
                <Auxiliary>
                <Modal show={this.state.error}
                    modalClose = {this.errorConfirmedHandeller} >
                    {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedComponent  {...this.props}/>
            </Auxiliary>
            )
        }
    } 
}
    
export default withErrorHandeller;