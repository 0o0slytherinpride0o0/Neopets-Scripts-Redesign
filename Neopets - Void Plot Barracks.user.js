// ==UserScript==
// @author         0o0slytherinpride0o0
// @name           Neopets - Void Plot Barracks
// @version        1.0
// @description    Minimizes all but the newest wave of challengers
//                 and sets the difficulty to Extreme 
//                 (or you can pick, just set the variable difficulty to 
//                 'easy' (default) 'advance' or 'extreme'
// @match          *://www.neopets.com/dome/barracks.phtml*
// ==/UserScript==

// set which difficulty you want auto-selected here:
// 'easy' (default) 'advance' or 'extreme'
var difficulty = 'extreme';

var scriptJS = `
document.addEventListener("DOMContentLoaded", () => { 
  // minimize all the ones that are maximized
  // usually just the first one, but just in case TNT updates
  document.querySelectorAll(".rb-acts .rb-act:not(.locked).maximize [onclick='toggleShowPane(this)']").forEach(div => {
    toggleShowPane(div);
  });
    
  // maximizes the newest wave
  toggleShowPane(document.querySelector("div.rb-act:nth-last-child(1 of .minimize:not(.locked)) [onclick='toggleShowPane(this)']"));
  
  // remove selected from other difficulties (usually just the one, but this is how TNT had it)
  document.querySelectorAll(".rb-difficulties .rb-difficulty").forEach(item => item.classList.remove("selected"));
  
  updateDifficulty(document.querySelector("div.rb-difficulty.${difficulty}"));
  document.querySelector("div.rb-difficulty.${difficulty}").classList.add("selected");
});
`
var script = document.createElement("script");
script.innerHTML = scriptJS;
document.head.appendChild(script);
