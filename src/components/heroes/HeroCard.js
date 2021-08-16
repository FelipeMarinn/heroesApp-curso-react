import React from 'react'
import { Link } from 'react-router-dom'

const heroImages = require.context('../../assets/heroes', true)

export const HeroCard = ({ 
    id,
    superhero,
    alter_ego,
    first_appearance,
    characters
 }) => {

    return (
        <div className='card ms-3 p-0 mb-3' style={{ maxWidth: 640 }}>
            <div className='row no-gutters'>
                <div className='col-md-4'>
                    <img 
                    //  src={`./assets/heroes/${id}.jpg`} // desde puclic/assets 
                       src={ heroImages(`./${ id }.jpg`).default }
                       className='card-img' alt={ superhero } />
                </div>
                <div className='col-md-8'>
                    <div className='card-body'>
                        <h5 className='card-tittle'>{ superhero }</h5>
                        <p className='card-text'>{ alter_ego }</p>

                        {
                            ( alter_ego !== characters )
                            && <p className='card-text'>{ characters }</p>
                        }

                        <p className='card-text'>
                            <small className='text-muted'>{ first_appearance }</small>
                        </p>
                        <Link to={`./hero/${id}`}>
                            Mas...
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    )
}
