//initial topics listed on site
var topics = ['Arsenal FC', 'Barcelona FC', 'Funny Cats', 'Funny Dogs', 'Penguins', 'Steve Carell', 'American Dad' ];
var results;
//beta public API key
var apiKey = 'dc6zaTOxFJmzC';

//appending API response to DOM
function appendGifToDOM(info) {
	console.log('running appendGifToDom');
	//creating Div to hold gif
	var gifDiv = $('<div class = \'gif-container\'>');
	var gifRating = $('<p>');
	gifRating.append('Rating : '+info.rating);
	var gifImage = $('<img class=\'gif\'>');
	//make inital image the still image, add necessary attributes
	gifImage.attr('src', info.images.downsized_still.url);
	gifImage.attr('data-still', info.images.downsized_still.url);
	gifImage.attr('data-animate', info.images.downsized.url);
	gifImage.attr('data-state', 'still');
	//append div with rating, class still, class giphy-gif
	gifDiv.append(gifImage);
	gifDiv.append(gifRating);
	$('#gifDiv').append(gifDiv);
};

//create queryURL
function createQueryURL(query) {
	return 'https://api.giphy.com/v1/gifs/search?q=' + query + '&api_key='+ apiKey + '+&limit=10';
}

//clear gifDiv in Dom, in prep for next search
function clearGifDOM(){
	$('#gifDiv').html('');
};

//create initial buttons on site
function populateButtons(){
	for(var i=0; i<topics.length;i++) {
		createButton(topics[i]);
	}
};

//sending GET request to API
function requestFromAPI(queryUrl) {
	console.log('running request from API');
	//since we'll be displaying stuff, gotta get rid of old stuff first
	clearGifDOM();
	$.ajax({
		url: queryUrl,
		method: 'GET'
	}).done(function(response) {
		results=response;
		console.log('response:');
		console.log(response);

		for(var j=0; j<10; j++) {
			appendGifToDOM(response.data[j]);
		};

	});
};

//function to add buttons in topic-button div
function createButton(value) {
	var btn = $('<button class = \'btn btn-primary topic\' value=\''+value+'\'>');
	btn.append(value);
	$('#topicButtons').append(btn);
}

//initalize DOM
$(document).ready(function(){
	//populate premade buttons
	populateButtons();

	//when Search Button Clicked...
	$('#search-btn').click( function() {	
		console.log('clicking search button');
		//create button and addend it to topic-butons
		var searchQuery = $('#search').val().trim();
		//send API GET method, display results in DOM
		requestFromAPI(createQueryURL(searchQuery));
		//create a button in button row
		createButton(searchQuery);
	});

	//if a topic button is clicked
	$('#topicButtons').on('click', '.topic', function() {
			//retrieve value of button		
			var valueOfButton = $(this).val();
			//send it to the api, display results
			requestFromAPI(createQueryURL(valueOfButton));
	});

	$('#gifDiv').on('click', '.gif', function() {
			console.log('Clicked a gif');
			var state = $(this).attr('data-state');
	    	var animate = $(this).attr('data-animate');
	    	var still = $(this).attr('data-still');
	    	if(state==='still') {
	        	$(this).attr('data-state', 'animate');
	        	$(this).attr('src', animate);
	      	} else if (state!='still') {
	        	$(this).attr('data-state', 'still');
	        	$(this).attr('src', still);
	      	}
	});
});