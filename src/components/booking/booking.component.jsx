import React, { useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setTickets, setMovieID } from '../../redux/slices/ticketSlice';

import { ReactComponent as FreeSeat } from '../../assets/seats/seatFree.svg';
import { ReactComponent as BookedSeat } from '../../assets/seats/seatBooked.svg';
import { ReactComponent as SelectedSeat } from '../../assets/seats/seatSelected.svg';

import BackButton from '../back-button/back-button.component';

const Booking = () => {
    const { id } = useParams();

    const movies = useSelector((state) => state.movies.movies);
    const halls = useSelector((state) => state.halls.halls);

    const dispatch = useDispatch();

    const [selectedSeats, setSelectedSeats] = useState([]);
    
    const seatsDiv = useRef(null)

    const movie = movies[id];
    const hall = halls[movie.hall]; // Get the hall information for the current movie

    const selectSeat = (seat) => {
        if (!movie['bookedSeats'].includes(seat)) { // Check if the seat is not booked
            if (selectedSeats.includes(seat)) {
                setSelectedSeats(selectedSeats.filter(s => s !== seat));
            } else {
                setSelectedSeats([...selectedSeats, seat]);
            }
        }
    };

    const sendSeatReservation = () => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/bookSeats`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          movieID: parseInt(id) + 1 , 
          selectedTickets: selectedSeats 
        }),
      }).then(response => response.json())
        .then(data => {
          console.log(data)
        })
    }

    const addTicketsToCart = () => {
      dispatch(setTickets(selectedSeats))
      dispatch(setMovieID(id))
      localStorage.setItem('bookingTime', parseInt(Date.now()) + 600000)
      sendSeatReservation()
    }

    return (
        <>
            <div className='flex flex-col h-screen'>
              <div className='flex flex-row items-center bg-blue-500 text-white p-4 gap-x-6'>
                <div className='bg-white flex items-center justify-center px-2 rounded-2xl'>
                  <BackButton size={36}/>
                </div>
                <div>
                  <p className='font-extrabold text-2xl'>Booking for: <span className='font-bold text-xl'>{movie.title}</span></p>
                </div>
              </div>
              <div className='flex flex-col items-center justify-center h-full mb-20'>
                <p className='text-blue-500 text-4xl lg:text-5xl font-Roboto font-extrabold mb-12 text-center'>Choose your seats</p>
                <div className='p-4 lg:p-6 border-blue-400 border-2 rounded-xl'>
                  {hall.seats.map((row, rowIndex) => (
                      <div ref={seatsDiv} key={rowIndex} className='flex flex-row gap-x-2 mb-2 justify-center items-center'>
                          {row.map((seat, seatIndex) => {
                              if (seat === "empty") {
                                  return <div key={seatIndex} className='w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14'></div>;
                              } else if (seat === "emptyRow") {
                                  return <div key={seatIndex} className='w-full h-2'></div>; // Adjusted for an empty row
                              } else {
                                  const isBooked = movie['bookedSeats'].includes(seat);
                                  const isSelected = selectedSeats.includes(seat);
                                  return (
                                      <div key={seatIndex} className={`w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14 cursor-pointer`} onClick={() => selectSeat(seat)}>
                                          {isBooked ? <BookedSeat /> : isSelected ? <SelectedSeat /> : <FreeSeat />}
                                      </div>
                                  );
                              }
                          })}
                      </div>
                  ))}
                  <div className='flex flex-col items-center justify-center'>
                    <div className={`flex h-5 bg-blue-400 rounded-xl items-center justify-center w-full`}><p className='text-center text-white font-bold'>Screen</p></div>
                  </div>
                </div>
              </div>

              <div className='absolute bottom-0 bg-blue-500 h-20 w-full flex flex-row items-center'>
                <div className='flex flex-row w-full text-white font-bold text-xl items-center gap-x-6 ml-4'>
                  <p>Selected seats: {selectedSeats.length}</p>
                  <button className='bg-white px-6 py-2 rounded-lg text-blue-600' onClick={addTicketsToCart}><Link to={'/checkout'}>Book Tickets</Link></button>
                </div>
              </div>
            </div>
        </>
    );
}

export default Booking;
