// import modules
import {removeStopWords} from './stopwords.js';


// initialize variables 
var article;
var api = 'https://newsapi.org/v2/everything?q=';
var apiKey = '&apiKey=7f3ff3ff4daf4191ae6f7e2ba9a4a2f1';
var input;

// const STOP_WORDS = 
//      [
//     "a", "about", "above", "across", "after", "afterwards", "again", "against",
//     "all", "almost", "alone", "along", "already", "also", "although", "always",
//     "am", "among", "amongst", "amoungst", "amount", "an", "and", "another",
//     "any", "anyhow", "anyone", "anything", "anyway", "anywhere", "are",
//     "around", "as", "at", "back", "be", "became", "because", "become",
//     "becomes", "becoming", "been", "before", "beforehand", "behind", "being",
//     "below", "beside", "besides", "between", "beyond", "bill", "both",
//     "bottom", "but", "by", "call", "can", "cannot", "cant", "co", "con",
//     "could", "couldnt", "cry", "de", "describe", "detail", "do", "done",
//     "down", "due", "during", "each", "eg", "eight", "either", "eleven", "else",
//     "elsewhere", "empty", "enough", "etc", "even", "ever", "every", "everyone",
//     "everything", "everywhere", "except", "few", "fifteen", "fifty", "fill",
//     "find", "fire", "first", "five", "for", "former", "formerly", "forty",
//     "found", "four", "from", "front", "full", "further", "get", "give", "go",
//     "had", "has", "hasnt", "have", "he", "hence", "her", "here", "hereafter",
//     "hereby", "herein", "hereupon", "hers", "herself", "him", "himself", "his",
//     "how", "however", "hundred", "i", "ie", "if", "in", "inc", "indeed",
//     "interest", "into", "is", "it", "its", "itself", "keep", "last", "latter",
//     "latterly", "least", "less", "ltd", "made", "many", "may", "me",
//     "meanwhile", "might", "mill", "mine", "more", "moreover", "most", "mostly",
//     "move", "much", "must", "my", "myself", "name", "namely", "neither",
//     "never", "nevertheless", "next", "nine", "no", "nobody", "none", "noone",
//     "nor", "not", "nothing", "now", "nowhere", "of", "off", "often", "on",
//     "once", "one", "only", "onto", "or", "other", "others", "otherwise", "our",
//     "ours", "ourselves", "out", "over", "own", "part", "per", "perhaps",
//     "please", "put", "rather", "re", "same", "see", "seem", "seemed",
//     "seeming", "seems", "serious", "several", "she", "should", "show", "side",
//     "since", "sincere", "six", "sixty", "so", "some", "somehow", "someone",
//     "something", "sometime", "sometimes", "somewhere", "still", "such",
//     "system", "take", "ten", "than", "that", "the", "their", "them",
//     "themselves", "then", "thence", "there", "thereafter", "thereby",
//     "therefore", "therein", "thereupon", "these", "they", "thick", "thin",
//     "third", "this", "those", "though", "three", "through", "throughout",
//     "thru", "thus", "to", "together", "too", "top", "toward", "towards",
//     "twelve", "twenty", "two", "un", "under", "until", "up", "upon", "us",
//     "very", "via", "was", "we", "well", "were", "what", "whatever", "when",
//     "whence", "whenever", "where", "whereafter", "whereas", "whereby",
//     "wherein", "whereupon", "wherever", "whether", "which", "while", "whither",
//     "who", "whoever", "whole", "whom", "whose", "why", "will", "with",
//     "within", "without", "would", "yet", "you", "your", "yours", "yourself",
//     "yourselves"];

// get ID from form
var form = document.getElementById("searchForm");
// add event listener to submit button, and run articleAsk
form.addEventListener("submit", articleAsk);


// define articleAsk
function articleAsk(e){

 e.preventDefault();    // We want to write our own submit behavior, so we override the default behavior.

// define input as the value of the search box
 input = document.getElementById("searchBox").value;

// building the request url for api
 var url = api + input + apiKey ;

// make the api request and then when the request is resolved, get the response and change it to json
//only when that is complete process article description text to a string

 fetch(url)
 .then(function(response){
         // return response.json();
        //json is now data
		return response.json();
	})

 	.then(function(resp){

		var allText = "";
		var articles = resp["articles"];
		console.log(articles);

		for (var i = 0; i < articles.length; i++){
		// createElement('h1', articles[i].title);
		// createP(articles[i].description);
		allText += articles[i].description;
		}
		getImages(allText);
	});
}

//take the string and make it an array, then picking random words to make sure they are not stop words

function getImages(allText){

	var imagesToFind = allText.split(" ");

	// for module
	var randomList = removeStopWords(imagesToFind);

	
	//version without module
	// make an empty variable, keep picking random words until we get 100 non-stop words, put it in variable nextWord

	// let randomList = [];
	// let nextWord;
	

	// while (randomList.length < 80) {
	// 	nextWord = imagesToFind[Math.floor(Math.random() * imagesToFind.length)];

	// 		if (STOP_WORDS.includes(nextWord) == false){
	// 			randomList.push(nextWord);
	// 		}
	// }


//loop through randomList (search terms), then make request to the img api, return first three results of the api request

	for (let i=0; i < randomList.length ; i++){
		  var imgurl = "https://pixabay.com/api/?key=11756178-018e6a4e6ee5bcae5027c0d56&page=1&q=" + randomList[i]+"&page=1&per_page=3";
		  fetch(imgurl)
       	 .then(function(response){

      //bringing the response as json
          return response.json();
      	})
           .then(function(resp){

// parse results, find the parts that we want and create a DOM element for each image
		  var image = resp["hits"];

		document.getElementById("responseImagesHere").innerHTML += "<img src="+image[0]["largeImageURL"]+" title="+randomList[i]+">";
		});
        }
    }


