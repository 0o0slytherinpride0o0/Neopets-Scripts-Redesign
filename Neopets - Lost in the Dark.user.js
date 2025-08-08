// ==UserScript==
// @author         0o0slytherinpride0o0
// @name           Neopets - Lost in the Dark
// @version        1.0
// @description    Guides you to the chest & the exit
// @match          *://www.neopets.com/games/lostinthedark/*
// ==/UserScript==

const labelArr = ["Chest: ", "Exit: "];
const dirArr = ["left", "straight", "right"];

var ears = document.querySelector("img[src*='images.neopets.com/plots/tvw/activities/lost-in-the-dark/images/lid-styx-ears-']");

if (ears) {
  const earsArr = ears.src.match(/left|straight|right/g);
  
  var innerTextArr = dirArr.map(dir => {
    var i = earsArr.indexOf(dir);
    if (i != -1) {
      return labelArr[i] + dir;
    } else {
      return ""
    }
  });
  
  var div = document.createElement("div");
  div.style = "display: flex; width: 100%; margin-top: 10px;"
  div.innerHTML = `
  <p style="flex-basis: 33%; font-weight: bold; font-size: 18pt;">${innerTextArr[0]}</p>
  <p style="flex-basis: 33%; font-weight: bold; font-size: 18pt;">${innerTextArr[1]}</p>
  <p style="flex-basis: 33%; font-weight: bold; font-size: 18pt;">${innerTextArr[2]}</p>
  `
  
  document.querySelector(".image-overlay-container").after(div);
}
