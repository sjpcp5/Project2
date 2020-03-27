/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
const searchNumber = GetOffset();
const Limitsearch = "25";
const giphPhrases = {
  start: "Good luck",
  encourage: "https://api.giphy.com/v1/gifs/search?q=" + "thumbs up" + "&api_key=71957ReGgM9ed9MEpRgc0IVcliXGpSPq&limit=" + Limitsearch + "&offset=" + searchNumber + "&lang=en",
  seconds: "https://api.giphy.com/v1/gifs/search?q=" + "Times Running out" + "&api_key=71957ReGgM9ed9MEpRgc0IVcliXGpSPq&limit=" + Limitsearch + "&offset=" + searchNumber + "&lang=en",
  done: "https://api.giphy.com/v1/gifs/search?q=" + "Ill be back" + "&api_key=71957ReGgM9ed9MEpRgc0IVcliXGpSPq&limit=" + Limitsearch + "&offset=" + searchNumber + "&lang=en",
};
var goodLuck = "";


function GetOffset() {
  let offsetArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"];
  let randomNumber = Math.floor(Math.random() * 24);
  let searchNumber = offsetArray[randomNumber];
  console.log(searchNumber);
  return searchNumber;
}
// function resultEmpty() {
//   return $(".giphy").remove("src","");
// }
let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphPhrases.start + "&api_key=71957ReGgM9ed9MEpRgc0IVcliXGpSPq&limit=" + Limitsearch + "&offset=" + searchNumber + "&lang=en";

$(document).ready(function () {
  $("#modal#").modal();
  console.log("alert has been issued prepare image");
  console.log(queryURL,"e");
  $.ajax({
    url: done,
    method: "GET",
  })
    .then(function(response){
      let results = response.data;
      console.log(response, "B");
      for (var i = 0; i < results.length; i++) {
        let imageLink = results[i].images.downsized_large.url;
        let giphyImage = $("img").attr("src",imageLink);
        if (results[i].data === [0]) {
          return $(".giphyGL").append(giphyImage);
        }
      }
    });
});

// module.exports = giphPhrases;
