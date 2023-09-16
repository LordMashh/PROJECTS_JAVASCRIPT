const quoteElement = document.querySelector('.quote');
const authorElement = document.querySelector('.author');


const link = `https://api.quotable.io/random`;

function getQuote(){
    fetch(link)
        .then(response => {
            let data = response.json();
            return data;
        })
        .then(data => {
            quoteElement.innerText = `“${data.content}”`;
            authorElement.innerText = `―${data.author}`;
        })
        .catch(error => {
            console.log(error);
        });
}
const refreshButton = document.getElementById('refreshButton');

refreshButton.addEventListener('click', function() {
    // Use window.location.reload() to refresh the page
    window.location.reload();
});

window.addEventListener('load', getQuote);