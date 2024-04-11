import React, { useState } from 'react';
import { useEffect } from 'react';
import L from 'leaflet';

const Map = () => {
  const [map, setMap] = useState();

  useEffect(() => {
    const map = L.map('map', {
      center: [37.7833, -122.4167],
      zoom: 13,
      // onClick={this.handleClick}
    });

    // Add a basemap layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    setMap(map);

    return () => {
      map.remove();
    };
  }, []);

  const [points, setPoints] = useState([]);
  const [polygon, setPolygon] = useState(null);

  const addPoint = (e) => {
    const point = e.latlng;

    setPoints((prevPoints) => [...prevPoints, point]);
  };

  const startDrawingPolygon = () => {
    setPolygon(new L.Polygon([]));
  };

  const drawPolygon = (e) => {
    const point = e.latlng;

    polygon.addLatLng(point);

    setPolygon(polygon);
  };

  const finishDrawingPolygon = () => {
    if (polygon.getLatLngs().length > 3) {
      map.addLayer(polygon);

      polygon.addTo(map);
    }

    setPolygon(null);
  };

  const getAreaOfPolygon = () => {
    if (polygon) {
      const area = L.Geometry.area(polygon);

      return area;
    }

    return 0;
  };

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '500px' }}></div>

      <button onClick={addPoint}>Add Point</button>
      <button onClick={startDrawingPolygon}>Start Drawing Polygon</button>
      <button onClick={finishDrawingPolygon}>Finish Drawing Polygon</button>

      <p>Area of polygon: {getAreaOfPolygon()}</p>
    </div>
  );
};

export default Map;