import React from 'react';
import './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/AUXiliary/Auxilary';

const sideDrawer = (props) => {

    let attachClasses = ["SideDrawer","Close"];
    if(props.open) {
        attachClasses = ["SideDrawer","Open"];
    }
    return (
        <Auxiliary>
            <BackDrop show={props.open} clicked={props.close}/>
            <div className={attachClasses.join(' ')}>
                <div className="Logo">
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Auxiliary>
    );
};

export default sideDrawer;