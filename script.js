const API_KEY = '650373f8096d7274765290a0dd9e9762';


function consultarClimaActual() {
  const ciudad = document.getElementById('ciudad').value;
  if (!ciudad) {
    alert('Por favor, ingresa una ciudad.');
    return;
  }
  
  axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
    params: {
      q: ciudad,
      appid: API_KEY,
      lang: 'es',
      units: 'metric'
    }
  })
  .then(response => {
    mostrarClimaActual(response.data);
  })
  .catch(error => {
    console.error('Error al consultar el clima actual:', error);
    alert('No se pudo obtener la información del clima.');
  });
}

// Función para consultar el pronóstico de los próximos 5 días
function consultarPronostico() {
  const ciudad = document.getElementById('ciudad').value;
  if (!ciudad) {
    alert('Por favor, ingresa una ciudad.');
    return;
  }
  
  axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
    params: {
      q: ciudad,
      appid: API_KEY,
      lang: 'es',
      units: 'metric'
    }
  })
  .then(response => {
    mostrarPronostico(response.data);
  })
  .catch(error => {
    console.error('Error al consultar el pronóstico:', error);
    alert('No se pudo obtener el pronóstico del clima.');
  });
}

// Mostrar los resultados del clima actual
function mostrarClimaActual(data) {
  document.getElementById('resultado').innerHTML = `
    <h2>Clima actual en ${data.name}</h2>
    <p>Temperatura: ${data.main.temp}°C</p>
    <p>Clima: ${data.weather[0].description}</p>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Icono del clima">
  `;
}

// Mostrar los resultados del pronóstico de los próximos 5 días
function mostrarPronostico(data) {
  let contenido = `<h2>Pronóstico para ${data.city.name}</h2>`;
  data.list.forEach(item => {
    contenido += `
      <p>${item.dt_txt}: ${item.main.temp}°C - ${item.weather[0].description}</p>
      <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="Icono del clima">
    `;
  });
  document.getElementById('resultado').innerHTML = contenido;
}
