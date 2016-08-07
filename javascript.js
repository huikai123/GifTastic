$(document).ready(function(){

//declare arrays
var topics = ['dogs','cats','rabbits','bears',
'monkeys','pandas','sheep','pigs','tigers','penguin'];
//event listner
function btn_display(){
	//clear the previous one before append
	$('.buttonGroup').empty();
	//loop through each array
	$.each(topics,function(index,value){
			//create a new button for each array
			var newButton=$('<button>')
			//add a class & attribute. Retrieve the value of arrays as the name of the button
			.addClass('search').attr('data-name',value).html(value);
			//add the new button to the list
			$('.buttonGroup').append(newButton)		

	});
}
//call out function
btn_display();

//on click event
$(".btn").on('click',function(){
	//retrieve the text input and stored it as a varible
	var textInput = $(".animal-input").val().trim();
	//if the textbox is not empty
	if (textInput!="") {
		//add whatever in the textbox to the arrays
		topics.push(textInput);
		//call out function
		btn_display();
		//if textbox is empty
	} else{
		//let it stay empty, do nothing
	return false;	
	}
	//prevent reloading browser when click submit
	return false;
})

//on click event for buttons in the array
$(".buttonGroup").on('click','.search', function(){
	//
	var p = $(this).data('name');
	//store API endpoint
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + p + "&api_key=dc6zaTOxFJmzC&limit=10";

	console.log("p: ", p);
	// use ajax to GET the queryUrl
	$.ajax({url: queryURL, method: 'GET'})
		// callback that fires on success	
		.done(function(response) {
			var results = response.data;

			for (var i = 0; i < results.length; i++) {
                    var gifDiv = $('<div class="item">')

                    var rating = results[i].rating;

                    var p = $('<p>').text("Rating: " + rating);

                    var animalImage = $('<img>');
                    animalImage.attr('src', results[i].images.fixed_height.url);

                    gifDiv.prepend(p)
                    gifDiv.append(animalImage)

                    $('.result').prepend(gifDiv);
                }

	});
});

})