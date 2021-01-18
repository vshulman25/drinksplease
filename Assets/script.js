// We need these in our script for searching
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.27.0/moment.min.js"></script>
// <script src="Assets/script.js"></script>

// We will need global variables defined if they will need to be called by multiple functions
// let drinkName;
// let liquorName;
let userLocation;
let savedLocations = [];

// On click events to capture when find drinks button is pressed
$("#location-search").on("click", function (event) {
  userLocation = $(".user-location").val().trim();
  event.preventDefault();
  console.log(userLocation);
  getWeather();
});

// Code to save previously searched locations to the local storage
function locationSave() {
  localStorage.setItem("locationofuser", JSON.stringify(savedLocations));
}

// Code to save previously searched drinks/alcohol to the local storage

//Ajax call for weather API
function getWeather() {
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userLocation + "&appid=7ca96097be63f6f51d3f8ccd3a2f5564&units=imperial";

  // Perfoming an AJAX GET request to our queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })
      //Pull temp out out of returned array
      .then(function (response) {
          console.log(response);
          console.log(response.main.temp);
          var userTemp = response.main.temp;
          console.log(userTemp);
          // If you have not searched this city before, it pushes it to the array
          if (savedLocations.includes(response.name) === false ) {
              savedLocations.push(response.name);
          }
          //Check to see if what set of rules the temp falls in
          if (userTemp <= 50) {
            //If outside temp < 50 degrees, recommend hot drinks
            // Need an array to pull hot drinks from
            var hotDrinks = hotDrinks;
          } else {
            //If outside temp > 50, recommend cold drinks
            // Need an array of recommended drinks for this portion. Maybe the top 20 most popular drinks?
            var coldDrinks = coldDrinks;
          }
          
      })


}
  

      //Code to update DOM with the returned drinks



// On click events to capture when the search button is pressed, or if user is not happy with the recommended drink

// Ajax call for searching by drink name
// $("#name-search").on("click", function (event) {
//     drinkName = $("#drink-name").val().trim();
//     event.preventDefault();

//     var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkName;

//     // Perfoming an AJAX GET request to our queryURL
//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     })
//         .then(function (response) {
//             console.log(response);
//         });

//       //Returns an array of info

//       //Code for updating DOM with returned info

// });

// // Ajax call for searching by liquor type, might be able to throw this up into the ajax above
// $("#liquor-search").on("click", function (event) {
//     liquorName = $("#liquor-name").val().trim();
//     event.preventDefault();

//     var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + liquorName;

//     // Perfoming an AJAX GET request to our queryURL
//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     })
//         .then(function (response) {
//             console.log(response);
//         });

//       //Returns an array of info

//       //Code for updating DOM with returned info

// });

