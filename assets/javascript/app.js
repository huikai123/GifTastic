$(document).ready(function(){

//declare arrays
var topics = ['dog','cat','rabbit','bear',
'monkey','panda','sheep','pig','tiger','penguin'];
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

//on click event for buttons in the array, call function
$(".buttonGroup").on('click','.search', function(){
	//retieve the attribute "name" of the button, store it as variable
	var p = $(this).data('name');
	//store API endpoint, search the text input, limits 10 images
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + p + "&api_key=dc6zaTOxFJmzC&limit=10";

	console.log("p: ", p);
	// use ajax to GET the queryUrl
	$.ajax({url: queryURL, method: 'GET'})
		// callback that fires on success	
		.done(function(response) {
			//replace the images by clicking another button
			$('.result').empty();
			// store the images data as a variable
			var results = response.data;
			// loop through all 10 images that are displayed
			for (var i = 0; i < results.length; i++) {
                    //Insert a <div>
                    var gifDiv = $('<div>');
                    //Get the images' rating from data
                    var rating = results[i].rating;
                    //Insert a paragragh to display rating
                    var p = $('<p>').text("Rating: " + rating);

                    //add rating to the div
                    p.appendTo(gifDiv);
                    //create image with multiple attribute
                    var animalImage = $('<img>')
                    	//add class name called image
                    	.addClass('image')
                    	// set up event listner called gifState
                    	.on('click',gifState)
                    	//
                    	.attr('src', results[i].images.fixed_height.url)
                    	.attr('data-animate',results[i].images.fixed_height.url)
                    	.attr('data-state',"still")
                    	.attr('data-still',results[i].images.fixed_height_still.url);
                    	console.log("images: ", animalImage);
                    
                    //add images to the div
                    animalImage.append(gifDiv);
                    //add gifDiv to the HTML result element
                    $('.result').append(gifDiv);
    }
});

});
	//change state 'still' or 'animate'
	function gifState(){
 	var state = $(this).data('state');
 		console.log("this: ", this);
        if ('still' == state) {
              console.log('still');
              $(this).data('state', 'animate').attr('src', $(this).data('animate'));

          } else {
              console.log('animate');
              $(this).data('state', 'still').attr('src', $(this).data('still'))
          }
	
}

//});

});

