// ==UserScript==
// @author         0o0slytherinpride0o0
// @name           Neopets - Lab Ray & Petpet Lab Ray Improvements
// @version        1.0
// @description    Adds Pet names to the Lab Ray and Petpet Lab Ray selection pages
//                 Optional:
//                 Adds visual reminders to help you zap the right pet/petpet
//                 *** This does NOT prevent you from zapping the wrong Pet/Petpet! ***
//                 Provides a simple interface to store your preferences
//                 (Just click on the Mynci!)
// @match          *://www.neopets.com/lab.phtml*
// @match          *://www.neopets.com/lab2.phtml*
// @match          *://www.neopets.com/petpetlab.phtml*
// ==/UserScript==

// this is just CSS to make the added elements pretty (and work)
var scriptCSS = `
  #monkeyScriptContainer {
  	margin: 8px auto 22px;
    width: 450px;
    text-align: center;
  }
  #monkeyScriptIcon {
  	height: 30px; 
    width: 30px; 
    cursor: pointer;
  }
  #monkeyScriptOptionsDiv {
    background-color: #DBF1FF;
		border: 1px solid #4A9BCF; 
    border-radius: 3px;
		padding: 5px; 
		margin: 5px auto;
    text-align: center;
  }
  #monkeyScriptOptionsDiv > div:not(:last-child), 
  .monkeyScriptInputGroup, p {
  	margin: 0px auto 15px;
  }
  #monkeyScriptInstructions {
  	text-align: justify;
  }
  #monkeyScriptInstructions ul {
  	margin: 6px auto;
  	padding-left: 20px;
  }
  #monkeyScriptInputDiv label {
		display: inline-block;
    width: 70px;
    height: 19.5px;
    line-height: 19.5px;
    padding: 0px;
    text-align: right;
  }
  #monkeyScriptButtonDiv div:first-child {
  	display: block;
  	width: fit-content;
  	margin: 0px auto 5px;
  }
  .monkeyScriptOptionButton {
    display: inline-block;
    border: 1px solid #808080;
    background-color: #E0E0E0;
    border-radius: 3px;
    padding: 2px 8px; 
    cursor: pointer;
    user-select: none;
  }
  .monkeyScriptHideOptions + #monkeyScriptOptionsDiv,
  .monkeyScriptHiddenText {
  	display: none;
  }
  #monkeyScriptResultTextDiv {
    width: 450px;
    text-align: center;
  	position: absolute;
  	z-index: 999;
    color: darkgreen;
  }
`

