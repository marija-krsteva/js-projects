// Init storage object
const storage = new Storage();

// Get stored location data
const weatherLocation = storage.getLocationData();

// Init weather objects
const weather = new Weather(weatherLocation);

// Init UI object
const ui = new UI;

// Get weather on DOM load
document.addEventListener('DOMContentLoaded', getWeather);

// Change location event
document.getElementById('w-change-btn').addEventListener('click', (e) => {
    const city = document.getElementById('city').value;
    document.getElementById('city').value = '';

    // Change location
    weather.changeLocation(city);

    // Set location in local storage
    storage.setLocationData(city);    
    
    getWeather();

    // Close modal
    $('#locModal').modal('hide');
});

// Get and display weather
function getWeather() {
    weather.getWeather()
    .then(results => {
        ui.paint(results);
    })
    .catch(error => console.log(error));
}
