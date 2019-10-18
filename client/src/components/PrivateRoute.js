import React, { Component } from 'react';
import {Route,Redirect} from 'react-router-dom';

const PrivateRoute =({component: Component,render:Render,...rest})=>{

    return (
        <Route 
        {...rest}
        render= {props=>{
            if(localStorage.getItem('token')){
                if(Component)return <Component {...props}/>;
                if(Render)return Render (props)
            }
            else {
                return <Redirect to ="/"/>
            }
        }}
        />
    )
}

export default PrivateRoute;