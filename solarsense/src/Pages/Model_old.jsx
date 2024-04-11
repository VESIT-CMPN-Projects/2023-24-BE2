import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Model() {
    const [ambientTemperature,setAmbientTemperature] = useState(null);
    const [moduleTemperature,setModuleTemperature] = useState(null);
    const[irradiation,setIrradiation] = useState(null);
    const[timeCategoryEncoded,setTimeCategoryEncoded] = useState(0);
    const[TCEvalue,setTCEvalue] = useState('morning');
    const[result,setResult] = useState(0);
    const[bool,setBool] = useState(false)

    const handleAmbientTemperature = (event) => {
      setAmbientTemperature(event.target.value);
      };

      const handleModuleTemperature = (event) => {
        setModuleTemperature(event.target.value);
      };

      const handleIrradiation = (event) =>{
        setIrradiation(event.target.value);
      }

      const handleTimeCategoryEncoded = (event) =>{
        if(event.target.value === 'morning'){
          setTimeCategoryEncoded(0);
        }
        else if(event.target.value === 'afternoon'){
          setTimeCategoryEncoded(1);
        }
        else if(event.target.value === 'evening'){
          setTimeCategoryEncoded(2);
        }
        else{
          setTimeCategoryEncoded(3);
        }
        setTCEvalue(event.target.value);
      }


      const postData = async (event) => {
        event.preventDefault();
        console.log(JSON.stringify({
            // Your POST data here
            'ambient_temperature': ambientTemperature,
  'module_temperature': moduleTemperature,
  'irradiation': irradiation,
  'time_category_encoded': timeCategoryEncoded,
          }))
        try {
          const response = await fetch('http://localhost:8000/predict/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Adjust the content type if needed
            },
            body: JSON.stringify({
              'ambient_temperature': ambientTemperature,
              'module_temperature': moduleTemperature,
              'irradiation': irradiation,
              'time_category_encoded': timeCategoryEncoded,
              }),
          });
          console.log(response)
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const jsonData = await response.json();
          setResult(jsonData.predicted_solar_power_kW)
          setBool(true)
          console.log(jsonData.predicted_solar_power_kW)
        //   setData(jsonData);
        } catch (error) {
          console.error('Error posting data:', error);
        }
      };

  return (
    <>
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">SolarSense</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <Link to='/'>
        <li>
          <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" aria-current="page">Home</a>
        </li>
        </Link>
        <Link to='/rooftop'>
        <li>
          <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Rooftop</a>
        </li>
        </Link>
        <Link to='/predictive'>
        <li>
          <a href="#" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">Yield Prediction</a>
        </li>
        </Link>
        <Link to='/predictive'>
        <li>
          <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Predictive Maintenance</a>
        </li>
        </Link>
      </ul>
    </div>
  </div>
</nav>
    
    <section class="text-gray-600 body-font">
        <div class="container px-5 pt-10 mx-auto">
            <div class="flex flex-col text-center w-full mb-20">
                <h1 className='text-7xl font-sans font-bold	text-lime-300'>Yield Prediction</h1>
                <form>
    <div class="grid gap-6 mb-6 md:grid-cols-2 my-10">
        <div>
            <label for="first_name"  class="block mb-2 text-start text-2xl font-medium text-white dark:text-white">Ambient Temperature</label>
            <input type="number"
          id="ambientTemperature" value={ambientTemperature}
          onChange={handleAmbientTemperature} class="bg-gray-50 border border-gray-300 text-gray-900 text- rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="(in Celcius)" required/>
        </div>
        <div>
        <label for="first_name"  class="block mb-2 text-start text-2xl font-medium text-white dark:text-white">Module Temperature</label>
            <input type="number"
          id="moduleTemperature" value={moduleTemperature}
          onChange={handleModuleTemperature} class="bg-gray-50 border border-gray-300 text-gray-900 text- rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="(in Celcius)" required/>
        </div>
        <div>
            <label for="first_name"  class="block mb-2 text-start text-2xl font-medium text-white dark:text-white">Irradiation</label>
            <input type="number"
          id="irradiation" value={irradiation}
          onChange={handleIrradiation} class="bg-gray-50 border border-gray-300 text-gray-900 text- rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="(Watts per square meter)" required/>
        </div>
        <div>
        <label for="first_name"  class="block mb-2 text-start text-2xl font-medium text-white dark:text-white">Time Category</label>
            {/* <input type="number"
          id="timeCategoryEncoded" value={timeCategoryEncoded}
          onChange={handleTimeCategoryEncoded} class="bg-gray-50 border border-gray-300 text-gray-900 text- rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required/> */}
          <select value={TCEvalue} onChange={handleTimeCategoryEncoded} class="bg-gray-50 border border-gray-300 text-gray-900 text- rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

<option value="morning">Morning</option>
<option value="afternoon">Afternoon</option>
 <option value="evening">Evening</option>
<option value="night">Night</option>

</select>
        </div>

        

        
        

      </div>

    </form>
    <button onClick={postData} className='text-white mx-auto p-3 w-96 rounded-md text-xl font-bold text-black bg-lime-300' >Predict</button>

    {
        bool && <p className='text-3xl font-bold text-white p-3'>Generated Solar Power is : {result.toFixed(3)} Watts</p>
    }
            </div>
            </div>
    </section>
    </>
  )
}
