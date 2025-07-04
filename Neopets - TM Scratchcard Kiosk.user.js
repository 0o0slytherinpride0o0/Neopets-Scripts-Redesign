// ==UserScript==
// @author         0o0slytherinpride0o0
// @name           Neopets - TM Scratchcard Kiosk
// @version        1.0
// @description    Fixes the broken images, adds a back button, selects the first card in the dropdown, counts number scratched
// @match          *://www.neopets.com/winter/kiosk.phtml
// @match          *://www.neopets.com/winter/kiosk2.phtml
// ==/UserScript==

if (document.URL.endsWith("kiosk.phtml")) {
  var today = new Date().toLocaleString('en', {
    day: 'numeric',
    month: 'numeric',
    timeZone: 'America/Los_Angeles'
  });
  
  var storedDay = localStorage.getItem("monkeyScriptTMKioskDay");
  if (storedDay == null || storedDay != today) {
    localStorage.setItem("monkeyScriptTMKioskDay", today);
    localStorage.setItem("monkeyScriptTMKioskCount", 0);
  } 
  
  var count = localStorage.getItem("monkeyScriptTMKioskCount");
  var countDiv =  document.createElement("div");
  countDiv.style = "color: darkblue; font-size: 12pt; margin: auto; padding: 3px 5px; width: fit-content;";
  countDiv.innerHTML = "Scratched for today: <b>" + count + " / 5</b>";
  
  var dropdown = document.querySelector("select[name='card_id']");
  if (dropdown != null) {
    dropdown.options[1].selected = true;
    dropdown.parentElement.nextElementSibling.after(countDiv);
  }

} else {
  // only the images for the first 3 prizes seem to be broken
  // although I have no idea WHY they are broken... this fixes it
  var brokenImgs = document.querySelectorAll('td.content table table td[width="50"] img:is([src$="1.gif?v=1"],[src$="2.gif?v=1"],[src$="3.gif?v=1"])');
  for (img of brokenImgs) {
    img.src = img.src.replace("?v=1","");
  }
  
  var defaultButton = document.querySelector('input[value="Back to Happy Valley"]');
  
  if (defaultButton != null) {
    localStorage.setItem("monkeyScriptTMKioskCount", Number(localStorage.getItem("monkeyScriptTMKioskCount")) + 1);
    
    var backButton = document.createElement("a");
    backButton.style = `
    display: block; 
    width: fit-content; 
    background-color: #DBF1FF; 
    border: 1px solid #000000; 
    border-radius:3px;
    color: #000000;
    font-weight: normal;
    padding: 3px 5px; 
    margin: 10px auto 0px; 
    cursor: pointer;
    `
    backButton.innerText = "Back to Kiosk";
    backButton.href = "https://www.neopets.com/winter/kiosk.phtml";
    defaultButton.parentElement.after(backButton);
  }
}
