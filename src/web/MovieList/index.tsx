import React from 'react';
import MovieList from '../../manager/MovieList/MovieList';
import HeaderWeb from '../../components/Header/HeaderWeb';

const MovieListWeb = () => {
  return (
    <div>
        <HeaderWeb />
        <div className='MovieListWeb'>
            <MovieList />
        </div>
    </div>
  )
}

export default MovieListWeb