// this is the HTML to add the elements to the page
var scriptHTML = `
<div id="monkeyScriptContainer">
  <img id="monkeyScriptIcon" class="monkeyScriptIcon monkeyScriptHideOptions" 
       onclick="this.classList.toggle('monkeyScriptHideOptions')" 
       src="https://images.neopets.com/items/toy_rag_mynci.gif" 
       title="Click to set user script options">
	
  <div id="monkeyScriptOptionsDiv">
    
    <div id="monkeyScriptInstructions">
      <p>Enter the <b>username</b> of each account you want this script to apply to.</p>

      <span>For each account, in the corresponding textboxes:</span>
      <ul>
        <li>Enter the <b>full name</b> of each <b>Pet you want to zap</b>.</li>
        <li>Enter the <b>full name</b> of each <b>Pet whose <i>Petpet</i> you want to zap</b>.</li>
      </ul>
      
      <p><sub>(leave blank if none & separate names (<font style="background-color: #E0E0E0;">, </font>) if multiple)</sub></p>
    </div>

    <div id="monkeyScriptInputDiv">
      <div id="monkeyScriptInputGroup1" class="monkeyScriptInputGroup">
        <label for="monkeyScriptLabAccount1">Account 1:</label>
        <input type="text" name="monkeyScriptLabAccount1" class="monkeyScriptAccountInput" size="28" placeholder="username"><br>
        <label for="monkeyScriptLabPets1">Pets:</label>
        <input type="text" name="monkeyScriptLabPets1" class="monkeyScriptPetInput" size="28" placeholder="Pet1, Pet2"><br>
        <label for="monkeyScriptLabPetpets1">Petpets:</label>
        <input type="text" name="monkeyScriptLabPetpets1" class="monkeyScriptPetpetInput" size="28" placeholder="Pet1, Pet2">
      </div>

      <div id="monkeyScriptInputGroup2" class="monkeyScriptInputGroup">
        <label for="monkeyScriptLabAccount2">Account 2:</label>
        <input type="text" name="monkeyScriptLabAccount2" class="monkeyScriptAccountInput" size="28"><br>
        <label for="monkeyScriptLabPets2">Pets:</label>
        <input type="text" name="monkeyScriptLabPets2" class="monkeyScriptPetInput" size="28"><br>
        <label for="monkeyScriptLabPetpets2">Petpets:</label>
        <input type="text" name="monkeyScriptLabPetpets2" class="monkeyScriptPetpetInput" size="28">
      </div>

      <div id="monkeyScriptInputGroup3" class="monkeyScriptInputGroup">
        <label for="monkeyScriptLabAccount3">Account 3:</label>
        <input type="text" name="monkeyScriptLabAccount3" class="monkeyScriptAccountInput" size="28"><br>
        <label for="monkeyScriptLabPets3">Pets:</label>
        <input type="text" name="monkeyScriptLabPets3" class="monkeyScriptPetInput" size="28"><br>
        <label for="monkeyScriptLabPetpets3">Petpets:</label>
        <input type="text" name="monkeyScriptLabPetpets3" class="monkeyScriptPetpetInput" size="28">
      </div>

      <div id="monkeyScriptInputGroup4" class="monkeyScriptInputGroup">
        <label for="monkeyScriptLabAccount4">Account 4:</label>
        <input type="text" name="monkeyScriptLabAccount4" class="monkeyScriptAccountInput" size="28"><br>
        <label for="monkeyScriptLabPets4">Pets:</label>
        <input type="text" name="monkeyScriptLabPets4" class="monkeyScriptPetInput" size="28"><br>
        <label for="monkeyScriptLabPetpets4">Petpets:</label>
        <input type="text" name="monkeyScriptLabPetpets4" class="monkeyScriptPetpetInput" size="28">
      </div>

      <div id="monkeyScriptInputGroup5" class="monkeyScriptInputGroup">
        <label for="monkeyScriptLabAccount5">Account 5:</label>
        <input type="text" name="monkeyScriptLabAccount5" class="monkeyScriptAccountInput" size="28"><br>
        <label for="monkeyScriptLabPets5">Pets:</label>
        <input type="text" name="monkeyScriptLabPets5" class="monkeyScriptPetInput" size="28"><br>
        <label for="monkeyScriptLabPetpets5">Petpets:</label>
        <input type="text" name="monkeyScriptLabPetpets5" class="monkeyScriptPetpetInput" size="28">
      </div>

      <div id="monkeyScriptOptionAddAccount" class="monkeyScriptOptionButton" 
      		 title="Add another account">+ Account</div>
		</div>

    <div id="monkeyScriptButtonDiv">
      <div id="monkeyScriptOptionSave"  class="monkeyScriptOptionButton">Save</div>
      <div id="monkeyScriptOptionClear" class="monkeyScriptOptionButton">Clear Form</div>
      <div id="monkeyScriptOptionDelete" class="monkeyScriptOptionButton">Delete Data</div>
    </div> 
  </div>
	
  <div id="monkeyScriptResultTextDiv">
  	<span id="monkeyScriptSaveError" class="monkeyScriptHiddenText" style="color: red;">There's a problem with your options, please try again.</span>
  	<span id="monkeyScriptSaveText"  class="monkeyScriptHiddenText">Options saved successfully!</span>  
  	<span id="monkeyScriptClearText" class="monkeyScriptHiddenText">Form cleared!</span>
  	<span id="monkeyScriptDeleteText" class="monkeyScriptHiddenText">Saved data successfully deleted.</span>
  </div>
</div>
`

