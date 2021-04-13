class UI {
    constructor() {
        this.location = document.getElementById('w-location');
        this.desc = document.getElementById('w-desc');
        this.string = document.getElementById('w-string');
        this.details = document.getElementById('w-details');
        this.icon = document.getElementById('w-icon');
        this.humidity = document.getElementById('w-humidity');
        this.feelsLike = document.getElementById('w-feels-like');
        this.wind = document.getElementById('w-wind');        
    }

    paint(weather) {
        this.location.textContent = weather.name;
        this.desc.textContent = weather.weather[0].description;
        this.string.textContent = `${weather.main.temp} \xB0C`;
        this.icon.setAttribute('src', `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
        this.humidity.textContent = `Relative Humidity: ${weather.main.humidity}%`;
        this.feelsLike.textContent = `Feels Like: ${weather.main.feels_like}\xB0C`;
        this.wind.textContent = `Wind speed: ${weather.wind.speed} km/h`;
    }

    error(message) {
    // Create a div
    const errorDiv = document.createElement('div');

    // Add class
    errorDiv.className = 'alert alert-danger error';

    // Create text node and append to div
    errorDiv.appendChild(document.createTextNode(message));

    // Insert error above heading
    document.getElementById('root').prepend(errorDiv)

    // Clear error after 3 seconds
    setTimeout(this.clearError, 5000);
    }

    // Clear error
    clearError() {
        document.querySelector('.error').remove();
    }
}