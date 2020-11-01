const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const facebookBtn = document.getElementById('facebook');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//Show loading
function loading() {
	loader.hidden = false;
	quoteContainer.hidden = true; /*this show loader and hide quote container*/
}

// Hide loading
function complete(){
	if(!loader.hidden){
		quoteContainer.hidden = false;
		loader.hidden = true;
	}
}


// get quote from api
async function getQuote() {
	loading();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    	const response = await fetch(proxyUrl + apiUrl);
		const data = await response.json();
		// If author is blank, add 'unknown'
		if (data.quoteAuthor === ''){
			authorText.innerText = 'Unknown';
		} else {
			authorText.innerText = data.quoteAuthor;
		}
		//Reduce font size for long quotes
		if (data.quoteText.length > 120){
			quoteText.classList.add('long-quote');
		} else {
			quoteText.classList.remove('long-quote');
		}
		quoteText.innerText = data.quoteText;
		// Stop Loader, show quote
		complete();
	} catch (error) {
		getQuote();
	}
}

//Tweet Quote
function tweetQuote () {
	const quote = quoteText.innerText;
	const author = authorText.innerText;
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
	window.open(twitterUrl, '_blank');
}

//Facebook Quote
function facebookQuote(){
	const quote = quoteText.innerText;
	const author = authorText.innerText;
	const facebookUrl = `https://www.facebook.com/sharer.php?u=https%3A%2F%2Fhrvoje-rama.github.io%2FQuote-Generator%2F&quote=${quote} - ${author}`;
	window.open(facebookUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click',  getQuote);
twitterBtn.addEventListener('click', tweetQuote);
facebook.addEventListener('click', facebookQuote);


//on load
getQuote();