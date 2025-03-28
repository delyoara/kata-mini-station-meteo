// A toi de jouer pour cette partie :-) Happy coding !

const city = document.getElementById('city-search');
const button = document.querySelector('button');
const coordGPS = document.querySelector('#gps');
const cityName = document.querySelector('#city');
const temperature = document.querySelector('#temperature');
const details = document.querySelector('#details');

async function researchCity (cityValue) {
    
    const response = await fetch (`https://nominatim.openstreetmap.org/search?q=${cityValue}&format=json&addressdetails=1&limit=1`)
    const data = await response.json();
    return data; 
    console.log(data);
}
async function fetchWeather(lat, lon) {

    const responseWeather = await fetch (`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&format=json`)
    const dataWeather = await responseWeather.json();
    return dataWeather; 
    console.log(dataWeather);

}

button.addEventListener('click', async() => {
    button.setAttribute("id", "searchButton");
    const cityValue = cityInput.value;
    console.log("Ville : ", cityValue); 

    const data = await researchCity(cityValue);
    if (data.length > 0) {
        let lat = data[0].lat;
        let lon = data[0].lon;
        coordGPS.innerHTML = `Coordonnées : ${lat}, ${lon}`
        console.log(`Latitude: ${lat}, Longitude: ${lon}`);
        cityName.innerHTML = cityValue

        const weatherData = await fetchWeather(lat, lon);
        
        if (weatherData.current_weather) {
            temperature.innerHTML = `<small>Temperature actuelle :</small> ${weatherData.current_weather.temperature}°C`;
            // temperature.style.fontSize = "0.8em"
            details.innerHTML = `Vitesse du vent: ${weatherData.current_weather.windspeed} km/h`;
        }
         else {
            temperature.textContent = '-°C';
            details.textContent = 'Impossible de récupérer les données météo.';
        };
    } ;
});





