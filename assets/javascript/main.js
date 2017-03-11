var animals = ["monkey", "turtle", "spider", "ant"];

  //// display function ////
  function displayAnimalInfoFunc() {
    // name of the clided button
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=funny " +
    animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Creates AJAX call for the specific animal button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      var results = response.data;

      // Creates a div to hold the animal gifs
      $("#animals-view").empty();

      for (var i = 0; i < results.length; i++) {
      	// JSON info contained in data array 0 - 10 
        var divImg = $("<div>");
        divImg.addClass("divClass" + i + " divClass");
        $("#animals-view").append(divImg);

        var textP = $("<p>");
        textP.text("Rating: " + results[i].rating);
        $(".divClass" + i).append(textP);
 
        var textImg = $("<img>"); // img will append to each unqiue class
        textImg.addClass("imgClass");

        // accessing each array url to add to html img
        var animateImg = results[i].images.original.url;
        var stillImg = results[i].images.original_still.url;
        textImg.attr("src", stillImg);
        textImg.attr("data-still", stillImg);
        textImg.attr("data-animate", animateImg);
        textImg.attr("data-state", "still");

        $(".divClass" + i).append(textImg);
      }
      renderButtons();
    });
  }
  //////////////////////////////////

  //// render button ////
  function renderButtons() {
    // Deletes the animals prior to adding new animals
    $("#buttons-view").empty();
    // Loops through the array of animals
    for (var i = 0; i < animals.length; i++) {
      // Then dynamicaly generates buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adds a class of movie to our button
      a.addClass("animal");
      // Added a data-attribute
      a.attr("data-name", animals[i]);
      // Provided the initial button text
      a.text(animals[i]);
      // Added the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }
  //////////////////////////////////

  //// render button ////
  $("#add-Animal").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var animal = $("#animal-input").val().trim();

    // The movie from the textbox is then added to our array
    animals.push(animal);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
    // this clears the input box after clicking enter
    $("input:text").val("");
  });
  //////////////////////////////////

  //// onclick dynamically created class - start/stop gif ////
  $("#animals-view").on("click", ".imgClass", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
  //////////////////////////////////

  // Adding click event listeners to all elements with a class of "animal"
  $(document).on("click", ".animal", displayAnimalInfoFunc);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();


