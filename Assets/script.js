// We need these in our script for searching
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.27.0/moment.min.js"></script>
// <script src="Assets/script.js"></script>

// We will need global variables defined if they will need to be called by multiple functions
let drinkName;
let liquorName;
let userLocation;

// On click events to capture when find drinks button is pressed

//Ajax call for weather API

    //Pull temp out out of returned array

    //Check to see if what set of rules the temp falls in

      //If outside temp < 50 degrees, recommend hot drinks
      //This most likely will need to pull in a predefined array of drinks
      //Only around 20 drinks are hot, would be easy to make a seperate array js page for that

      //If outside temp > 50, recommend cold drinks

      //Code to update DOM with the returned drinks


// Code to save previously searched locations to the local storage

// Code to save previously searched drinks/alcohol to the local storage

// On click events to capture when the search button is pressed, or if user is not happy with the recommended drink

// Ajax call for searching by drink name
$("#name-search").on("click", function (event) {
    drinkName = $("#drink-name").val().trim();
    event.preventDefault();

    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkName;

    // Perfoming an AJAX GET request to our queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
        .then(function (response) {
            console.log(response);
        });

      //Returns an array of info

      //Code for updating DOM with returned info

});

// Ajax call for searching by liquor type, might be able to throw this up into the ajax above
$("#liquor-search").on("click", function (event) {
    liquorName = $("#liquor-name").val().trim();
    event.preventDefault();

    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + liquorName;

    // Perfoming an AJAX GET request to our queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
        .then(function (response) {
            console.log(response);
        });

      //Returns an array of info

      //Code for updating DOM with returned info

});

