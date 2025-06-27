// ==UserScript==
// @author         0o0slytherinpride0o0
// @name           JN iDB - DTI Link for Wearables
// @version        1.0
// @description    Adds a link to DTI for wearable items in JN's iDB, 
//                 at the top of the "Find This Item" section
// @match          *://items.jellyneo.net/item/*
// ==/UserScript==

const once = {
  once: true,
};

function addDTIlink() {
  var closetLi = document.querySelector("div.find-this-item.text-small ul li:has(img[alt='Find in your Closet'])");
  if (closetLi != null) {
    var itemName = document.querySelector("h1").innerText;
    var itemNameURL = encodeURIComponent(itemName).replaceAll("%20", "+");

    var DTIli = closetLi.cloneNode(true);

    DTIli.children[0].href = "https://impress.openneo.net/items?q=" + itemNameURL;
    DTIli.children[0].children[0].src = "https://images.neopets.com/items/clo_shoyru_dappermon.gif";
    DTIli.children[0].children[0].alt = "Find on DTI";
    DTIli.children[0].children[0].title = "Find on DTI";
    DTIli.children[1].href = DTIli.children[0].href;
    DTIli.children[1].innerText = "Dress to Impress";

    closetLi.parentElement.insertBefore(DTIli, closetLi.parentElement.children[0]); 
  }
}

addEventListener("DOMContentLoaded", addDTIlink(), once);