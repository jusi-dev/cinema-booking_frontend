import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setMovies } from './redux/slices/moviesSlice';
import { setHalls } from './redux/slices/hallsSlice'

import Navigation from './components/navigation/navigation';
import Home from './components/home/home';
import Movies from './components/movies/movies';
import Movie from './components/movie/movie';
import Profile from './components/profile/profile';
import NotFound from './components/notfound/notfound';
import Booking from './components/booking/booking.component';

import hallsData from './testAPI/halls.json'
import BuyTickets from './components/buy-tickets/buy-tickets.component';

const App = () => {
  const dispatch = useDispatch();
  const [firstLoad, setFirstLoad] = useState(true);

  const fetchMovies = async () => {
    fetch('http://localhost:4040/getMovies', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
      }).then(response => response.json())
      .then(data => {
        console.log(data)
        dispatch(setMovies(data));
      })
    }

  const fetchHalls = () => {
    dispatch(setHalls(hallsData))
  }

  useEffect(() => {
    if (firstLoad) {
      fetchMovies();
      fetchHalls();
      setFirstLoad(false);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />} />
      <Route index element={<Home />} />
      <Route path="movies" element={<Movies />} />
      <Route path="movies/:id" element={<Movie />} />
      <Route path="profile" element={<Profile />} />
      <Route path="movies/booking/:id" element={<Booking />} />
      <Route path="checkout" element={<BuyTickets />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
