import React from 'react';
import { mount } from 'enzyme';
import { LoginScreen } from '../../../../components/login/LoginScreen';
import { AuthContext } from '../../../../auth/AuthContext';
import { types } from '../../../../types/types';


describe('Prueba en LoginScreen', () => {

    const history = {     
        replace: jest.fn(),
    }

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }

    test('debe de mostrarse correctamente', () => {
      
        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
               <LoginScreen history={ history } /> 
            </AuthContext.Provider>
        )

        expect( wrapper ).toMatchSnapshot()

    })

    test('debe de realizar el dispatch y la navegacion', () => {

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
               <LoginScreen history={ history } /> 
            </AuthContext.Provider>
        )

        const handleClick = wrapper.find('button').prop('onClick')
        
        handleClick()

        expect( contextValue.dispatch ).toHaveBeenCalledWith({
            type: types.login,
            payload: {
                name: 'daniel'
            }
        })
        expect( history.replace ).toHaveBeenCalledWith('/')

        localStorage.setItem('lastPath','/dc')
        handleClick()
        expect( history.replace ).toHaveBeenCalledWith('/dc')

    })

})