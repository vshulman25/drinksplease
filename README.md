
# Drinks, please!!

**Project members:  Matthew Duffield, Julia Green, Moe Kassem, Vickee Shulman**


**Description and Scope of project**: In a coding bootcamp group project, the objective is to learn how to work together in an agile development methodology, as well as design, implement, debug and publish a client-side polished app using server side API's.

**Application Proposal**: User story
I can use this app to help me find a unique drink, the ingredients and directions to make the drink.
As the weather is different in many places and affects the type of drink I prefer,  entering a city will present me with a drink that is compatible with the current weather.
If I prefer to see a different drink, I can get a random drink suggestion. 

**Summary**
The “Drinks, Please” web application is an interactive tool for a user to research a drink based on their location. The featured drink is presented to the user with an image, ingredients list and a set of directions to make the drink.
The result is randomized to a set of drinks that are classified as “cold weather”/warm drinks and “warm weather”/cold drinks.  
When the user inputs a city, an API call to openweathermap.org will determine the current temperature in Fahrenheit.  If the temperature is < 50 degrees Fahrenheit, a warm drink is presented using a random value in a predetermined array and an API call is made to thecocktaildb to get the image, ingredients and instructions.  If the temperature is > 50 degrees Fahrenheit, a cold drink is presented.  The API call is randomized to return a drink that is NOT in the hot drinks array.
If a user does not care for the featured drink, they can click a “Hit me again” button to be presented with a randomized drink from the drinks database. 

**Technologies Used:

  *CSS Framework: Foundation 

  *Server Side APIs : openweather.org and thecocktaildb.com

  *Github page deployment link: https://github.com/vshulman25/drinksplease

  *Interactivity : User is prompted for drink preference and location, uses OpenWeather API to determine local weather and then returns a drink suggestion to the user

  *Screenshot: https://github.com/vshulman25/drinksplease/blob/main/Assets/drinksplease.png


**Other Items of Interest**

--Responsive layout : We used the Foundation framework, which is mobile-responsive

--Uses modals : The Foundation framework had a robust and mature form that we could use to capture the user location / city.

--Uses client-side storage : We are storing the user's cities in the "locationofuser".  Further development includes returning this to the screen as well as providing a user navigated history of the drinks.

--Polished UI : We were able to deploy the working app early and spend some time finalizing the "fit and finish" using Shutterstock images and webkits.

--Clean repo : The repo has multiple commits from each user and all team members worked on the project management tasks. 


Presentation Slide Deck: https://docs.google.com/presentation/d/151rPxalmkVx5wA2Nv7iQw2c8j26kcdOa8j70wSz3xVA/edit?usp=sharinggit 