// this is CSS to stylize Pets on the Lab Ray Selection Page
var labRatCSS = `
.monkeyScriptLabRat {
  height: fit-content !important;
}
.monkeyScriptLabRat span {
  display: block; 
  padding-top: 12px;
  color: darkblue;
  font-weight: bold;
}
.monkeyScriptNoZap span {
  color: #545454;
  font-weight: normal;
}
.monkeyScriptNoZap b {
  color: #B4B4B4; 
  font-weight: normal;
}
.monkeyScriptNoZap img {
  opacity: 0.3;
}
#monkeyScriptLabRatP {
  color: darkblue; 
  display: block; 
  font-size: 14pt !important; 
  font-weight: bold; 
  padding-top: 15px;
  text-align: center;
}
`

// this is CSS to stylize Petpets on the Petpet Lab Ray Selection Page
var p2labRatCSS = `
.monkeyScriptP2LabRat span {
	display: block; 
  margin-bottom: 8px; 
  padding: 3px 0px 5px; 
  background-color: darkblue;
  color: #FFFFFF;
  font: bold small-caps 10pt verdana;
  line-height: 16px;
}
.monkeyScriptP2NoZap {
	background-color: #F7F7F7;
}
.monkeyScriptP2NoZap span {
	background-color: #949494;
  color: #F7F7F7;
}
.monkeyScriptP2NoZap {
  color: #949494; 
  font-weight: normal;
}
.monkeyScriptP2NoZap img {
  opacity: 0.3;
}
`
// toggles a class for s seconds
// default is the monkeyScriptHiddenText class for 2 seconds
function toggleClassTime(element, classToToggle = 'monkeyScriptHiddenText', s = 2) {
  element.classList.toggle(classToToggle);
  setTimeout(function() {
    element.classList.toggle(classToToggle);
  }, s * 1000);
}

// only checks for very basic errors, like leaving a username blank
// however, it allows you to fill in the username and leave the Pet & Petpet boxes blank
// in case you want to keep your usernames ready for when you want to have a Pet/Petpet to zap
function saveOptions() {
  var error = false;
  var saveText = '#monkeyScriptSaveText';
	
  for (let i = 0; i < accountInputs.length; i++) {
    if (accountInputs[i].value == "" && (petInputs[i].value != "" || petpetInputs[i].value != "")) {
      error = true;
      saveText = '#monkeyScriptSaveError';
      break;
    }
  }

  var saveTextElement = document.querySelector(saveText);

  if (!error) {
    monkeyIcon[0].classList.add('monkeyScriptHideOptions');

    for (let i = accountInputs.length - 1; i >= 0; i--) {
      if (accountInputs[i].value == "") {
        localStorage.removeItem(accountInputs[i].getAttribute("name"));
        localStorage.removeItem(petInputs[i].getAttribute("name"));
        localStorage.removeItem(petpetInputs[i].getAttribute("name"));
        if (accountInputs.length != 1) {
          accountInputs[i].parentElement.remove();
        } else {
          nameInputGroup(1, accountInputs[i].parentElement, false);
        }
      } 
    }
    
    for (let i = 0; i < accountInputs.length; i++) {
      if (accountInputs[i].getAttribute("name").search(new RegExp("[^0-9]" + (i + 1) + "$")) == -1) {
        nameInputGroup(i+1, accountInputs[i].parentElement, false);
      }
        localStorage.setItem(accountInputs[i].getAttribute("name"), accountInputs[i].value);
        localStorage.setItem(petInputs[i].getAttribute("name"), petInputs[i].value);
        localStorage.setItem(petpetInputs[i].getAttribute("name"), petpetInputs[i].value);
    }
    localStorage.setItem("monkeyScriptLabNumAccounts", accountInputs.length);

    // this is so if you change the pets/petpets/accounts you don't have to refresh the page
    // for the style to take effect
    if (currURL.includes("www.neopets.com/lab2.phtml")) {
      stylizeLabRats(true);
    } else if (currURL.includes("www.neopets.com/petpetlab.phtml")) {
      stylizeP2LabRats(true);
    }
  }
  
  toggleClassTime(saveTextElement);
}

