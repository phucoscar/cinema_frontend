import React from 'react';
import Header from '../components/Header/Header';
import Siderbar from '../components/Siderbar/Siderbar';
import { Route, Routes } from 'react-router-dom';

import TheaterList from './TheaterList/TheaterList';
import AdminAccounts from './AdminAccounts/AdminAccounts';
import GuestAccounts from './GuestAccounts/GuestAccounts';
import CreateAccount from './CreateAccount/CreateAccount';
import CreateTheater from './CreateTheater/CreateTheater';
import MovieList from '../manager/MovieList/MovieList';
import UpdateMovie from '../manager/MovieList/UpdateMovie';
import CreateMovie from '../manager/CreateMovie/CreateMovie';
import UpdateInfor from '../components/PersonalInformation/UpdateInfor';
import Reviews from '../manager/MovieList/Reviews';

const Admin = () => {
  return (
    <div className='manager'>
      <Header />
      <div>
        <Siderbar />
        <div className="content">
          <Routes>
            <Route path="/theater-list" element={<TheaterList />} />
            <Route path="/admin-accounts" element={<AdminAccounts />} />
            <Route path="/guest-accounts" element={<GuestAccounts />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/create-theater" element={<CreateTheater />} />

            <Route path="/movie-list" element={<MovieList />} />
            <Route path="/movie-list/:id" element={<Reviews />} />
            <Route path="/movie-list/update/:id" element={<UpdateMovie />} />

            <Route path="/create-movies" element={<CreateMovie />} />
            
            <Route path="/update-information" element={<UpdateInfor />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Admin