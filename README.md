# Give Me A Joke

This is a web application developed to display jokes to employees before starting their workday as part of an experiment conducted by a coaching company. The goal is to measure the impact of humor and fun on productivity.

<br>

## Features
- TypeScript: The project is developed using TypeScript, a superset of JavaScript that provides static typing and additional features to improve code quality and maintainability.

- RESTful API: The application consumes data from a RESTful API. API calls are made to retrieve and display jokes in the user interface.

- Promises and async/await: Promises and async/await are used to handle asynchronous operations when making API calls and awaiting responses.

- Web layout: The user interface is implemented using HTML and CSS, and includes SVG for representing visual elements.

- Weather information API: Integration of a weather information API is added to display weather data in the application.

<br>


## Getting Started
Follow these steps to set up and run the project on your local machine:

### Prerequisites
- Node.js and npm (or yarn) should be installed on your system.

### Installation
1. Clone this repository to your local machine using git clone.
2. Navigate to the project directory in the terminal.
3. Run **`npm install`** (or **`yarn install`**) to install the required dependencies.

### Running the Application
1. After installing the dependencies, run **`npm start`** (or **`yarn start`**) to compile the TypeScript code and start the development server.
2. The application will be accessible at http://localhost:3000 in your web browser.

<br>

## Code Examples
```
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

```

<br>


## Contributing
Contributions to this project are welcome! If you find any issues or have suggestions for improvement, please feel free to open an issue or create a pull request. We value your feedback and contributions to make this project better.

<br>

## License
This project is licensed under the MIT License. Feel free to use, modify, and distribute the code as per the terms of the license.