// names (or renames) an InputGroup element
function nameInputGroup(i, inputGroup, resetVal) {
  inputGroup.id = inputGroup.id.replace(/[0-9]+/, i);
  inputGroup.children[0].innerText = "Account " + i + ":";
  
  for (child of inputGroup.children) {
    if (child.tagName == "LABEL") {
      child.setAttribute("for", child.getAttribute("for").replace(/[0-9]+/, i));
    } else if (child.tagName == "INPUT") {
      child.setAttribute("name", child.getAttribute("name").replace(/[0-9]+/, i));
      if (resetVal) {
        child.value = "";
      }
    }
  }  
}

// adds a new InputGroup
function addInputGroup(i) {
  var lastInputGroup = document.querySelector('#monkeyScriptInputDiv .monkeyScriptOptionButton').previousElementSibling;
	var newinputGroup = lastInputGroup.cloneNode(true);
  lastInputGroup.after(newinputGroup);
  
  nameInputGroup(i, newinputGroup, true);
}

// current info
var currAccount = document.querySelector(".user.medText").children[0].innerText;
var currURL = document.URL;

// live lists
var monkeyIcon = document.getElementsByClassName('monkeyScriptIcon');
var accountInputs = document.getElementsByClassName('monkeyScriptAccountInput');
var petInputs = document.getElementsByClassName('monkeyScriptPetInput');
var petpetInputs = document.getElementsByClassName('monkeyScriptPetpetInput');

function addCSSandHTML() {
  var placementElement = null;
  var lab = true;
	
  if (currURL.includes("neopets.com/petpetlab.phtml")) {
    lab = false;
    placementElement = document.querySelector("img[src='//images.neopets.com/games/petpetlab/scientist.gif']");
    if (placementElement != null) {
      placementElement = placementElement.parentElement.nextElementSibling.nextSibling.nextElementSibling;
    }
  } else {
    if (currURL.includes("neopets.com/lab.phtml")) {
      placementElement = document.querySelector("center:has(form[action='lab2.phtml'] input[type='submit'])");
    } else {
      placementElement = document.querySelector("input[type='submit'][value='Carry on with the Experiment!'");
    }
    if (placementElement == null) {
      placementElement = document.querySelector("img[src='https://images.neopets.com/games/betterthanyou/contestant202.gif']");
      if (placementElement != null) {
        placementElement = placementElement.parentElement.nextElementSibling;
      }
    }
  }
  
  if (placementElement != null) {
    // add the CSS
    const scriptStyle = document.createElement("style");
    scriptStyle.innerHTML = scriptCSS + (lab ? labRatCSS : p2labRatCSS);
    document.head.appendChild(scriptStyle);

    // add the HTML
    placementElement.insertAdjacentHTML('afterend', scriptHTML);
		
    // load the saved values into the boxes
    for (let i = 0; i < Number(localStorage.getItem("monkeyScriptLabNumAccounts")); i++) {
      if (i > 4) {
        addInputGroup(i+1);
      }

      accountInputs[i].value = localStorage.getItem("monkeyScriptLabAccount"+(i+1)) || "";
      petInputs[i].value = localStorage.getItem("monkeyScriptLabPets"+(i+1)) || "";
      petpetInputs[i].value = localStorage.getItem("monkeyScriptLabPetpets"+(i+1)) || "";
    }
    
    // opens the options div if all usernames are blank
    if (Array.from(accountInputs).filter(x => x.value != "").length == 0) {
      monkeyIcon[0].classList.remove('monkeyScriptHideOptions');
    }
  }
}

