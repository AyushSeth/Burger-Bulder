import React from 'react';
import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => {
    return (
        <div>
            <ul className="NavigationItems">
                <NavigationItem links="/" exact>Burger Builder</NavigationItem>
                <NavigationItem links="/orders" >Orders</NavigationItem>
            </ul>
        </div>
    );
};

export default navigationItems;