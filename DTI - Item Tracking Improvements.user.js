// ==UserScript==
// @author         0o0slytherinpride0o0
// @name           DTI - Item Tracking Improvements
// @version        1.0
// @description    In the "Track this in Your Items" box on an item's page: 
//                 Helps you track if an item is already on an own/want list by:
//                 	 *** Adding a ??? in the header if the item is already on a list (or an ??? if not)
//                 Helps you track *which* list an item is on by:
//                 	 *** Adding a light green background to the input boxes for items you own (i.e., lists with quantity > 0)
//                 	 *** Adding a light purple background to the input boxes for items you want (i.e., lists with quantity > 0)
//                 Note that this must run on every page because of how DTI handles internal links
//                 (i.e., going from the main page to an item's page)
//                 Otherwise you have to refresh the page for it to work
//                 Or I'd have to do something funky that is beyond my expertise at the moment
// @match          *://impress.openneo.net/*
// ==/UserScript==

var scriptCSS = `
.closet-hangers-ownership-groups div:first-child input[type="number"][name^="quantity"]:not([value="0"]) {
	background-color: #cfffcf;
}
.closet-hangers-ownership-groups div:last-child input[type="number"][name^="quantity"]:not([value="0"]) {
	background-color: #ece0ff;
}
.closet-hangers-ownership-groups div:has(input:not([value="0"])) h4:after {
    content: " \u2705";
}
.closet-hangers-ownership-groups div:not(:has(input:not([value="0"]))) h4:after {
    content: " \u274C";
}
`
const scriptStyle = document.createElement("style");
scriptStyle.innerHTML = scriptCSS;
document.head.appendChild(scriptStyle);

// this just updates the "value" attribute of the input to whatever is currently in the box
// that way, if you change it, the added CSS rules will take effect dynamically
document.addEventListener("change", function(event) {
  if (event.target.tagName == "INPUT" && document.URL.includes("impress.openneo.net/items/")) {
    event.target.setAttribute("value", event.target.value);
  }
});

// this just fixes it if you reload the page
// DTI (or your browser?) remembers changes if you reload (but they aren't saved yet), 
// so this reapplies the CSS rules when this happens
// it does *not* change your data, just the appearance based on what's currently in the inputs
var inputArr = Array.from(document.querySelectorAll('.closet-hangers-ownership-groups input[type="number"][name^="quantity"]'));
document.addEventListener("DOMContentLoaded", function() {
  inputArr.filter(input => input.value != input.getAttribute("value")).forEach(input => {
    input.setAttribute("value", input.value);
  });
});
