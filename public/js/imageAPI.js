/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
const searchNumber = GetOffset();
const Limitsearch = "1";
const giphPhrases = {
  start: initGiph("Good luck"),
  encourage: initGiph("thumbs up"),
  seconds: initGiph("times running out"),
  done: initGiph("I'll be back"),
};


function GetOffset() {
  let offsetArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"];
  let randomNumber = Math.floor(Math.random() * 24);
  let searchNumber = offsetArray[randomNumber];
  console.log(searchNumber);
  return searchNumber;
}
function resultEmpty() {
  return $(".giphy").remove(giphyImage);
}


$(document).on("click", ".click_this", function () {
  console.log("alert has been issued prepare image");
  return giphPhrases.done
});

function initGiph(info) {
  let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + info + "&api_key=71957ReGgM9ed9MEpRgc0IVcliXGpSPq&limit=" + Limitsearch + "&offset=" + searchNumber + "&lang=en";
  $.ajax({
    url:queryUrl,
    method: "GET"
  })
    .then((res) => {

      let results = response.data;
      console.log(res, "B");

      for (var i = 0; i < results.length; i++) {
        let giphyImage = $("img").attr(`src= ${results[i].images.downsized_large.url}`);
        if (results[i].data === [0]) {
          return resultEmpty();
        } else {
          return $(".giphy").append(giphyImage);
        }
      }
    })
    .catch(function(error) {
      console.log("C", error);
      return;
    });
}
module.exports = giphPhrases;