import React from 'react';
import Auxiliary from '../../hoc/Auxilary'; 
import './Layout.css';

const Layout = (props) => (
    <Auxiliary>
        <div>Toolbar, Sidedrawer, Backdrop</div>
        <main className="content">
            {props.children}
        </main>
    </Auxiliary>
);

export default Layout;