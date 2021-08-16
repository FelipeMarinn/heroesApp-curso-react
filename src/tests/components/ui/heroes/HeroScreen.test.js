import { mount } from "enzyme"
import { MemoryRouter, Route } from "react-router-dom"
import { HeroScreen } from "../../../../components/heroes/HeroScreen"


describe('Pruebas en HeroScreen', () => {

    const history = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn()
    }

    test('debe de mostrar el componente redirect si no hay argumento en le URL', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <HeroScreen history={ history }/>
            </MemoryRouter>
        )

        expect( wrapper.find('Redirect').exists() ).toBe(true)

    })

    test('debe de mostrar un hero si el parametro existe y se encuentra', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path='/hero/:heroeId' component={ HeroScreen }/>
            </MemoryRouter>
        )

        expect( wrapper.find('.row').exists() ).toBe(true)

    })

    test('debe de regresar a la pantalla anterior con push', () => {
        
        const history = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn()
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                   path='/hero/:heroeId' 
                   component={ () => <HeroScreen history={ history } /> }/>
            </MemoryRouter>
        )

        wrapper.find('button').prop('onClick')()
        expect( history.push ).toHaveBeenCalledWith('/')
        expect( history.goBack ).not.toHaveBeenCalledWith()

    })

    test('debe de regresar a la pantalla anterior goBack', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                   path='/hero/:heroeId' 
                   component={ () => <HeroScreen history={ history } /> }/>
            </MemoryRouter>
        )

        wrapper.find('button').prop('onClick')()
        expect( history.goBack ).toHaveBeenCalled()
        expect( history.push ).toHaveBeenCalledTimes(0)

    })

    test('debe de llamar el Redirect si el heroe no existe', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider45278578']}>
                <Route 
                   path='/hero/:heroeId' 
                   component={ () => <HeroScreen history={ history } /> }/>
            </MemoryRouter>
        )

       //expect( wrapper.find('Redirect').exists() ).toBe(false)
       expect( wrapper.text() ).toBe('')

    })
    
})