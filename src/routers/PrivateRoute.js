import React from 'react'
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom'

export const PrivateRoute = ({
    isAutenticated,
    component: Component,
    ...rest // operador rest
}) => {

    localStorage.setItem('lastPath', rest.location.pathname )

    return (
        <Route // protegeremos nuestra ruta mediante una condicion con el isAutenticated
           { ...rest }
           component={ (props) => (
               ( isAutenticated ) 
                  ? ( <Component { ...props } /> )
                  : ( <Redirect to='/login' /> )
           )} />
    )
}

PrivateRoute.propTypes = {
    isAutenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
