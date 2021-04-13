class Weather {
    constructor(city) {
        this.apiKey = '285a61ce3541fa9c970da573f4e2593a';
        this.city = city
    }

    // Fetch weather from API
    async getWeather(city) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`);
        const responseData = await response.json();
        if (responseData.cod !== 200) {
            throw responseData.message;
        }
        return responseData;
    }

    // Change weather location
    changeLocation(city) {
        this.city = city;
    }
}