import React, { useMemo } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { getHeroById } from '../../selectors/getHeroById'

const heroImages = require.context('../../assets/heroes', true)

export const HeroScreen = ({ history }) => {

    const { heroeId } = useParams()  // extraer los argumentos que bienen en el url
    const hero = useMemo(() => getHeroById(heroeId), [ heroeId ] )

    if ( !hero ) {
        return <Redirect to='/' /> // redireciona a la pagina principal
    }

    const handleReturn = () => {

        if( history.length <=2 ) {
            history.push('/')
        } else {
            history.goBack()
        }

    }

    const {
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters
    } = hero 

    return (
        <div className='row mt-5'>
            <div className='col-4'>
                <img 
                //    src={ `../assets/heroes/${ heroeId }.jpg` } 
                   src={ heroImages(`./${ heroeId }.jpg`).default }
                   className='img-thumbnail animate__animated animate__fadeInLeft'
                   alt={ superhero } />
            </div>
            <div className='col-8'>
                <h3>{ superhero }</h3>
                <ul className='list-group list-group-flush'>
                    <li className='list-group-item'> <b> Alter ego: </b> {alter_ego} </li>
                    <li className='list-group-item'> <b> publisher: </b> {publisher} </li>
                    <li className='list-group-item'> <b> first_appearance: </b> {first_appearance} </li>
                </ul>

                <h5> Characters </h5>
                <p> { characters } </p>

                <button 
                   className='btn btn-outline-info'
                   onClick={ handleReturn }>
                    Return
                </button>

            </div>
        </div>
    )
}
