const button: HTMLButtonElement = <HTMLButtonElement>document.querySelector('button');
const joke: HTMLParagraphElement = <HTMLParagraphElement>document.querySelector('p');
const scoreJokes: { joke: string; score: number; date: string }[] = [];

/**
 * "click" event on "button" that executes two functions: 
 * "changeBackgroundColor()" and
 * "giveMeAJoke(genre)", to which it passes a random parameter of 1 or 2;
 */

let score: number = 1;
button.addEventListener('click', () => {
    changeBackgroundColor();
    let genre: number = Math.floor(Math.random() * (3 - 1) + 1);
    giveMeAJoke(genre);
});



/**
 * Function that uses a fetch request to get a joke from one of two different APIs depending on the value of "genre", displays the joke in an HTML element, and stores it in an array along with its rating and date. It also calls the function "starsRating()".
 * @param genre If "genre" equals 1, it gets a joke from "icanhazdadjoke.com", and if it's different from 1, it gets a joke from "api.chucknorris.io".
 */

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
        .then((data) => { genre == 1 ? joke.innerHTML = `${data.joke}<br><span>-Dad</span>` : joke.innerHTML = `${data.value}<br><span>-Chuck Norris</span>` });
    starsRating();
    console.log(scoreJokes);
}



const stars: HTMLElement = <HTMLElement>document.getElementById('stars');
const star1: HTMLElement = <HTMLElement>document.getElementById('star1');
const star2: HTMLElement = <HTMLElement>document.getElementById('star2');
const star3: HTMLElement = <HTMLElement>document.getElementById('star3');

/**
 * Function that adds "click" events to the rating "stars" to obtain the punctuation of each joke, at the same time that it modifies the format of these depending on whether they have been marked or unmarked.
 */

function starsRating(): void {
    star1.addEventListener('click', () => {
        score = 1;
        star2.style.color = "rgba( 255, 255, 255, 0.35 )"
        star3.style.color = "rgba( 255, 255, 255, 0.35 )"
    });
    star2.addEventListener('click', () => {
        score = 2;
        star2.style.color = "gold"
        star3.style.color = "rgba( 255, 255, 255, 0.35 )"
    });
    star3.addEventListener('click', () => {
        score = 3;
        star2.style.color = "gold"
        star3.style.color = "gold"
    });
    star2.style.color = "rgba( 255, 255, 255, 0.35 )"
    star3.style.color = "rgba( 255, 255, 255, 0.35 )"
}



const weatherToday: HTMLDivElement = <HTMLDivElement>document.getElementById('weatherToday');
const weatherTomorrow: HTMLDivElement = <HTMLDivElement>document.getElementById('weatherTomorrow');
const weatherDayAfterTomorrow: HTMLDivElement = <HTMLDivElement>document.getElementById('weatherDayAfterTomorrow');

/**
 * "load" event of the window object that executes a fetch request to a weather API and displays the data on the web
 */

window.addEventListener('load', () => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=41.39&longitude=2.16&models=best_match&hourly=weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&timezone=Europe%2FLondon&hourly=rain', {
        headers: { Accept: 'application/json' },
    })
        .then((response) => response.json())
        .then((data) => {
            weatherToday.innerHTML = `<div class="day-title">Today, ${whatDayIsIt(data.daily.time[0])}</div>
            <div id="today-icon-and-temperature"> 
                <img src="./src/weather-icon-${data.current_weather.weathercode == 0 ? "sun"
                        : data.current_weather.weathercode < 3 ? "cloud-sun"
                            : data.current_weather.weathercode < 50 ? "cloud"
                                : data.current_weather.weathercode < 70 ? "rain"
                                    : data.current_weather.weathercode < 80 ? "snow" : "storm"}.svg" alt="">
                ${data.current_weather.temperature} ºC
            </div>
            <div class="max-min">
                <div>
                    <img src="./src/weather-icon-max.svg" alt=""> 
                    <div>max. <br> ${data.daily.temperature_2m_max[0]}ºC </div> 
                </div>
                <div>
                    <img src="./src/weather-icon-min.svg" alt="">
                    <div>min. <br> ${data.daily.temperature_2m_min[0]}ºC</div>
                </div>
            </div>`;

            weatherTomorrow.innerHTML = `<div class="day-title">${whatDayIsIt(data.daily.time[1])}</div>
            <div class="next-days-icon-and-temperature"> 
                <img src="./src/weather-icon-${data.daily.weathercode[1] == 0 ? "sun"
                        : data.daily.weathercode[1] < 3 ? "cloud-sun"
                            : data.daily.weathercode[1] < 50 ? "cloud"
                                : data.daily.weathercode[1] < 70 ? "rain"
                                    : data.daily.weathercode[1] < 80 ? "snow" : "storm"}.svg" alt="">
                <div class="max-min max-min-next">
                    <div>
                        <img src="./src/weather-icon-max.svg" alt=""> 
                        <div>max. <br> ${data.daily.temperature_2m_max[1]}ºC </div> 
                    </div>
                    <div>
                        <img src="./src/weather-icon-min.svg" alt="">
                        <div>min. <br> ${data.daily.temperature_2m_min[1]}ºC</div>
                    </div> 
                </div>
            </div>`;
            
            weatherDayAfterTomorrow.innerHTML = `<div class="day-title">${whatDayIsIt(data.daily.time[2])}</div>
            <div class="next-days-icon-and-temperature"> 
                <img src="./src/weather-icon-${data.daily.weathercode[2] == 0 ? "sun"
                        : data.daily.weathercode[2] < 3 ? "cloud-sun"
                            : data.daily.weathercode[2] < 50 ? "cloud"
                                : data.daily.weathercode[2] < 70 ? "rain"
                                    : data.daily.weathercode[2] < 80 ? "snow" : "storm"}.svg" alt="">
                <div class="max-min max-min-next">
                    <div>
                        <img src="./src/weather-icon-max.svg" alt=""> 
                        <div>max. <br> ${data.daily.temperature_2m_max[2]}ºC </div> 
                    </div>
                    <div>
                        <img src="./src/weather-icon-min.svg" alt="">
                        <div>min. <br> ${data.daily.temperature_2m_min[2]}ºC</div>
                    </div> 
                </div>
            </div>`
        });
});



/**
 * Function that modifies the format of a date
 * @param day date to format
 * @returns formatted date ("January 17")
 */

function whatDayIsIt(day: string) {
    let date = new Date(day);
    let formatter = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric" });
    let formattedDate = formatter.format(date);
    return formattedDate;
}


const weatherNextDays: HTMLDivElement = <HTMLDivElement>document.getElementById('weatherNextDays');


function show() {
    weatherNextDays.style.display = 'block'
}

function hide() {
    weatherNextDays.style.display = 'none'
}


const mainContainer: HTMLDivElement = <HTMLDivElement>document.getElementById('container');
let i: number = 2;

function changeBackgroundColor() {
    if (i == 6) i = 1;
    mainContainer.style.backgroundImage = `url('./src/blob${i}.svg')`;
    i++;
}





