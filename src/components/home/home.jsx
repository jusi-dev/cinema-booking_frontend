import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import logo from '../../assets/logo.webp'
import heroVid from '../../assets/hero.mp4'


const Home = () => {


  const movies = useSelector(
    (state) => state.movies.movies
  );

  const navigate = useNavigate();

  return (
    <>
      <div className='flex flex-row w-full py-2 items-center bg-blue-800 bg-gradient-to-b from-blue-900 to-[#001455] border-b'>
        <Link to={'/'} className='mr-auto'><img className='w-16 ml-4' src={logo} alt="logo" /></Link>
        <ul className='flex flex-row mr-6 gap-x-6 justify-center'>
          <li className='text-white text-center font-bold text-xl cursor-pointer'>Home</li>
          <li className='text-white text-center font-bold text-xl cursor-pointer'>Movies</li>
          <li className='text-white text-center font-bold text-xl cursor-pointer'>Profile</li>
        </ul>
      </div>

      <div className="flex flex-col w-full h-[80vh]">
        <div className='flex flex-col w-full h-full relative'>
          <video className='z-0 w-auto lg:min-w-full lg:max-h-[100%] min-h-full absolute object-cover' autoPlay={true} loop muted={true} controls={false}>
            <source src={heroVid} type='video/mp4' />
          </video>
          <div className='flex flex-col justify-center h-full mb-20 z-10 bg-black/50'>
            <h1 className='text-5xl md:text-7xl lg:text-8xl font-extrabold text-white text-center font-Roboto'>Welcome to the  
              <span className='bg-gradient-to-b from-white from-10% to-[#0052d5] text-transparent bg-clip-text'> most <br className='hidden lg:block'/>futuristic cinema </span> 
              in the world
            </h1>
            <p className='text-white font-bold text-xl text-center italic mt-2 lg:mt-0'>With over 15 locations in Switzerland</p>
          </div>
        </div>
      </div>

      <div className='flex flex-col bg-[#001455] text-white border-t p-12'>
        <div className='text-3xl text-center'>
          <h1 className='font-bold text-4xl italic'>"Watch exciting movies with your friends"</h1>
        </div>
        <div className='mt-8'>
          <h3 className='text-center text-2xl font-extrabold underline underline-offset-4'>Our program today</h3>
            <div className='flex gap-x-2 flex-1 flex-wrap lg:flex-nowrap justify-center lg:justify-start mt-4 lg:overflow-x-scroll'>
              { movies ? Object.keys(movies).map((movie, index) => {
                return(
                  <div className='flex flex-col items-center justify-center py-6 min-w-[300px] mt-2 text-gray-300 hover:text-white' key={index} onClick={() => navigate('movies/' + movie)}>
                    <div className='rounded border-2 border-white overflow-hidden cursor-pointer'>
                      <img src={`https://picsum.photos/seed/${movies[movie].title}/200/300`} className=' hover:scale-[110%] transition-all ease-in-out' alt='Movie 1' />
                    </div>
                    <h4 className='mt-2 font-semibold'>{movies[movie].title}</h4>
                  </div>
                )
              }) : <p>Loading...</p>}
            </div>
        </div>
      </div>

      <div className='footer'>
        <div className='flex flex-row w-full py-2 items-center bg-[#12204e] border-t px-10'>
          <ul className='flex flex-row ml-6 gap-x-6 justify-center'>
            <li className='text-white text-center font-bold text-xl cursor-pointer'>Home</li>
            <li className='text-white text-center font-bold text-xl cursor-pointer'>Movies</li>
            <li className='text-white text-center font-bold text-xl cursor-pointer'>Profile</li>
          </ul>
          <img className='w-16 mr-4 ml-auto' src={logo} alt="" />
        </div>
      </div>
    </>
  )
}

export default Home