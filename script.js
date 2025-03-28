// A toi de jouer pour cette partie :-) Happy coding !

const city = document.getElementById('city-search');
const button = document.querySelector('button');
const coordGPS = document.querySelector('#gps')
const cityName = document.querySelector('#city')

async function researchCity (cityValue) {
    
    const response = await fetch (`https://nominatim.openstreetmap.org/search?q=${cityValue}&format=json&addressdetails=1&limit=1`)
    const data = await response.json();
    return data; 
    console.log(data);
}

button.addEventListener('click', async() => {
    button.setAttribute("id", "searchButton");
    const cityValue = cityInput.value;
    console.log("Ville : ", cityValue); 

    const data = await researchCity(cityValue);
    if (data.length > 0) {
        const lat = data[0].lat;
        const lon = data[0].lon;
        coordGPS.innerHTML = `Coordonées : ${lat}, ${lon}`
        console.log(`Latitude: ${lat}, Longitude: ${lon}`);
        cityName.innerHTML = cityValue

    } 
})


