const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const  twitterBtn= document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function loading() {
    loader.hidden =false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    quoteContainer.hidden =false;
    loader.hidden = true;
}

function newQuote(){
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if  (!quote.author) {
        authorText.text.Content = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }
    // Check Quote Length for Style
    if  (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.textContent =quote.text;
    complete();
}

// const getQuotes = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Host': 'healthruwords.p.rapidapi.com',
// 		'X-RapidAPI-Key': '174b10162fmsh41f53aac24c2f2ap1a84e3jsn33df5df22870'
// 	}
// };

// fetch('https://healthruwords.p.rapidapi.com/v1/quotes/?t=Wisdom&maxR=1&size=medium', getQuotes)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

// // Get Quotes From API
async function getQuotes () {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch
    }
}

// Tweet Quote 
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank' );
}

// Event Listener
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote );

// On Load

getQuotes();

