//initial topics listed on site
var topics = ['Arsenal FC', 'Barcelona FC', 'Funny Cats', 'Funny Dogs', 'Penguins', 'Steve Carell', 'American Dad' ];

//function to add buttons in topic-button div
function createButton(value) {
	var btn = $('<button class = \'btn btn-primary topic\' value=\''+value+'\'>');
	btn.append(value);
	$('#topicButtons').append(btn);
}

//create initial buttons on site
$(document).ready(function(){
	for(var i=0; i<topics.length;i++) {
		createButton(topics[i]);
	}
});

$('#search-btn').on('click', function() {
	//create button and addend it to topic-butons

	//send search to api

	//display results
});

//if a topic button is clicked
$('.topic').on('click', function() {
	//retrieve value of button

	//send it to the api

	//display results
});