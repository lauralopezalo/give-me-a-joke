var button = document.querySelector('button');
var joke = document.querySelector('p');
var scoreJokes = [];
var score = 1;
button.addEventListener('click', function () {
    var genre = Math.floor(Math.random() * (3 - 1) + 1);
    giveMeAJoke(genre);
});
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
}
var stars = document.getElementById('stars');
var star1 = document.getElementById('star1');
var star2 = document.getElementById('star2');
var star3 = document.getElementById('star3');
function starsRating() {
    star1.addEventListener('click', function () {
        score = 1;
        star2.style.color = "rgb(165, 164, 164)";
        star3.style.color = "rgb(165, 164, 164)";
    });
    star2.addEventListener('click', function () {
        score = 2;
        star2.style.color = "gold";
        star3.style.color = "rgb(165, 164, 164)";
    });
    star3.addEventListener('click', function () {
        score = 3;
        star2.style.color = "gold";
        star3.style.color = "gold";
    });
    star2.style.color = "rgb(165, 164, 164)";
    star3.style.color = "rgb(165, 164, 164)";
    console.log(scoreJokes);
}
var weatherToday = document.getElementById('weatherToday');
var weatherTomorrow = document.getElementById('weatherTomorrow');
window.addEventListener('load', function () {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=41.39&longitude=2.16&models=best_match&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&timezone=Europe%2FLondon&hourly=rain', {
        headers: { Accept: 'application/json' }
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        weatherToday.innerHTML = "<h3>Today</h3><br><h4>".concat(data.daily.time[0], "</h4><br>\n            Temperature: ").concat(data.current_weather.temperature, " ").concat(data.daily_units.temperature_2m_max, " <br>\n            Sunrise: ").concat(data.daily.sunrise[0].substring(data.daily.sunset[0].length - 5), " <br>\n            Sunset: ").concat(data.daily.sunset[0].substring(data.daily.sunset[0].length - 5));
        weatherTomorrow.innerHTML = "<h3>Tomorrox</h3><br><h4>".concat(data.daily.time[1], "</h4><br>\n            Temperature: ").concat(data.current_weather.temperature, " ").concat(data.daily_units.temperature_2m_max, " <br>");
    });
});
