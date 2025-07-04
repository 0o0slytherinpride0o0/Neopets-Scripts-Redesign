// ==UserScript==
// @author         0o0slytherinpride0o0
// @name           Neopets - Bank Maximize Interest
// @version        1.0
// @description    Calculates how much you need to withdraw or deposit to maximize your daily interest for the next day
//		   i.e., so collecting your interest puts you back at the neopoint limit exactly
//		   Right now, it assumes if it's Sunday:
//		   	1. If you have the bank boon, that you *won't* have it tomorrow
//		   	2. If you do NOT have the bank boon, that you *might* have it tomorrow (gives you two options)
//		   For #2: Use the button on the right if you might have the boon tomorrow!
//		   You only lose out on 60 neopoints if you withdraw the larger amount and don't end up having the boon
//		   And 176,371 neopoints if you withdraw the smaller amount and do have the boon!
// @match          *://www.neopets.com/bank.phtml
// ==/UserScript==

var balanceLimit = 2**31 - 1;

var withdrawHeader = document.querySelector('div.bank-withdraw-header.bank-backing-header.bank-backing-t4');
var depositHeader = document.querySelector('div.bank-deposit-header.bank-backing-header.bank-backing-t4');

var balanceEl = document.querySelector("#txtCurrentBalance1");
var intRateArr = document.querySelector("#txtAnnualInterestRate").innerText.match(/([\.0-9]+)/g).map(x => Number(x));

var sunday = new Date().toLocaleString('en', {
  weekday: 'short',
  timeZone: 'America/Los_Angeles'
}) == "Sun";

// Case 1: It's Sunday & you have the bank boon
// since you won't have the boon *tomorrow*, you want to use your previous interest rate
var case1 = (sunday && intRateArr.length == 2);

// Case 2: It's Sunday & you you *might* have the boon tomorrow
// it's up to you to make sure you withdraw the correct amount here
// since you have to know
//    1. If it's a battle week
//    2. If Seekers/Sway (& maybe Awakened) are in this round
//    3. If you chose one of them & did enough battles
var case2 = (sunday && intRateArr.length == 1);
// so it'll show two buttons every Sunday (if no boon), use the right one if you anticipate having the boon tomorrow

var intRate = case1 ? intRateArr.at(0) : intRateArr.at(-1);
var maxBalance  = Math.floor(balanceLimit * 365 / (365 + intRate/100));
var maxBalance3  = Math.floor(balanceLimit * 365 / (365 + (intRate+3)/100));

function buttonSetup() {
  var currBalance = Number(balanceEl.innerText.match(/[,0-9]+/)[0].replace(/,/g, ''));

  var diff = currBalance - maxBalance;
  var diff3 = currBalance - maxBalance3;

  withdrawButton.innerText = diff.toLocaleString();
  withdrawButton3.innerText = diff3.toLocaleString();

  depositButton.innerText = parseInt(diff * -1).toLocaleString();
  depositButton3.innerText = parseInt(diff3 * -1).toLocaleString();
}

const scriptCSS = ` 
.monkeyScriptContainer {
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
}
.monkeyScriptContainer label:before {
  content: attr(data-before);
}
.monkeyScriptButton {
  display: inline-block;
  margin: 0px 4px;
  border: 1px solid darkblue;
  border-radius: 3px;
  padding: 3px 8px; 
  cursor: pointer;
}
.monkeyScriptHidden {
  display: none;
}
`

const withdrawHTML = `
<div class="monkeyScriptContainer">
  <div>
  <label class="monkeyScriptWithdraw" for="monkeyScriptWithdrawButton"></label>
    <div class="monkeyScriptButton" name="monkeyScriptWithdrawButton"
    	 onclick="fillOrClear(withdrawTextbox, Math.max(0,this.innerText.replace(/,/g, '')))"></div>
  </div>
  <div class="monkeyScriptHidden">
    <label class="monkeyScriptWithdraw" for="monkeyScriptWithdrawButton3"></label>
    <div class="monkeyScriptButton" name="monkeyScriptWithdrawButton3" 
    	 onclick="fillOrClear(withdrawTextbox, Math.max(0,this.innerText.replace(/,/g, '')))"
      	 title="If you might have the boon tomorrow."></div>
  </div>
</div>
`

const depositHTML = withdrawHTML
	.replaceAll("Withdraw", "Deposit")
	.replaceAll("withdraw", "deposit")
	.replace(/Math.max(0,this.innerText.replace(\/,\/g, ''))/,
		 "Math.min(Number(onHandEl.innerText.replace(/,/g, '')), Math.max(0,this.innerText.replace(\/,\/g, '')))");

const scriptJS = `
var withdrawTextbox = document.querySelector("form#frmWithdraw div.bank-input-grid input");
var depositTextbox = document.querySelector("form#frmdeposit div.bank-input-grid input");
var onHandEl = document.querySelector('[id="npanchor"][class="np-text__2020"]');

function fillOrClear(object, val) {
  object.value == "" ? object.value = val : object.value = "";
}
`

// add the JS for the HTML
const scriptEl = document.createElement("script");
scriptEl.innerHTML = scriptJS;
document.head.appendChild(scriptEl);

// add the CSS
const scriptStyle = document.createElement("style");
scriptStyle.innerHTML = scriptCSS;
document.head.appendChild(scriptStyle);

// add the HTML
withdrawHeader.insertAdjacentHTML('afterbegin', withdrawHTML);
depositHeader.insertAdjacentHTML('afterbegin', depositHTML);

if (case2) {
  for (el of document.querySelectorAll(".monkeyScriptHidden")) {
    el.classList.remove("monkeyScriptHidden");
  }
}

var withdrawButton = document.querySelector(".monkeyScriptButton[name='monkeyScriptWithdrawButton']");
var withdrawButton3 = document.querySelector(".monkeyScriptButton[name='monkeyScriptWithdrawButton3']");

var depositButton = document.querySelector(".monkeyScriptButton[name='monkeyScriptDepositButton']");
var depositButton3 = document.querySelector(".monkeyScriptButton[name='monkeyScriptDepositButton3']");

withdrawButton.previousElementSibling.setAttribute('data-before', "Amount over ("+ intRate +"%):");
withdrawButton3.previousElementSibling.setAttribute('data-before', "Amount over ("+ (intRate+3) +"%):");
depositButton.previousElementSibling.setAttribute('data-before', "Amount under ("+ intRate +"%):");
depositButton3.previousElementSibling.setAttribute('data-before', "Amount under ("+ (intRate+3) +"%):");

buttonSetup();

// this watches your bank balance and if it changes, it updates the buttons
var observer = new MutationObserver( buttonSetup );
observer.observe(balanceEl, { childList: true });
