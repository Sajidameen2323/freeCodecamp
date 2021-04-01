

var quotes = [
{quote:'Some thing is better than Nothing',author:'Some Guy'},{quote:'if you want the world to change take a look at yourself and make a change',author:'Batman'},{quote:'bla bla bla some  text goes here bla bla bla again',author:'Sajid Ameen'},{quote:'Do not judge a book by it\'s cover',author:'bookworm'},{quote:'A raged lion\'s breath sounds scarier than it\'s roar',author:'Athishta Raj'},{quote:'Panninga thaan kootama varum singam single aa thaan varum',author:'rajini'}
];

const rand = function(){
	return Math.round(Math.random()*(quotes.length-1));
};

var getQuote = function(){
	$('#quote-text').html(quotes[rand()]['quote']);
	$('#author').html(quotes[rand()]['author']);
};

$(document).ready(function(){
getQuote();
$('#new-quote').on('click',getQuote)
});



// Styling the document using jQuery


$(document).ready(function(){
$('#author').css("text-align","center")
})