// ==UserScript==
// @name           Neopets - User Shop Scroll Item into View
// @version        1.2
// @description	   Scrolls the item you want to purchase into view (after clicking on a SSW/SW link)
//                 This only really matters for shops with a lot of banners/images/text/etc. Otherwise there will be no (visible) effect.
//                 Note that using a script to remove user code from shops has the same advantage of ensuring the item you wish to purchase is in view.
// @author         0o0slytherinpride0o0
// @match          *://www.neopets.com/browseshop.phtml?owner=*
// ==/UserScript==

(function() {
    'use strict';
    window.onload = function() { 
        var hr = document.querySelector('hr[size="1"][width="75%"]'); 
        if (hr) {
            var link = hr.previousElementSibling.querySelector("a[onclick]");
            if (link) {
                link.setAttribute("tabindex","-1");
                link.focus({ focusVisible: false }); 
                link.blur(); // unfocuses the item after it's scrolled into view
            }
        }
    }
})();
