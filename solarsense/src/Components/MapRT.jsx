import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, Marker, TileLayer, FeatureGroup, Popup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import geolib from 'geolib';
import '@turf/turf'; // Import the turf library
import L from 'leaflet';

function MapRT() {
  const mapRef = useRef();
  const featureGroupRef = useRef();
  const [area, setArea] = useState(0);
  const [totalPotential, setTotalPotential] = useState(0);
  const [totalSystemCost,setTotalSystemCost] = useState(0);
  const [solarEfficiency, setSolarEfficiency] = useState(0.2);
  const [costPerWatt, setCostPerWatt] = useState(30);

  const onCreated = (e) => {
    const { layerType, layer } = e;
    if (layerType === 'polygon') {
      const coordinates = layer.getLatLngs()[0].map((latLng) => [latLng.lat, latLng.lng]);
      const polygon = L.polygon(coordinates);
      const areaInSquareMeters = L.GeometryUtil.geodesicArea(polygon.getLatLngs()[0]);
      const areaInSquareMetersFormatted = L.GeometryUtil.readableArea(areaInSquareMeters, true);

      layer.area = areaInSquareMetersFormatted;

      layer.bindPopup(`Area: ${areaInSquareMetersFormatted}`).openPopup();

      const result = calc_total_power_generation_potential(Number(areaInSquareMetersFormatted.split(" ")[0]));
      
        setTotalPotential(result);
    console.log(totalPotential)
      console.log("total power generation potential : "+result)
      const total_cost = calc_total_system_cost(result);
      setTotalSystemCost(total_cost)
      console.log("energy saving : "+ total_cost)
    }
  };

  const calc_total_power_generation_potential = (num) =>{
    const result = (num * solarEfficiency * 5.16 );
    setTotalPotential(result);
    return result;
  }

  const calc_total_system_cost = (num) =>{
    // cost_without_solar = electricity_bill
    // const cost_without_solar = costPerWatt;

    // const cost_per_unit
    // # Calculate the cost of electricity with solar
    // cost_with_solar = total_solar_power * cost_per_unit
    const cost_with_solar = num * costPerWatt;
    // # Calculate the percentage of savings
    // percentage_savings = ((cost_without_solar - cost_with_solar) / cost_without_solar) * 100
    // const percentage_savings = ((cost_with_solar) / cost_without_solar) * 100;
    setTotalSystemCost(cost_with_solar)
    return cost_with_solar

  }

  const handleSolarEfficiencyChange = (event) => {
    setSolarEfficiency(event.target.value);
  };

  const handleCostPerWattChange = (event) => {
    setCostPerWatt(event.target.value);
  };

  return (
    <>
    <form>
    <div class="grid gap-6 mb-6 md:grid-cols-2 my-10">
        <div>
            <label for="first_name"  class="block mb-2 text-start text-2xl font-medium text-white dark:text-white">Solar Panel Efficiency</label>
            <input type="number"
          id="solarEfficiency" value={solarEfficiency}
          onChange={handleSolarEfficiencyChange} class="bg-gray-50 border border-gray-300 text-gray-900 text- rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required/>
        </div>
        <div>
        <label for="first_name"  class="block mb-2 text-start text-2xl font-medium text-white dark:text-white">Cost Per Watt</label>
            <input type="number"
          id="electricityBill" value={costPerWatt}
          onChange={handleCostPerWattChange} class="bg-gray-50 border border-gray-300 text-gray-900 text- rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required/>
        </div>
      </div>
    </form>
    
     {/* <h1 className='text-white'>{totalPotential}</h1> */}
    <MapContainer
      center={[19.0760, 72.8777]}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
      whenCreated={(map) => {
        mapRef.current = map;
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FeatureGroup ref={featureGroupRef}>
        <EditControl
          position="topright"
          onCreated={onCreated}
          onEdited={onCreated}
          draw={{
            marker: false,
            polyline: false,
            rectangle: false,
            circle: false,
            circlemarker: false,
            polygon: {
              allowIntersection: false,
              showArea: true,
            },
          }}
        />
      </FeatureGroup>
      {/* {area && (
        <Popup position={[51.505, 10.09]}>
          Area: {area} square meters
        </Popup>
      )} */}
    </MapContainer>
    
    <section class="text-gray-600 body-font">
  <div class="container px- py-10 mx-auto">
    <div class="flex flex-wrap -m-4">
      <div class="p-4 lg:w-1/3">
        <div class="h-full bg-lime-300 bg-opacity-75 px- pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
          
          <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">Total Power Generation Potential</h1>
          <h1 className='text-4xl font-bold'>{totalPotential.toFixed(3)} w</h1>
          
          
        </div>
      </div>
      
      <div class="p-4 lg:w-1/3">
        <div class="h-full bg-lime-300 bg-opacity-75 px- pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
          
          <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">Total System Cost</h1>
          
          <h1 className='text-4xl font-bold mt-10'>₹ {(totalSystemCost.toFixed(3) * 1000).toLocaleString("en-IN")}</h1>
          
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  );
}

export default MapRT;
