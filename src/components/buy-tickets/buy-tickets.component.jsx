import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { setTickets, setMovieID } from '../../redux/slices/ticketSlice';

import Countdown from 'react-countdown';
import { useNavigate } from 'react-router-dom';

import BackButton from '../back-button/back-button.component';

const BuyTickets = () => {
    const tickets = useSelector((state) => state.tickets.tickets);
    const movieID = useSelector((state) => state.tickets.movieID)
    const movies = useSelector((state) => state.movies.movies);

    const [totalPrice, setTotalPrice] = useState(0.00)
    const [adultTickets, setAdultTickets] = useState(0)
    const [discountTicket, setDiscountTicket] = useState(0)
    const [childrenTicket, setChildrenTicket] = useState(0)
    const [totalTickets, setTotalTickets] = useState(0)

    const [timerUp, setTimerUp] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const calculatePrice = () => {
        setTotalPrice((adultTickets * 22) + (discountTicket * 18) + (childrenTicket * 14))
    }

    const addTicket = (ticketClass) => {
        console.log(tickets)
        switch (ticketClass){
            case 'addAdultClass':
                if (totalTickets < tickets.length) {
                    setTotalTickets(totalTickets + 1)
                    setAdultTickets(adultTickets + 1)
                }
                break;
            case 'removeAdultClass':
                if (totalTickets >= 1 && adultTickets > 0) {
                    setTotalTickets(totalTickets - 1)
                    setAdultTickets(adultTickets - 1)
                }
                break;
            case 'addDiscountClass':
                if (totalTickets < tickets.length) {
                    setTotalTickets(totalTickets + 1)
                    setDiscountTicket(discountTicket + 1)
                }
                break;
            case 'removeDiscountClass':
                if (totalTickets >= 1 && discountTicket > 0) {
                    setTotalTickets(totalTickets - 1)
                    setDiscountTicket(discountTicket - 1)
                }
                
                break;
            case 'addChildrenClass':
                if (totalTickets < tickets.length) {
                    setTotalTickets(totalTickets + 1)
                    setChildrenTicket(childrenTicket + 1)
                }
                break;
            case 'removeChildrenClass':
                if (totalTickets >= 1 && childrenTicket > 0) {
                    setTotalTickets(totalTickets - 1)
                    setChildrenTicket(childrenTicket - 1)
                }
                
                break;
            default:
                return;
        }
    }

    const expiredSession = () => {
        dispatch(setTickets([]))
        dispatch(setMovieID(""))

        setTimerUp(false)
        navigate('/')
    }

    const checkoutTickets = () => {
        if (totalTickets === tickets.length){
            const requestBody = {
                tickets: tickets,
                movieID: parseInt(movieID) + 1,
                ticketClasses: [
                    {name: 'adult', quantity: adultTickets},
                    {name: 'discount', quantity: discountTicket},
                    {name: 'children', quantity: childrenTicket}
                ],
                selectedTickets: tickets
            };

            requestBody.ticketClasses = requestBody.ticketClasses.filter(item => item.quantity > 0);

            fetch(`${process.env.REACT_APP_BACKEND_URL}/create-checkout-session`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            }).then(res => {
                if (res.ok) return res.json()
                return res.json().then(json => Promise.reject(json))
            })
            .then(({ url }) => {
                window.location = url}
            ).catch(e => {
                console.error(e.error)
            })
        }
    }

    const cancelSeatReservation = () => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/canelReservation`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            movieID: parseInt(movieID) + 1,
            selectedTickets: tickets
          }),
        }).then(response => response.json())
          .then(data => {
            console.log(data)
          })

        setTimerUp(true)
    }

    useEffect(() => {
        calculatePrice()
    }, [adultTickets, discountTicket, childrenTicket])

    return (
        <>
            <div className='flex flex-col gap-y-4 mt-4'>
                <div className='flex flex-col gap-y-2 bg-blue-400 p-4 rounded-lg mx-4 text-white font-Roboto font-semibold'>
                    <div className='bg-white flex items-center justify-center px-2 rounded-2xl w-20'>
                        <a onClick={() => cancelSeatReservation()}><BackButton size={36} /></a>
                    </div>
                    <p className='text-2xl font-bold'>Choose your tickets:</p>
                    <p>Movie: {movies[movieID].title}</p>
                    <div className='flex flex-row'>
                        <p className=''>Selected places: {tickets.map(element => {return <p className='pl-2'>- {element}</p>})}</p>
                    </div>
                    <p>Total tickets: {totalTickets}</p>
                </div>

                <div className='flex flex-col gap-y-4 bg-blue-400 p-4 rounded-lg mx-4'>
                    <div className={`py-4 flex flex-col gap-y-4`}>
                        <div><p className='text-white font-bold text-xl'>Adult (18+) - 22 CHF</p></div>
                        <div className='flex flew-row gap-x-4 text-white font-bold text-xl items-center'>
                            <button className={`flex ${totalTickets >= tickets.length ? 'bg-gray-400' : 'bg-white'}  rounded-full w-10 h-10 text-blue-500 items-center justify-center`} onClick={() => addTicket('addAdultClass')}>+</button>
                            <p>{adultTickets}</p>
                            <button className='flex bg-white rounded-full w-10 h-10 text-blue-500 items-center justify-center' onClick={() => addTicket('removeAdultClass')}>-</button>
                        </div>
                    </div>
                    <div className='border-b-2 border-white'></div>
                    <div className={` py-4 flex flex-col gap-y-4`}>
                        <div><p className='text-white font-bold text-xl'>Discount (Students, IV & etc.) - 18 CHF</p></div>
                        <div className='flex flew-row gap-x-4 text-white font-bold text-xl items-center'>
                            <button className={`flex ${totalTickets >= tickets.length ? 'bg-gray-400' : 'bg-white'}  rounded-full w-10 h-10 text-blue-500 items-center justify-center`} onClick={() => addTicket('addDiscountClass')}>+</button>
                            <p>{discountTicket}</p>
                            <button className='flex bg-white rounded-full w-10 h-10 text-blue-500 items-center justify-center' onClick={() => addTicket('removeDiscountClass')}>-</button>
                        </div>
                    </div>
                    <div className='border-b-2 border-white'></div>
                    <div className={`py-4 flex flex-col gap-y-4`}>
                        <div><p className='text-white font-bold text-xl'>Childrens (4 - 16 years) - 14 CHF</p></div>
                        <div className='flex flew-row gap-x-4 text-white font-bold text-xl items-center'>
                            <button className={`flex ${totalTickets >= tickets.length ? 'bg-gray-400' : 'bg-white'}  rounded-full w-10 h-10 text-blue-500 items-center justify-center`} onClick={() => addTicket('addChildrenClass')}>+</button>
                            <p>{childrenTicket}</p>
                            <button className='flex bg-white rounded-full w-10 h-10 text-blue-500 items-center justify-center' onClick={() => addTicket('removeChildrenClass')}>-</button>
                        </div>
                    </div>
                </div>
                <div className='h-24 w-full'></div>
            </div>

            <div className='bottom-0 bg-blue-500 p-4 w-full flex flex-row items-center sticky'>
              <div className='flex flex-row w-full text-white font-bold text-xl items-center gap-x-6 ml-4'>
                <div className='flex flex-col lg:flex-row items-center gap-x-6'>
                    <p>Price: {totalPrice} CHF</p>
                    <button className={`${totalTickets === tickets.length ? 'bg-white' : 'bg-gray-400'} px-6 py-2 rounded-lg text-blue-600`} onClick={() => checkoutTickets()}>Buy Tickets</button>
                </div>
                <div className='text-right ml-auto pr-6'>
                    <p>Your tickets stay reserved for: </p>
                    <Countdown date={parseInt(localStorage.getItem('bookingTime'))} onComplete={() => cancelSeatReservation()} daysInHours={true}/>
                </div>
              </div>
            </div>

            {timerUp &&
                <div className='w-full h-full flex flex-col bg-black/75 absolute top-0 items-center justify-center'>
                    <div className='w-[70%] flex flex-col bg-white'>
                        <div className='px-6 py-4 items-center justify-center flex flex-col'>
                            <p className='text-3xl text-center font-extrabold text-blue-500'>Reservation expired</p>
                            <p className='text-center'>Your reservation has expired. You will be redirected to the home-page.</p>
                            <button className='px-6 py-2 mt-4 bg-blue-400 text-white font-bold rounded-lg drop-shadow-xl' onClick={() => expiredSession()}>Close</button>
                        </div>
                    </div>
                </div>
            }
        </>
        
    )
}

export default BuyTickets