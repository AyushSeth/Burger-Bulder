import React, { Component } from 'react';
import Auxiliary from '../AUXiliary/Auxilary'; 
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{

    state = {
        showSideDrawer : false
    }

    sideDrawerHandeller = () => {
        this.setState({showSideDrawer : false});
    }

    showSideDrawerMenu = () => {
        this.setState({showSideDrawer : true});
    }

    render() {
        return (
            <Auxiliary>
                <Toolbar showSide = {this.showSideDrawerMenu}/>
                <SideDrawer open={this.state.showSideDrawer} close={this.sideDrawerHandeller} />
                <main className="content">
                    {this.props.children}
                </main>
            </Auxiliary>
        );
    }
}

export default Layout;