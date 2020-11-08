class Weather {
    constructor(city) {
        this.apiKey = '285a61ce3541fa9c970da573f4e2593a';
        this.city = city
    }

    // Fetch weather from API
    async getWeather() {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=metric`);
        const responseData = await response.json();
        
        return responseData;
    }

    // Change weather location
    changeLocation(city) {
        this.city = city;
    }
}