function stylizeLabRats(reload = false) {
  var acctNum = Array.from(accountInputs).map(x => x.value).indexOf(currAccount);
  var labNames = petInputs[acctNum];
  var labNamesArr = labNames == undefined ? [] : labNames.value.split(", ");

  var viewport = document.querySelector(".bx-viewport");
   
  if (viewport != null) {
    if (reload) {
      var p = document.querySelector("#monkeyScriptLabRatP");
    
    } else {
      // this just increases the size of the zap counter TNT added
      var counter = viewport.parentElement.parentElement.nextElementSibling;
      if (counter.tagName == "P") {
        counter.style.fontSize = "12pt";
      }
      
      var p = document.createElement("p");
      p.id = "monkeyScriptLabRatP";
      viewport.parentElement.parentElement.after(p);
    }
    
    p.innerText = "Zapping: " +  (labNames.value || "N/A");
    
    var petRadios = viewport.querySelectorAll("input[type='radio'][name='chosen']");

    for (pet of petRadios) {
      if (!reload) {
        var name = document.createElement("span");
        name.innerText = pet.value;
        pet.parentElement.children[0].after(name);
        
        pet.parentElement.classList.add("monkeyScriptLabRat");
      }		
      
      if (labNamesArr.includes(pet.value) || acctNum == -1) {
        pet.parentElement.classList.remove("monkeyScriptNoZap");
      } else {
        pet.parentElement.classList.add("monkeyScriptNoZap");
      }
    }
  }
}

function stylizeP2LabRats(reload = false) {
  var acctNum = Array.from(accountInputs).map(x => x.value).indexOf(currAccount);
  var labNames = petpetInputs[acctNum];
  var labNamesArr = labNames == undefined ? [] : labNames.value.split(", ");

  var petpetDivs = document.querySelectorAll("form[action='process_petpetlab.phtml'] div div");

  if (petpetDivs.length != 0) {
    if (!reload) {
      // this just increases the size of the zap counter TNT added
      var counter = petpetDivs[0].parentElement.parentElement.parentElement.nextElementSibling;
      if (counter.tagName == "P") {
        counter.style.fontSize = "14pt";
      }
    }

    for (petpet of petpetDivs) {
      var petName = petpet.lastElementChild.value;

      if (!reload) {
        var petNameSpan = document.createElement("span");
				petNameSpan.title = petName;
        petNameSpan.innerText = petName;

        petpet.insertBefore(petNameSpan, petpet.children[0]);

        petpet.classList.add("monkeyScriptP2LabRat");
      }
      
      if (labNamesArr.includes(petName) || acctNum == -1) {
        petpet.classList.remove("monkeyScriptP2NoZap");
      } else {
        petpet.classList.add("monkeyScriptP2NoZap");
      }
    }
  }
}

const once = {
  once: true,
};

addEventListener("DOMContentLoaded", function() {
  addCSSandHTML();
  if (currURL.includes("www.neopets.com/lab2.phtml")) {
    stylizeLabRats();
  } else if (currURL.includes("www.neopets.com/petpetlab.phtml")) {
  	stylizeP2LabRats();
  }
}, once);

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("monkeyScriptOptionButton")) {
    if (event.target.id == "monkeyScriptOptionAddAccount") {
      addInputGroup(accountInputs.length + 1);

    } else if (event.target.id == "monkeyScriptOptionSave") {
      saveOptions();

    // clear or reset buttons
    } else {
      var saveText = '#monkeyScriptClearText';
      if (event.target.id == "monkeyScriptOptionDelete") {
        if(currURL.includes("petpetlab")) {
          stylizeP2LabRats(true);
        } else {
          stylizeLabRats(true);
        }
        saveText = '#monkeyScriptDeleteText';
        localStorage.removeItem("monkeyScriptLabNumAccounts");  
      }

      for (let i = accountInputs.length - 1; i >= 0; i--) {
        accountInputs[i].value = "";
        petInputs[i].value = "";
        petpetInputs[i].value = "";
        if (event.target.id == "monkeyScriptOptionDelete") {
          localStorage.removeItem(accountInputs[i].getAttribute("name"));
          localStorage.removeItem(petInputs[i].getAttribute("name"));
          localStorage.removeItem(petpetInputs[i].getAttribute("name"));
          if (i > 4) {
            accountInputs[i].parentElement.remove();
          }
        }
      }

      var saveTextElement = document.querySelector(saveText);
      toggleClassTime(saveTextElement);
    }
  }
});
