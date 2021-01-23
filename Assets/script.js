// We will need global variables defined if they need to be called by multiple functions
let drinkName;
let userLocation;
let savedLocations = [];

//Array for hot drinks
var hotDrinks = ["coffee liqueur", "Irish Coffee", "Swedish Coffee", "Talos Coffee", "Almond Chocolate Coffee",
"Kioki Coffee", "Hot Creamy Bush", "Afternoon", "Apple Cider Punch #1", "Danbooka", "Fuzzy Asshole", "Karsk",
"Melya", "Mulled Wine", "Tennesee Mud", "Spiking Coffee", "Cafe Savoy", "Mocha-Berry", "Jamaican Coffee", "Almond Chocolate Coffee",
"H.D.", "Amaretto Tea", "Masala Chai", "Herbal Flame", "Rum Toddy", "Castillian Hot Chocolate", "Chocolate Drink", "Microwave Hot Cocoa",
"Gluehwein"]

// On click events to capture when find drinks button is pressed
$("#location-search").on("click", function (event) {
  userLocation = $(".user-location").val().trim();
  event.preventDefault();
  // console.log(userLocation);
  getWeather();
});

$("#random").on("click", function (event) {
  event.preventDefault();
  getRandom();
});

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

function getCold() {
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
          var nameofDrink = response.drinks[0].strDrink;
          var instructions = response.drinks[0].strInstructions;
          var ingredients1 = response.drinks[0].strMeasure1 + " " + response.drinks[0].strIngredient1;
          var ingredients2 = response.drinks[0].strMeasure2 + " " + response.drinks[0].strIngredient2;
          var ingredients3 = response.drinks[0].strMeasure3 + " " + response.drinks[0].strIngredient3;
          var ingredients4 = response.drinks[0].strMeasure4 + " " + response.drinks[0].strIngredient4;
          var ingredient1 = response.drinks[0].strIngredient1;
          var measure1 = response.drinks[0].strMeasure1;
          var ingredient2 = response.drinks[0].strIngredient2;
          var measure2 = response.drinks[0].strMeasure2;
          var measure3 = response.drinks[0].strMeasure3;
          var ingredient3 = response.drinks[0].strIngredient3;
          var measure4 = response.drinks[0].strMeasure4;
          var ingredient4 = response.drinks[0].strIngredient4;
          var imgURL = response.drinks[0].strDrinkThumb + "/preview";
          $(".drinkImg").attr("src", imgURL);
          $(".drinkName").html(nameofDrink);
          $("#ing1").empty().hide();
          $("#ing2").empty().hide();
          $("#ing3").empty().hide();
          $("#ing4").empty().hide();
          if (measure1 === null && ingredient1 != null) {
            $("#ing1").html(ingredient1).show();
          }
          else {
            $("#ing1").html(ingredients1).show();
          }
          if (measure2 === null && ingredient2 != null) {
            $("#ing2").html(ingredient2).show();
          }
          else {
            $("#ing2").html(ingredients2).show();
          }
          if (measure3 === null && ingredient3 === null) {
            console.log(ingredients3);
            $("#ing3").empty().hide();
          } else if (measure3 === null && ingredient3 != null) {
            $("#ing3").html(ingredient3).show();
            console.log(ingredient3);
          } else {
            $("#ing3").html(ingredients3).show();
          }
          if (measure4 === null && ingredient4 === null ) {
            console.log(ingredients4);
            $("#ing4").empty().hide();
          } else if (measure4 === null && ingredient4 != null) {
            $("#ing4").html(ingredient4).show();
            console.log(ingredient4);
          } else {
            $("#ing4").html(ingredients4).show();
          }
          $(".instructions").html(instructions);
          console.log(response.drinks[0]);
          // console.log(response.drinks);
          // console.log(instructions);
          // console.log(nameofDrink);
          // console.log(Object.entries(response));
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
          var nameofDrink = response.drinks[0].strDrink;
          var instructions = response.drinks[0].strInstructions;
          var ingredients1 = response.drinks[0].strMeasure1 + " " + response.drinks[0].strIngredient1;
          var ingredients2 = response.drinks[0].strMeasure2 + " " + response.drinks[0].strIngredient2;
          var ingredients3 = response.drinks[0].strMeasure3 + " " + response.drinks[0].strIngredient3;
          var ingredients4 = response.drinks[0].strMeasure4 + " " + response.drinks[0].strIngredient4;
          var ingredient1 = response.drinks[0].strIngredient1;
          var measure1 = response.drinks[0].strMeasure1;
          var ingredient2 = response.drinks[0].strIngredient2;
          var measure2 = response.drinks[0].strMeasure2;
          var measure3 = response.drinks[0].strMeasure3;
          var ingredient3 = response.drinks[0].strIngredient3;
          var measure4 = response.drinks[0].strMeasure4;
          var ingredient4 = response.drinks[0].strIngredient4;
          var imgURL = response.drinks[0].strDrinkThumb + "/preview";
          $(".drinkImg").attr("src", imgURL);
          $(".drinkName").html(nameofDrink);
          $("#ing1").empty().hide();
          $("#ing2").empty().hide();
          $("#ing3").empty().hide();
          $("#ing4").empty().hide();
          if (measure1 === null && ingredient1 != null) {
            $("#ing1").html(ingredient1).show();
          }
          else {
            $("#ing1").html(ingredients1).show();
          }
          if (measure2 === null && ingredient2 != null) {
            $("#ing2").html(ingredient2).show();
          }
          else {
            $("#ing2").html(ingredients2).show();
          }
          if (measure3 === null && ingredient3 === null) {
            console.log(ingredients3);
            $("#ing3").empty().hide();
          } else if (measure3 === null && ingredient3 != null) {
            $("#ing3").html(ingredient3).show();
            console.log(ingredient3);
          } else {
            $("#ing3").html(ingredients3).show();
          }
          if (measure4 === null && ingredient4 === null ) {
            console.log(ingredients4);
            $("#ing4").empty().hide();
          } else if (measure4 === null && ingredient4 != null) {
            $("#ing4").html(ingredient4).show();
            console.log(ingredient4);
          } else {
            $("#ing4").html(ingredients4).show();
          }
          $(".instructions").html(instructions);
          console.log(response.drinks[0]);
          // console.log(response.drinks);
          // console.log(instructions);
          // console.log(nameofDrink);
          // console.log(Object.entries(response));
        })
}

