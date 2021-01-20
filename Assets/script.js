// We need these in our script for searching
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.27.0/moment.min.js"></script>
// <script src="Assets/script.js"></script>

// We will need global variables defined if they need to be called by multiple functions
let drinkName;
// let liquorName;
let userLocation;
let savedLocations = [];
let savedDrinks = [];

//Array for hot drinks
var hotDrinks = ["coffee liqueur", "Irish Coffee", "Swedish Coffee", "Talos Coffee", "Almond Chocolate Coffee",
"Kioki Coffee", "Hot Creamy Bush", "Afternoon", "Apple Cider Punch #1", "Danbooka", "Fuzzy Asshole", "Karsk",
"Melya", "Mulled Wine", "Tennesee Mud"]

//Array for cold drinks
var coldDrinks = ["Black and Brown", "Black Forest Shake", "Brandon and Will's Coke Float", "Butter Baby", 
"California Root Beer", "Cherry Rum", "Chicago Fizz", "Chocolate Milk", "Dragonfly", "Egg Cream", "Gin Cooler",
"Grizzly Bear", "Lady Love Fizz", "Mint Julep", "Mojito", "Moscow Mule", "Oreo Mudslide", "Pineapple Paloma",
"Rum Runner", "Strawberry Daiquiri"]

// On click events to capture when find drinks button is pressed
$("#location-search").on("click", function (event) {
  userLocation = $(".user-location").val().trim();
  event.preventDefault();
  // console.log(userLocation);
  getWeather();
});

$("#name-search").on("click", function (event) {
  drinkName = $(".drink-name").val().trim();
  event.preventDefault();
  console.log(drinkName);
  getDrink();
});

// Code to save previously searched locations to the local storage
function save() {
  localStorage.setItem("locationofuser", JSON.stringify(savedLocations));
  localStorage.setItem("searcheddrinks", JSON.stringify(savedDrinks));
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
          var userTemp = response.main.temp;
          console.log(userTemp);
          // If you have not searched this city before, it pushes it to the array
          if (savedLocations.includes(response.name) === false ) {
              savedLocations.push(response.name);
          }
          //Check to see if what set of rules the temp falls in
          if (userTemp > 50) {
            //If outside temp < 50 degrees, recommend hot drinks
            // Need an array to pull hot drinks from
            var randomDrink = coldDrinks[Math.floor(Math.random()*coldDrinks.length)];
            console.log(randomDrink);
          } else {
            //If outside temp > 50, recommend cold drinks
            // Need an array of recommended drinks for this portion. Maybe the top 20 most popular drinks?
            var randomDrink = hotDrinks[Math.floor(Math.random()*hotDrinks.length)];
            console.log(randomDrink);
          }
          var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + randomDrink;

            // Perfoming an AJAX GET request to our queryURL
            $.ajax({
              url: queryURL,
              method: "GET"
            })
                .then(function (response) {
                  console.log(response);
                })
          
          save();
          //Code to update DOM with the returned drinks
          
      })


}


// On click events to capture when the search button is pressed, or if user is not happy with the recommended drink

function getDrink(){
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkName;

    // Perfoming an AJAX GET request to our queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
        .then(function (response) {
          $("#testingarea").empty();
            console.log(response);
            if (savedDrinks.includes(drinkName) === false ) {
              savedDrinks.push(drinkName);
            }
            // console.log(response.drinks[0].strDrink);
            // console.log(response.drinks[1]);
            for (i = 0; i < response.drinks.length; i++) {
              // console.log(response.drinks[i].strDrink);
              // console.log(response.drinks[i].strIngredient1, response.drinks[i].strIngredient2, response.drinks[i].strIngredient3,response.drinks[i].strIngredient4);
              // console.log(response.drinks[i].strMeasure1, response.drinks[i].strMeasure2);
              // console.log(response.drinks[i].strMeasure1, response.drinks[i].strIngredient1);
              var drinkName = response.drinks[i].strDrink;
              var instructions = response.drinks[i].strInstructions;
              var ingredients1 = response.drinks[i].strMeasure1 + response.drinks[i].strIngredient1;
              var ingredients2 = response.drinks[i].strMeasure2 + response.drinks[i].strIngredient2;
              var cocktailImg = response.drinks[i].strDrinkThumb + "/preview";
              console.log(instructions);
              console.log(ingredients1, ingredients2);
              console.log(cocktailImg);
              // var drinkDiv = $("<div>");
              // drinkDiv.html(drinkName);
              // $("#testingarea").prepend(drinkDiv);
              
            }
            save();
        });

      //Returns an array of info

      //Code for updating DOM with returned info

};

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

