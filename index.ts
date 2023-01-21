const button: HTMLButtonElement = <HTMLButtonElement>document.querySelector('button');
const joke: HTMLParagraphElement = <HTMLParagraphElement>document.querySelector('p');


const scoreJokes: { joke: string; score: number; date: string }[] = [];

let score: number = 1;
button.addEventListener('click', () => {
    let genre: number = Math.floor(Math.random() * (3 - 1) + 1);
    giveMeAJoke(genre);
});

function giveMeAJoke(genre: number) {
    stars.style.display = "flex"
    const url1: string = 'https://icanhazdadjoke.com/';
    const url2: string = 'https://api.chucknorris.io/jokes/random';
    if (joke.innerHTML) {
        scoreJokes.push({
            joke: joke.innerHTML,
            score: score,
            date: new Date().toISOString(),
        });
        score = 1;
    }
    fetch(genre == 1 ? url1 : url2, {
        headers: { Accept: 'application/json' },
    })
        .then((response) => response.json())
        .then((data) => { genre == 1 ? joke.innerHTML = `${data.joke}<br><span>-Dad</span>` : joke.innerHTML = `${data.value}<br><span>-Chuck Norris</span>`});
    starsRating();
}


const stars: HTMLElement = <HTMLElement>document.getElementById('stars');
const star1: HTMLElement = <HTMLElement>document.getElementById('star1');
const star2: HTMLElement = <HTMLElement>document.getElementById('star2');
const star3: HTMLElement = <HTMLElement>document.getElementById('star3');

function starsRating(): void {
    star1.addEventListener('click', () => {
        score = 1;
        star2.style.color = "rgb(165, 164, 164)"
        star3.style.color = "rgb(165, 164, 164)"
    });
    star2.addEventListener('click', () => {
        score = 2;
        star2.style.color = "gold"
        star3.style.color = "rgb(165, 164, 164)"
    });
    star3.addEventListener('click', () => {
        score = 3;
        star2.style.color = "gold"
        star3.style.color = "gold"
    });
    star2.style.color = "rgb(165, 164, 164)"
    star3.style.color = "rgb(165, 164, 164)"
    console.log(scoreJokes);

}


const weatherToday: HTMLDivElement = <HTMLDivElement>document.getElementById('weatherToday');
const weatherTomorrow: HTMLDivElement = <HTMLDivElement>document.getElementById('weatherTomorrow');

window.addEventListener('load', () => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=41.39&longitude=2.16&models=best_match&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&timezone=Europe%2FLondon&hourly=rain', {
        headers: { Accept: 'application/json' },
    })
        .then((response) => response.json())
        .then((data) => {
            weatherToday.innerHTML = `<h3>Today</h3><br><h4>${data.daily.time[0]}</h4><br>
            Temperature: ${data.current_weather.temperature} ${data.daily_units.temperature_2m_max} <br>
            Sunrise: ${data.daily.sunrise[0].substring(data.daily.sunset[0].length - 5)} <br>
            Sunset: ${data.daily.sunset[0].substring(data.daily.sunset[0].length - 5)}`;
            weatherTomorrow.innerHTML = `<h3>Tomorrox</h3><br><h4>${data.daily.time[1]}</h4><br>
            Temperature: ${data.current_weather.temperature} ${data.daily_units.temperature_2m_max} <br>`
        });
});