function getRandom() {
  var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

  // Perfoming an AJAX GET request to our queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })
      .then(function (response) {
        var nameofDrink = response.drinks[0].strDrink;
        var instructions = response.drinks[0].strInstructions;
        var ingredients1 = response.drinks[0].strMeasure1 + " " + response.drinks[0].strIngredient1;
        var ingredients2 = response.drinks[0].strMeasure2 + " " + response.drinks[0].strIngredient2;
        var ingredients3 = response.drinks[0].strMeasure3 + " " + response.drinks[0].strIngredient3;
        var ingredients4 = response.drinks[0].strMeasure4 + " " + response.drinks[0].strIngredient4;
        var ingredient1 = response.drinks[0].strIngredient1;
        var measure1 = response.drinks[0].strMeasure1;
        var ingredient2 = response.drinks[0].strIngredient2;
        var measure2 = response.drinks[0].strMeasure2;
        var measure3 = response.drinks[0].strMeasure3;
        var ingredient3 = response.drinks[0].strIngredient3;
        var measure4 = response.drinks[0].strMeasure4;
        var ingredient4 = response.drinks[0].strIngredient4;
        var imgURL = response.drinks[0].strDrinkThumb + "/preview";
        $(".drinkImg").attr("src", imgURL);
        $(".drinkName").html(nameofDrink);
        $("#ing1").empty().hide();
        $("#ing2").empty().hide();
        $("#ing3").empty().hide();
        $("#ing4").empty().hide();
        if (measure1 === null && ingredient1 != null) {
          $("#ing1").html(ingredient1).show();
        }
        else {
          $("#ing1").html(ingredients1).show();
        }
        if (measure2 === null && ingredient2 != null) {
          $("#ing2").html(ingredient2).show();
        }
        else {
          $("#ing2").html(ingredients2).show();
        }
        if (measure3 === null && ingredient3 === null) {
          console.log(ingredients3);
          $("#ing3").empty().hide();
        } else if (measure3 === null && ingredient3 != null) {
          $("#ing3").html(ingredient3).show();
          console.log(ingredient3);
        } else {
          $("#ing3").html(ingredients3).show();
        }
        if (measure4 === null && ingredient4 === null ) {
          console.log(ingredients4);
          $("#ing4").empty().hide();
        } else if (measure4 === null && ingredient4 != null) {
          $("#ing4").html(ingredient4).show();
          console.log(ingredient4);
        } else {
          $("#ing4").html(ingredients4).show();
        }
        $(".instructions").html(instructions);
        console.log(response.drinks[0]);
        // console.log(response.drinks);
        // console.log(instructions);
        // console.log(nameofDrink);
        // console.log(Object.entries(response));
      })
}


