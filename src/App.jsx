import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './App.css';

const API_KEY = 'live_EzqUa37GhtUx5S8w9JgR7rjACusYq2YExNaa7bo66PZVmoYXeVQPSJfD1GSltSkp';
const API_URL = `https://api.thedogapi.com/v1/images/search?limit=1&api_key=${API_KEY}`;

function App() {
  const [currentImg, setCurrentImg] = useState('');
  const [label, setLabel] = useState('');
  const [lifeLabel, setLifeLabel] = useState('');
  const [country, setCountry] = useState('');
  const [banlist, setBanlist] = useState([]);

  useEffect(() => {
    callAPI();
  }, []);

  const callAPI = async () => {
    try {
      const response = await axios.get(API_URL);
      if (!response.data.length) {
        throw new Error('Failed to fetch image');
      }
      const data = response.data[0];
      setCurrentImg(data.url);
      setLabel(data.breeds[0].name);
      setLifeLabel(data.breeds[0].life_span);
      setCountry(data.breeds[0].origin); // Assuming the API provides the country information
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  const handleImg = () => {
    callAPI();
    console.log(banlist);
  };

  const handleBan = (breedName) => {
    setBanlist([...banlist, breedName]);
  };

  return (
    <div className='App'>
      <button onClick={handleImg} className="discover-button">Discover 🐾</button>

      <div className='container'>
        <div className="image-container">
          <img src={currentImg} alt="Random Dog" />
        </div>
      </div>

      <div className='button-container'>
        <button onClick={() => handleBan(label)} className="dog-button">{label}</button>
        <button onClick={() => handleBan(lifeLabel)} className="dog-button">{lifeLabel}</button>
        {country && <button onClick={() => handleBan(country)} className="dog-button">{country}</button>}
      </div>

      <div className='banList'>
        <h3>Ban List</h3>
        {banlist.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </div>
  );
}

export default App;