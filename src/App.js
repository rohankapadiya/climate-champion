import React, { useState } from "react";
import axios from "axios";

function App() {

  const [data,setData] = useState({});
  const [location,setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=ba073c8406fffb3f049adcc08c12ef8f`;

  const searchLocation = (e) => {
    if(e.key === 'Enter'){
        axios.get(url).then((response)=>{
          setData(response.data);
          console.log(response);
        }).catch(()=>{
          console.log('Nothing here');
        })
        setLocation('')
    }
  }
  return (
    <div className="app">
        <div className="search">
          <input 
          onChange={event => setLocation(event.target.value)}
          onKeyUp={searchLocation}
          placeholder="Enter location"
          type="text"/>
        </div>

      <div className="container">
        
      {data.name != undefined &&
        <div className="top">
          <div className="location">
            <p>{data.name}, {data.sys ? data.sys.country : null}</p>
          </div>
          <div className="temprature">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
          {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        }

        {data.name != undefined &&
     <div className="bottom">
     <div className="feels-like">
         {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°C</p>: null} 
         <p>Feels like</p>
       </div>
       <div className="humidity">
         <p className="bold">{data.main ? data.main.humidity : null}%</p>
         <p>Humidity</p>
       </div>
       <div className="wind">
         <p className="bold">{data.wind ? (data.wind.speed * 3.6).toFixed() : null} KMH</p>
         <p>Wind Speed</p>
       </div>
     </div>
  
  }
       </div> 
    </div>
  );
}

export default App;
