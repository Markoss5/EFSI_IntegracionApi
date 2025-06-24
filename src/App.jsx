import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [busqueda, setBusqueda] = useState('');
  const [ciudad, setCiudad] = useState('Buenos Aires');
  const [clima, setClima] = useState(null);

  useEffect(() => {
    const obtenerClima = async () => {
      if (ciudad === '') return;

      try {
        const apiKey = 'de21b6bb7e9b1368f19ddf680a11a840'; // ← reemplazá esto por tu clave real
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;

        const respuesta = await axios.get(url);
        setClima(respuesta.data);
      } catch (error) {
        console.error('Error al obtener el clima:', error);
        setClima(null);
      }
    };

    obtenerClima();
  }, [ciudad]);

  return (
    <div className="container">
      <h1>Consulta del Clima</h1>

      <input
        type="text"
        placeholder="Escribe una ciudad"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <button onClick={() => setCiudad(busqueda)}>Buscar</button>

      {clima ? (
        <div className="resultado">
          <h2>{clima.name}</h2>
          <p>🌡️ Temperatura: {clima.main.temp}°C</p>
          <p>☁️ Clima: {clima.weather[0].description}</p>
          <p>💧 Humedad: {clima.main.humidity}%</p>
        </div>
      ) : (
        <p>No hay datos disponibles.</p>
      )}
    </div>
  );
}

export default App;
