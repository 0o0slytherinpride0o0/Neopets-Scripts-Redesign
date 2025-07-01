// ==UserScript==
// @author         0o0slytherinpride0o0
// @name           Neopets - FC Bet Counter
// @version        1.0
// @description    Adds a simple count of FC bets in the table header
// @include        *://www.neopets.com/pirates/foodclub.phtml?type=current_bets
// ==/UserScript==

var betTable = document.querySelector("table[border='0'][cellpadding='4'][cellspacing='2'][width='500'][bgcolor='black']");
if (betTable != null) {
  var count = betTable.children[0].children.length - 3;
	betTable.querySelector("tbody tr td font b").innerText += " --- Count: " + count + (count == 10 ? "\u2705" : "");
}
