import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'


import BackButton from '../back-button/back-button.component'

import logo from '../../assets/logo.webp'


const Movie = () => {
  const { id } = useParams()

  const movies = useSelector(
    (state) => state.movies.movies
  );

  useEffect(() => {
    console.log(movies)
  })

  return (
    <>
      <div className='flex flex-row w-full py-2 items-center bg-blue-800 bg-gradient-to-b from-blue-900 to-[#001455] border-b'>
        <img className='w-16 ml-4 mr-auto' src={logo} alt="" />
        <ul className='flex flex-row mr-6 gap-x-6 justify-center'>
          <li className='text-white text-center font-bold text-xl cursor-pointer'>Home</li>
          <li className='text-white text-center font-bold text-xl cursor-pointer'>Movies</li>
          <li className='text-white text-center font-bold text-xl cursor-pointer'>Profile</li>
        </ul>
      </div>

      <div className='flex flex-col w-full h-[50vh] overflow-y-hidden'>
        <div className='relative flex flex-col h-full w-full'>
          <img src={`https://picsum.photos/seed/${movies[id].title}/1920/500`} alt='Movie 1' className='absolute h-full w-full'/>
          <div className='bg-black/75 w-full h-full z-10 flex flex-col justify-center pl-14'>
            <div className='flex flex-row items-center gap-x-4'>
              <img src={`https://picsum.photos/seed/${movies[id].title}/200/300`} alt="" className='rounded-lg border-2'/>
              <div className='flex flex-col'>
                <p className='text-white text-3xl font-bold font-Roboto'>{movies[id].title}</p>
                <p className='text-white text-xl font-Roboto'>{movies[id].shortDescription}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col px-64 my-10'>
        <BackButton size={36}/>
        <div className='mt-4 font-Roboto'>
          <div>
            <h1 className='text-4xl font-bold'>{movies[id].title}</h1>
            <p className='mt-2'>{movies[id].longDescription}</p>
          </div>
          <div className='mt-6 text-sm font-light'>
            <p>Next showtime: {movies[id].date}</p>
            <p>Duration: {movies[id].duration} min</p>
            <p>Language: {movies[id].language}</p>
            <p>Age restriction: {movies[id].ageRestriction}</p>
          </div>
        </div>
        <Link to={'/movies/booking/'+ id}><button className='bg-blue-400 px-4 py-2 text-white rounded-xl mt-6 w-full'>Tickets kaufen</button></Link>
      </div>
    </>
  )
}

export default Movie