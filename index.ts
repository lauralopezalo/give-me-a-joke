const button: HTMLButtonElement = <HTMLButtonElement>document.querySelector('button');
const joke: HTMLParagraphElement = <HTMLParagraphElement>document.querySelector('p');

button.addEventListener('click', () => {
    fetch('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json' },
    })
        .then((response) => response.json())
        .then((data) => joke.innerHTML = data.joke);
});


