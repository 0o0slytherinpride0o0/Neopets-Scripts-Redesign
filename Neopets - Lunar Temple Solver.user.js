// ==UserScript==
// @author         0o0slytherinpride0o0
// @name           Neopets - Lunar Temple Solver
// @version        1.0
// @description    Highlights the correct answer for the Lunar Temple Daily
// @match          *://www.neopets.com/shenkuu/lunar/?show=puzzle*
// ==/UserScript==

var angleKreludor = document.querySelector("td.content").innerHTML.match(/angleKreludor=([0-9]*)&/);
var answerTable = document.querySelector("td.content form[method='post'][action='results.phtml']");

if (angleKreludor != null && answerTable != null) {

  // the solution according to JN is just dividing by 22.5 and rounding
  // also 0 and 16 have the same solution
  var solutionNum = Math.round(Number(angleKreludor[1])/22.5) % 16;

  // the image numbers don't match the solution numbers though:
  // the image numbers are 0-15 from the top left to the bottom right
  // the solution numbers are 0-15 from the bottom left to the top right
  // so the new moon (all black) is the image 0.gif but 8 is the solution number
  const imageNumArr = Array(8).fill(1).map((x, index) => index + 8).concat(Array(8).fill(1).map((x, index) => index));
  var imageNum = imageNumArr[solutionNum];

  var solutionImg = answerTable.querySelector('img[src="https://images.neopets.com/shenkuu/lunar/phases/' + imageNum + '.gif"]');
  solutionImg.setAttribute("style", "border: 3px solid red");
}
