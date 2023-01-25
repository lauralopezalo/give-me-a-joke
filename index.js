var button = document.querySelector('button');
var joke = document.querySelector('p');
var scoreJokes = [];
/**
 * "click" event on "button" that executes two functions:
 * "changeBackgroundColor()" and
 * "giveMeAJoke(genre)", to which it passes a random parameter of 1 or 2;
 */
var score = 1;
button.addEventListener('click', function () {
    changeBackgroundColor();
    var genre = Math.floor(Math.random() * (3 - 1) + 1);
    giveMeAJoke(genre);
});
/**
 * Function that uses a fetch request to get a joke from one of two different APIs depending on the value of "genre", displays the joke in an HTML element, and stores it in an array along with its rating and date. It also calls the function "starsRating()".
 * @param genre If "genre" equals 1, it gets a joke from "icanhazdadjoke.com", and if it's different from 1, it gets a joke from "api.chucknorris.io".
 */
function giveMeAJoke(genre) {
    stars.style.display = "flex";
    var url1 = 'https://icanhazdadjoke.com/';
    var url2 = 'https://api.chucknorris.io/jokes/random';
    if (joke.innerHTML) {
        scoreJokes.push({
            joke: joke.innerHTML,
            score: score,
            date: new Date().toISOString()
        });
        score = 1;
    }
    fetch(genre == 1 ? url1 : url2, {
        headers: { Accept: 'application/json' }
    })
        .then(function (response) { return response.json(); })
        .then(function (data) { genre == 1 ? joke.innerHTML = "".concat(data.joke, "<br><span>-Dad</span>") : joke.innerHTML = "".concat(data.value, "<br><span>-Chuck Norris</span>"); });
    starsRating();
    console.log(scoreJokes);
}
var stars = document.getElementById('stars');
var star1 = document.getElementById('star1');
var star2 = document.getElementById('star2');
var star3 = document.getElementById('star3');
/**
 * Function that adds "click" events to the rating "stars" to obtain the punctuation of each joke, at the same time that it modifies the format of these depending on whether they have been marked or unmarked.
 */
function starsRating() {
    star1.addEventListener('click', function () {
        score = 1;
        star2.style.color = "rgba( 255, 255, 255, 0.35 )";
        star3.style.color = "rgba( 255, 255, 255, 0.35 )";
    });
    star2.addEventListener('click', function () {
        score = 2;
        star2.style.color = "gold";
        star3.style.color = "rgba( 255, 255, 255, 0.35 )";
    });
    star3.addEventListener('click', function () {
        score = 3;
        star2.style.color = "gold";
        star3.style.color = "gold";
    });
    star2.style.color = "rgba( 255, 255, 255, 0.35 )";
    star3.style.color = "rgba( 255, 255, 255, 0.35 )";
}
var weatherToday = document.getElementById('weatherToday');
var weatherTomorrow = document.getElementById('weatherTomorrow');
var weatherDayAfterTomorrow = document.getElementById('weatherDayAfterTomorrow');
/**
 * "load" event of the window object that executes a fetch request to a weather API and displays the data on the web
 */
window.addEventListener('load', function () {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=41.39&longitude=2.16&models=best_match&hourly=weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&timezone=Europe%2FLondon&hourly=rain', {
        headers: { Accept: 'application/json' }
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        weatherToday.innerHTML = "<div class=\"day-title\">Today, ".concat(whatDayIsIt(data.daily.time[0]), "</div>\n            <div id=\"today-icon-and-temperature\"> \n                <img src=\"./src/weather-icon-").concat(data.current_weather.weathercode == 0 ? "sun"
            : data.current_weather.weathercode < 3 ? "cloud-sun"
                : data.current_weather.weathercode < 50 ? "cloud"
                    : data.current_weather.weathercode < 70 ? "rain"
                        : data.current_weather.weathercode < 80 ? "snow" : "storm", ".svg\" alt=\"\">\n                ").concat(data.current_weather.temperature, " \u00BAC\n            </div>\n            <div class=\"max-min\">\n                <div>\n                    <img src=\"./src/weather-icon-max.svg\" alt=\"\"> \n                    <div>max. <br> ").concat(data.daily.temperature_2m_max[0], "\u00BAC </div> \n                </div>\n                <div>\n                    <img src=\"./src/weather-icon-min.svg\" alt=\"\">\n                    <div>min. <br> ").concat(data.daily.temperature_2m_min[0], "\u00BAC</div>\n                </div>\n            </div>");
        weatherTomorrow.innerHTML = "<div class=\"day-title\">".concat(whatDayIsIt(data.daily.time[1]), "</div>\n            <div class=\"next-days-icon-and-temperature\"> \n                <img src=\"./src/weather-icon-").concat(data.daily.weathercode[1] == 0 ? "sun"
            : data.daily.weathercode[1] < 3 ? "cloud-sun"
                : data.daily.weathercode[1] < 50 ? "cloud"
                    : data.daily.weathercode[1] < 70 ? "rain"
                        : data.daily.weathercode[1] < 80 ? "snow" : "storm", ".svg\" alt=\"\">\n                <div class=\"max-min max-min-next\">\n                    <div>\n                        <img src=\"./src/weather-icon-max.svg\" alt=\"\"> \n                        <div>max. <br> ").concat(data.daily.temperature_2m_max[1], "\u00BAC </div> \n                    </div>\n                    <div>\n                        <img src=\"./src/weather-icon-min.svg\" alt=\"\">\n                        <div>min. <br> ").concat(data.daily.temperature_2m_min[1], "\u00BAC</div>\n                    </div> \n                </div>\n            </div>");
        weatherDayAfterTomorrow.innerHTML = "<div class=\"day-title\">".concat(whatDayIsIt(data.daily.time[2]), "</div>\n            <div class=\"next-days-icon-and-temperature\"> \n                <img src=\"./src/weather-icon-").concat(data.daily.weathercode[2] == 0 ? "sun"
            : data.daily.weathercode[2] < 3 ? "cloud-sun"
                : data.daily.weathercode[2] < 50 ? "cloud"
                    : data.daily.weathercode[2] < 70 ? "rain"
                        : data.daily.weathercode[2] < 80 ? "snow" : "storm", ".svg\" alt=\"\">\n                <div class=\"max-min max-min-next\">\n                    <div>\n                        <img src=\"./src/weather-icon-max.svg\" alt=\"\"> \n                        <div>max. <br> ").concat(data.daily.temperature_2m_max[2], "\u00BAC </div> \n                    </div>\n                    <div>\n                        <img src=\"./src/weather-icon-min.svg\" alt=\"\">\n                        <div>min. <br> ").concat(data.daily.temperature_2m_min[2], "\u00BAC</div>\n                    </div> \n                </div>\n            </div>");
    });
});
/**
 * Function that modifies the format of a date
 * @param day date to format
 * @returns formatted date ("January 17")
 */
function whatDayIsIt(day) {
    var date = new Date(day);
    var formatter = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric" });
    var formattedDate = formatter.format(date);
    return formattedDate;
}
var weatherNextDays = document.getElementById('weatherNextDays');
function show() {
    weatherNextDays.style.display = 'block';
}
function hide() {
    weatherNextDays.style.display = 'none';
}
var mainContainer = document.getElementById('container');
var i = 2;
function changeBackgroundColor() {
    if (i == 6)
        i = 1;
    mainContainer.style.backgroundImage = "url('./src/blob".concat(i, ".svg')");
    i++;
}
