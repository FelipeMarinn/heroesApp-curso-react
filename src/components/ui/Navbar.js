import React, { useContext } from 'react'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../../auth/AuthContext'
import { types } from '../../types/types'


export const Navbar = () => {

    const { user: { name }, dispatch } = useContext( AuthContext )
   
    const history = useHistory() // usa el historial del url del router 

    const handleLogout = () => {
        dispatch({
            type: types.logout,
        })

        history.replace('/login') 
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mr-5">
            
            <Link 
                className="navbar-brand mx-5 col-auto" 
                to="/"
            >
                Asociaciones
            </Link>

            <div className="navbar-collapse col-auto">
                <div className="navbar-nav mx-5">

                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/marvel"
                    >
                        Marvel
                    </NavLink>

                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/dc"
                    >
                        DC
                    </NavLink>

                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/search"
                    >
                        Search
                    </NavLink>

                </div>
            </div>

            <div className='align-self-end col-auto'>
                <div className="navbar-collapse">
                    <ul className="navbar-nav ml-auto mx-5">
    
                        <span className='nav-item nav-link text-info'> { name } </span>
    
                        <button 
                            className="btn nav-item nav-link align-self-start" 
                            onClick={ handleLogout }
                        >
                            Logout
                        </button>
                    </ul>
                </div>
            </div>
          
        </nav>
    )
}