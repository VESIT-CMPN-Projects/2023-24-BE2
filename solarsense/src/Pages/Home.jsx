import React from 'react';
import Image from '../Resources/home_img.jpg'
import Image2 from '../Resources/home_img2.jpg'
import { Link } from 'react-router-dom';
import Image3 from '../Resources/Icon.png'

function Home() {
    return (
        <>

<nav class=" border-gray-200 bg-gray-800">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src ={Image3} width = '40px' ></img>
        <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">SolarSense</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-800 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 text-white dark:border-gray-700">
        <Link to='/'>
        <li>
          <a href="#" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
        </li>
        </Link>
        <Link to='/rooftop'>
        <li>
          <a href="#" class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Rooftop</a>
        </li>
        </Link>
        <Link to='/yield'>
        <li>
          <a href="#" class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Yield Prediction</a>
        </li>
        </Link>
        <Link to='/predictive'>
        <li>
          <a href="#" class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Predictive Maintenance</a>
        </li>
        </Link>
      </ul>
    </div>
  </div>
</nav>

<div class="container px-5 pt-10 mx-auto  h-full w-full dark:bg-dot-white/[0.2] bg-dot-lime-300/[0.4] ">
      <div class="container px-20 pt- mx-auto">
                <div class="flex flex-col text-center w-full mb-20">
                    <h1 className='text-7xl font-sans font-bold	text-lime-300 bg-clip-text text-transparent bg-gradient-to-b from-lime-200 to-lime-500'>Solar Sense</h1>
                    <h2 className='mt-2 text-slate-200 text-xl'>The smart solar system approach</h2>
                    <div className=' px-10   mt-10  '>
                        <img alt="ecommerce" class=" rounded-xl object-cover object-center w-full aspect-[3/1]" src={Image}></img>
                    </div>  
                </div>
      </div>

        <div class="container px-20 py-10 mx-auto">
          <div class="lg:w-4/ mx-auto flex flex-wrap">
            <div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h1 className='text-6xl font-bold text-slate-300 font-sans'> Our Motive</h1>
              <p className='text-2xl pt-9 text-slate-400 '>In light of these challenges, the development of a Smart Solar System that leverages advanced features becomes imperative. Our system aims to optimize solar energy utilization through <span className=' text-slate-300 underline decoration-sky-500'>data-driven methodologies</span>, <span className=' text-slate-300 underline decoration-lime-500'>integrating Power Generation Forecasting</span>, <span className=' text-slate-300 underline decoration-pink-500'>Predictive Maintenance of Solar Panels</span>, and <span className=' text-slate-300 underline decoration-lime-500'>Rooftop solar area analysis</span>.</p>
            </div>
            <img alt="ecommerce" class="lg:w-1/2 w-full aspect-[3/1] object-cover object-center rounded" src={Image2}/>
          </div>
        </div>
      </div>
      </>
    );
}

export default Home;
