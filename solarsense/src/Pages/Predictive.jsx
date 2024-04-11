import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Predictive() {
  const [file, setFile] = useState(null);
  const [result,setResult] = useState(null)
  const [bool,setBool] = useState(false)

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:8000/predictive/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data.result)
      setBool(true)
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
      // Display error message to the user
    }
  };
  
  return (
    <>
    <nav class=" border-gray-200 bg-gray-800">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
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
          <a href="#" class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" >Home</a>
        </li>
        </Link>
        <Link to='/rooftop'>
        <li>
          <a href="#" class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" aria-current="page">Rooftop</a>
        </li>
        </Link>
        <Link to='/yield'>
        <li>
          <a href="#" class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Yield Prediction</a>
        </li>
        </Link>
        <Link to='/predictive'>
        <li>
          <a href="#" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">Predictive Maintenance</a>
        </li>
        </Link>
      </ul>
    </div>
  </div>
</nav>

<div class="container px-20 pt-10 mx-auto   h-[91vh] w-full   dark:bg-dot-white/[0.2] bg-dot-lime-300/[0.4] ">
<div class="container px-5 pt-10 mx-auto">
            <div class="flex flex-col text-center w-full mb-20">
                <h1 className='text-7xl font-sans font-bold	text-lime-300 bg-clip-text text-transparent bg-gradient-to-b from-lime-200 to-lime-500'>Predictive Maintenance</h1>
            </div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
<input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" 
type="file"  onChange={handleFileChange}></input>
      <button onClick={handleUpload} className='text-white mx-auto p-3 mt-5 w-96 rounded-md text-xl font-bold text-black bg-lime-300' >Predict</button>
      
      {
        bool && <p className='text-3xl font-bold text-white p-3'>Prediction : {result}</p>
    }
        </div>
</div>
    
    
    </>
  )
}
