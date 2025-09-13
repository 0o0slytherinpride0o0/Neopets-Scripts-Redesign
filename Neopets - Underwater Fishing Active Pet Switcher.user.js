// ==UserScript==
// @name           Neopets - Underwater Fishing Active Pet Switcher
// @version        1.0
// @description    Adds a dropdown so you can change your active pet while you fish.
// @match          *://*.neopets.com/water/fishing.phtml*
// @match          *://*.neopets.com/home/index.phtml
// @author         0o0slytherinpride0o0
// @namespace      https://github.com/0o0slytherinpride0o0/
// ==/UserScript==

(function() {

  'use strict';

  const once = {
    once: true,
  };

  var petList = JSON.parse(localStorage.getItem("monkeyScriptGeneralPetNames") || "null");  

  function fish() {
    var fishAgainButton = document.querySelector("a[href$='/water/fishing.phtml'] button");

    if (!fishAgainButton || !fishAgainButton.innerText.includes("Again")) {

      var p = document.createElement("p");
      p.style.color = "darkblue";
      var b = document.createElement("b");
      b.style = "display:block;margin-bottom:8px;font-size:13pt;";
      b.innerText = "Underwater Fishing User Script"
      var span = document.createElement("span");
      span.style = "display:block;";
      document.querySelector("#container__2020").appendChild(p);
      p.appendChild(b);
      p.appendChild(span);

      var getButton = document.createElement("a");
      getButton.style=`
      padding:3px 6px;
      background-color:#E9E9ED;
      outline:1px solid #8F8F9D;
      border-radius:5px;
      color:#000;
      display:block;
      width:fit-content;
      margin: 8px auto 0px;
      `;
      getButton.href = "https://www.neopets.com/home/index.phtml";

      p.appendChild(getButton);

      if (!petList) {
        span.innerText = "Click below to go to the Homepage to store a list of your pets' names."
        getButton.innerText = "Homepage";

      } else {
        getButton.innerText = "Clear List of Pet Names";
        
        const controller = new AbortController();

        getButton.addEventListener("click", (event) => {
          event.preventDefault();
          localStorage.removeItem("monkeyScriptGeneralPetNames");
          span.innerText = "Click below to go to the Homepage to store a list of your pets' names."
          getButton.innerText = "Homepage";
   				controller.abort();
          
        }, { signal: controller.signal });
        
      } 

    } else if (fishAgainButton && fishAgainButton.innerText.includes("Again") && petList) {
      var activePet = document.querySelector(".profile-dropdown-link[href*='petlookup.phtml']").innerText;

      var p = document.createElement("p");
      fishAgainButton.parentElement.after(p);

      var select = document.createElement("select");
      select.id = "monkeyScriptActivePetSelect";
      petList.forEach(pet => {
        var option = document.createElement("option"); 
        option.value = pet; 
        option.innerText = pet; 
        select.appendChild(option);
      });
      p.appendChild(select);

      var button = document.createElement("button");
      button.id = "monkeyScriptActivePetButton";
      button.className="button-default__2020 button-blue__2020 btn-single__2020";
      p.appendChild(button);

      select.addEventListener("change", (event) => {
        button.innerText = "Set " + event.target.value + " as your active";
        button.classList.remove("button-green__2020");
        button.classList.remove("button-red__2020");
        button.classList.add("button-blue__2020");
      });
      select.selectedIndex = (petList.indexOf(activePet) + 1) % petList.length;
      button.innerText = "Set " + select.selectedOptions[0].value + " as your active";

      button.addEventListener("click", () => {	
        var nextPet = document.querySelector("#monkeyScriptActivePetSelect").selectedOptions[0].value;
        fetch(`https://www.neopets.com/process_changepet.phtml?new_active_pet=${encodeURIComponent(nextPet)}`, {
          method: "GET",
          credentials: "include" // important so cookies/session are sent
        })
          .then(response => {
          if (response.ok) {
            button.classList.remove("button-blue__2020");
            button.classList.add("button-green__2020");
            button.innerText = select.selectedOptions[0].value + " is now active!";
          } else {
            button.innerText = "Error. Please try again.";
            button.classList.remove("button-blue__2020");
            button.classList.add("button-red__2020");
          }
        });
      }); 
    }
  }    

  function petNames() {
    var list = [...document.querySelectorAll(".slick-slide:not(.slick-cloned) .hp-carousel-pet[data-name]")]
    					  .map(div => div.getAttribute("data-name"));
    if (list.length) {
      localStorage.setItem("monkeyScriptGeneralPetNames",JSON.stringify(list));
      var dialog = document.createElement("dialog");
      dialog.setAttribute("open","true");
      dialog.style = "z-index:999;text-align:center;";
      dialog.innerHTML = `
      <form method="dialog">
        <button>Close</button>
			</form>
			Pet List Saved!<br><br>
      <a href="https://www.neopets.com/water/fishing.phtml">Underwater Fishing</a>
      `
      document.querySelector("#container__2020").appendChild(dialog);
    }
    
  }

  function init() {
    if (document.URL.includes("neopets.com/water/fishing.phtml")) {
      fish();
    } else if (document.URL.includes("neopets.com/home/index.phtml") && !petList) {
      petNames();
    }
  }

  if (document.readyState === 'complete') {
    init();
  } else {
    window.addEventListener('load', init, once);
  }

})();
