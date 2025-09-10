// ==UserScript==
// @name           Neopets - User Shops Item Autofocus
// @version        1.1
// @description	   Autofocuses the item you want to buy in a user's shop, scrolling it into view & making it so you just have to hit Enter (twice) to purchase!
//                 (Set focusVisible to true if you want the link to be highlighted)
// @author         0o0slytherinpride0o0
// @match          *://www.neopets.com/browseshop.phtml?owner=*
// ==/UserScript==

document.addEventListener("DOMContentLoaded", () => {
  var link = document.querySelector('div:has(+ hr[size="1"][width="75%"]) a[onclick]');
  if (link) {
    link.setAttribute("tabindex","-1");
    link.focus({ focusVisible: false }); // set to true if you want the link highlighted
  }
}, { once: true });
