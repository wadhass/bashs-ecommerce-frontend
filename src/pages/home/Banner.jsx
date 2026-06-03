import React from 'react'
import { Link } from 'react-router-dom'

import bannerImg from '../../assets/header.png'

const Banner = () => {
  return (
    <div className='section__container header__container'>
        <div className='header__content z-30'>
            <h4 className='uppercase'>Up to 20% Discount on</h4>
            <h1>Girl's Fashion</h1>
            <p>Discover the latest trends and express your unique style with our women's Fashion
                webside. Explore curated collections, shop the hottest looks, and find your perfect outfit for any occasion.
            </p>
            <button className='btn'><Link to="/shop">EXPLORE NOW</Link></button>
        </div>
        <div className='header__image'>
            <img src={bannerImg} alt="banner image" />
        </div>
    </div>
  )
}

export default Banner