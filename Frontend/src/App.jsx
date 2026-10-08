import { useState } from "react";
import axios from "axios";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [medInc, setMedInc] = useState("");
  const [houseAge, setHouseAge] = useState("");
  const [aveRooms, setAveRooms] = useState("");
  const [aveBedrms, setAveBedrms] = useState("");
  const [population, setPopulation] = useState("");
  const [aveOccup, setAveOccup] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [prediction, setPrediction] = useState(null);

  const predictPrice = async () => {
    const response = await axios.post("https://house-price-predictor-1-2s06.onrender.com/api/predict", {
      features: [
        Number(medInc),
        Number(houseAge),
        Number(aveRooms),
        Number(aveBedrms),
        Number(population),
        Number(aveOccup),
        Number(latitude),
        Number(longitude),
      ],
    });

    setPrediction(response.data.predicted_price);
  };

  useEffect(() => {
    console.log(prediction);
  }, [prediction]);

  return (
  <div className="app">
    <div className="card">
      <div className="header">
        <span className="badge">ML PREDICTOR</span>
        <h1>House Price Predictor</h1>
        <p>
          Enter property details to estimate its market value.
        </p>
      </div>

      <div className="form-grid">
        <div className="input-group">
          <label>Median Income</label>
          <input
            type="number"
            value={medInc}
            onChange={(e) => setMedInc(e.target.value)}
            placeholder="8.3252"
          />
        </div>

        <div className="input-group">
          <label>House Age</label>
          <input
            type="number"
            value={houseAge}
            onChange={(e) => setHouseAge(e.target.value)}
            placeholder="41"
          />
        </div>

        <div className="input-group">
          <label>Average Rooms</label>
          <input
            type="number"
            value={aveRooms}
            onChange={(e) => setAveRooms(e.target.value)}
            placeholder="6.98"
          />
        </div>

        <div className="input-group">
          <label>Average Bedrooms</label>
          <input
            type="number"
            value={aveBedrms}
            onChange={(e) => setAveBedrms(e.target.value)}
            placeholder="1.02"
          />
        </div>

        <div className="input-group">
          <label>Population</label>
          <input
            type="number"
            value={population}
            onChange={(e) => setPopulation(e.target.value)}
            placeholder="322"
          />
        </div>

        <div className="input-group">
          <label>Average Occupancy</label>
          <input
            type="number"
            value={aveOccup}
            onChange={(e) => setAveOccup(e.target.value)}
            placeholder="2.55"
          />
        </div>

        <div className="input-group">
          <label>Latitude</label>
          <input
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="37.88"
          />
        </div>

        <div className="input-group">
          <label>Longitude</label>
          <input
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="-122.23"
          />
        </div>
      </div>

      <button className="predict-btn" onClick={predictPrice}>
        Predict House Price
        <span>→</span>
      </button>

      {prediction !== null && (
        <div className="result">
          <span>Estimated Value</span>
          <h2>${(prediction * 100000).toLocaleString()}</h2>
          <p>Predicted using your trained ML model</p>
        </div>
      )}
    </div>
  </div>
);
}

export default App;
