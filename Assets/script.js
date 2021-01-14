// We need these in our script for searching
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.27.0/moment.min.js"></script>
// <script src="Assets/script.js"></script>







let drinkName;


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

});