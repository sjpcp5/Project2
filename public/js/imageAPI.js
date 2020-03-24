/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
const axios = require("axios");

const searchNumber = GetOffset();
const Limitsearch = "1";
let counter = 0;
const queryURL = "https://api.giphy.com/v1/gifs/search?q=" + monster + "&api_key=71957ReGgM9ed9MEpRgc0IVcliXGpSPq&limit=" + Limitsearch + "&offset=" + searchNumber + "&lang=en";


function GetOffset() {
  let offsetArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"];
  let randomNumber = Math.floor(Math.random() * 24);
  let searchNumber = offsetArray[randomNumber];
  console.log(searchNumber);
  return searchNumber;
}
// function gets the last word of the clicked monster
function getLastWord() {
  let noHyphens = monsterSearch.replace(/-/g, " ");
  let noun = noHyphens.split(" ");
  console.log(noun);
  return noun[noun.length - 1];
}

$(document).on("click", ".click_this", function () {
  console.log("monster has been clicked prepare image");
  monsterSearch = $(this).data("name");
  console.log(monsterSearch);

  // gets the last word of the clicked monster result
  var monster = getLastWord(monsterSearch);
  console.log(monster);


  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    var results = response.data;

    // ========================

    for (var i = 0; i < results.length; i++) {

      var monsterImage = $("img").attr("src", results[i].images.downsized_large.url);

      //monsterDiv.append(p);
      //monsterDiv.append(monsterImage);
      if (results[i].data === [0]) {
        resultEmpty();
      } else {
        $(".giphy").empty(monsterImage);
        $(".giphy").append(monsterImage);
      }
      counter++;
      console.log("clicked.." + counter);
    }
    console.log(response);
    // ==================================
  });

});

function resultEmpty() {
  return $(".giphy").remove(monsterImage);
}
//if statement if results do not match name of image do not append
// need a function that nullifies append of image or do nothing
// condition variable
// compare function of JSON data and monster variable
//if monster does not match results don't append img else append img


/* function init() {
    inquirer
        .prompt(questions)
        .then(function(input) {
            favColor = input.color;
            username = input.username;
            console.log(input, "prompt answers");
            const queryUrl = `https://api.github.com/users/${username}`;

            axios
                .get(queryUrl)
                .then((res) => {
                    //console.log(res.data, "response 1 data")

                    console.log(favColor, "is the color");
                    data.username = username;
                    data.numOfRepo = res.data.public_repos;
                    data.name = res.data.name;
                    data.followers = res.data.followers;
                    data.following = res.data.following;
                    data.portPic = res.data.avatar_url;
                    data.location = res.data.location;
                    data.blog = res.data.blog;
                    data.company = res.data.company;
                    data.bio = res.data.bio;
                    data.color = favColor;

                    axios // axios call a to get stars
                        .get(`https://api.github.com/users/${username}/repos?per_page=100`)
                        .then((res) => {
                            console.log("2nd axios call successful");
                            data.stars = 0;
                            for (let i = 0; i < res.data.length; i++) { // Loop through each repository and count the number of stars
                                data.stars += res.data[i].stargazers_count;
                            };

                        })
                        .then(function() {
                            console.log(`Successful axios calls and prompts`, data)
                            writeToFile(data);

                        })
                        .catch(function(error) {
                            console.log("please enter a valid Github username or other", error);
                            return
                        });
                })
        });
init() */