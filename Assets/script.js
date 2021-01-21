// We need these in our script for searching
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.27.0/moment.min.js"></script>
// <script src="Assets/script.js"></script>

// We will need global variables defined if they need to be called by multiple functions
let drinkName;
let userLocation;
let savedLocations = [];

//Array for hot drinks
var hotDrinks = ["coffee liqueur", "Irish Coffee", "Swedish Coffee", "Talos Coffee", "Almond Chocolate Coffee",
"Kioki Coffee", "Hot Creamy Bush", "Afternoon", "Apple Cider Punch #1", "Danbooka", "Fuzzy Asshole", "Karsk",
"Melya", "Mulled Wine", "Tennesee Mud"]

// On click events to capture when find drinks button is pressed
$("#location-search").on("click", function (event) {
  userLocation = $(".user-location").val().trim();
  event.preventDefault();
  // console.log(userLocation);
  getWeather();
});

// $("#name-search").on("click", function (event) {
//   drinkName = $(".drink-name").val().trim();
//   event.preventDefault();
//   console.log(drinkName);
//   getDrink();
// });

// Code to save previously searched locations to the local storage
function save() {
  localStorage.setItem("locationofuser", JSON.stringify(savedLocations));
  // localStorage.setItem("searcheddrinks", JSON.stringify(savedDrinks));
}

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
            getCold();
          } else {
            getHot();
          }
          save();
      })
}


// On click events to capture when the search button is pressed, or if user is not happy with the recommended drink

function getCold(){
  var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

  // Perfoming an AJAX GET request to our queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })
      .then(function (response) {
        console.log(response)
        var nameofDrink = response.drinks[0].strDrink;
        console.log(hotDrinks.includes(nameofDrink));
        if (hotDrinks.includes(nameofDrink)) {
          getCold();
        } else {
          // console.log(Object.entries(response));
          // console.log(response);
          console.log(response.drinks[0]);
          var instructions = response.drinks[0].strInstructions;
          var ingredients1 = response.drinks[0].strMeasure1 + response.drinks[0].strIngredient1 + ",";
          var ingredients2 = response.drinks[0].strMeasure2 + response.drinks[0].strIngredient2 + ",";
          var ingredients3 = response.drinks[0].strMeasure3 + response.drinks[0].strIngredient3 + ",";
          var cocktailImg = response.drinks[0].strDrinkThumb + "/preview";
          console.log(instructions);
          console.log(ingredients1, ingredients2, ingredients3);
          console.log(cocktailImg);
          console.log(nameofDrink);
        }
      })
      
};

function getHot() {
  var randomDrink = hotDrinks[Math.floor(Math.random()*hotDrinks.length)];
    console.log(randomDrink);
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + randomDrink;

    // Perfoming an AJAX GET request to our queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
        .then(function (response) {
          // console.log(Object.entries(response))
          var nameofDrink = response.drinks[0].strDrink;
          var instructions = response.drinks[0].strInstructions;
          var ingredients1 = response.drinks[0].strMeasure1 + response.drinks[0].strIngredient1 + ",";
          var ingredients2 = response.drinks[0].strMeasure2 + response.drinks[0].strIngredient2 + ",";
          var ingredients3 = response.drinks[0].strMeasure3 + response.drinks[0].strIngredient3 + ",";
          var cocktailImg = response.drinks[0].strDrinkThumb + "/preview";
          console.log(response.drinks);
          console.log(instructions);
          console.log(ingredients1, ingredients2, ingredients3);
          console.log(cocktailImg);
          console.log(nameofDrink);
          // console.log(Object.entries(response));
        })
}

// function updateHTML() {

// }




