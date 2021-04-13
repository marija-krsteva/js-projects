// Init storage object
const storage = new Storage();

// Get stored location data
const weatherLocation = storage.getLocationData();

// Init weather objects
const weather = new Weather(weatherLocation);

// Init UI object
const ui = new UI;

// Get weather on DOM load
document.addEventListener('DOMContentLoaded', getWeather(weatherLocation));

// Change location event
document.getElementById('w-change-btn').addEventListener('click', (e) => {
    const city = document.getElementById('city').value;
    document.getElementById('city').value = '';

    getWeather(city);

    // Close modal
    $('#locModal').modal('hide');
});

// Get and display weather
function getWeather(city) {
    weather.getWeather(city)
    .then(results => {
        ui.paint(results);
        // Change location
        weather.changeLocation(city);

        // Set location in local storage
        storage.setLocationData(city);  
    })
    .catch(error => {
        ui.error('Error occured while retreaving data')
        console.log(error);
    });
}
