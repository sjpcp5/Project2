# Project2 Covid-Vaccine Typer
Saphirah Pociluyko, Christopher Wood, Lawrence De Belen, Andrew Myers

## USERSTORY:
AS A young professional, I WANT to better my typing in speed, skill, and accuracy , SO THAT I will be more competitive and more efficient as an employee. 

## Covid-Vaccine Typer
Covid-Vaccine Typer is a fast-paced typing game aimed at improving typing speed, skill, and accuracy across 

## Motivation
At Beer Me, we wanted to build out a beer-specific app to cut through the noise and get to the heart of delicious beers available within a close proximity.

## Screenshots
![BeerMe](https://user-images.githubusercontent.com/56936352/73216540-c9930780-411b-11ea-8f59-0eccb069f68f.png)


## Features
Beer Me simplifies users search for local breweries.

## Code Example
  function citySearch(e) {
    e.preventDefault();

    if ($("#cityInput").val() !== "") {
      //only run event if search form isn't empty
      $("#cardDiv").hide();

      let city = $("#cityInput").val();

      const queryURL = `https://api.foursquare.com/v2/venues/explore?client_id=VBSRR4N0G21AGXXAQBIVHVETVMY5EMFV20R2AFBIENJKXHR2&client_secret=CI51EWKVLWPWG4YXIT1LR5OOKWDJDM3OLQVJBZRPC0QPCD0V&v=20180323&limit=10&near=${city}&query=brewery`;
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        $("#map").show();
        $('html, body').animate({
          scrollTop: ($('#map').offset().top)
      },500);

## How to use?
Enter desired city name.  A map will populate close breweries where you will be able to select a brewery and view it's name and address. By clicking "More Details" in the pop-up you can view the brewery's price rating, phone number, and website.

## Links
https://ajmyers5.github.io/Group-666/
https://github.com/ajmyers5/Group-666

