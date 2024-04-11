// import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
// import { useMemo } from "react";
import "./App.css";
import Home from "./Pages/Home";
import Model from "./Pages/Model";
import Roooftop from "./Pages/Rooftop";
import Predictive from "./Pages/Predictive";
import { Route, Router, Routes } from "react-router-dom";

function App() {
  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: "AIzaSyAFdRkzETleXMlm96_ADsfsJN8a4v-odlU",
  // });
  // const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);
  return (
    <div className="bg-slate-900">
      
      {/* <Navbar className="sticky top-0" /> */}
      <Routes>
        <Route path="/" Component={Home}></Route>
        <Route path="/rooftop" Component={Roooftop}></Route>
        <Route path="/yield" Component={Model}></Route>
        <Route path="/predictive" Component={Predictive}></Route>
        {/* <Route path="/contactus" Component={Contact}></Route> */}
        {/* <Route path="/individualproj" Component={IndividualProj}></Route> */}
      </Routes>
      {/* <Footer /> */}
      {/* <Home></Home> */}
    </div>
  );
}

export default App;
