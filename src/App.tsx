import { Route, Routes } from 'react-router-dom';
import './App.css';

//import layout
import Admin from './admin';
import Manager from './manager';
import Web from './web/Home';
import DashBoard from './web/DashBoard';
import Showtimes from './web/Showtimes';
import ChooseSeats from './web/ChooseSeats/ChooseSeats';
import PaymentSuccess from './web/PaymentSuccess';
import Form from './components/FormLogin';
import ForgotPassword from './components/FormLogin/ForgotPassword';
import Register from './components/FormLogin/Register';
import NotFound from './components/NotFound';
import MovieListWeb from './web/MovieList';

//
import { AuthContext } from './contexts/AuthContext';
import MessageContext from './contexts/MessageContext';
import MoviesContext from './contexts/Movies';

import ProtectedMain from './routes/ProtectedRoute';
import DetailMovie from './web/MovieList/DetailMovie';
import BookingHistory from './web/BookingHistory';

function App() {
  return (
    <div className="App">
      <AuthContext>
        <MessageContext>
          <MoviesContext>
            <Routes>
              <Route element={<ProtectedMain />}>
                <Route path="super-admin/*" element={<Admin />} />
                <Route path="admin/*" element={<Manager />} />
                <Route path="/update-information" element={<DashBoard />} />
                <Route path="/not-found" element={<NotFound />} />
                <Route path="/showtimes/:id/choose-seats/:scheduleId" element={<ChooseSeats />} />
                <Route path="/payment-success/*" element={<PaymentSuccess />} />
              </Route>
              <Route path="/" element={<Web />} />
              <Route path="/showtimes" element={<Showtimes />} />
              <Route path="/showtimes/:id" element={<Showtimes />} />
              <Route path="/movie-list" element={<MovieListWeb />} />
              <Route path="/movie-list/:id" element={<DetailMovie />} />
              <Route path="/login" element={<Form />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/register" element={<Register />} />
              <Route path="/booking-history" element={<BookingHistory />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </MoviesContext>
        </MessageContext>
      </AuthContext>
    </div>
  );
}

export default App;
