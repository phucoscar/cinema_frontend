import React from 'react';
import Reviews from '../../manager/MovieList/Reviews';
import HeaderWeb from '../../components/Header/HeaderWeb';

const DetailMovie = () => {
    return (
        <div>
            <HeaderWeb />
            <div className='MovieListWeb'>
                <Reviews />
            </div>
        </div>
    )
}

export default DetailMovie