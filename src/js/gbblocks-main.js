document.addEventListener("DOMContentLoaded", function () {

    var deviceTouch = true;

    function isTouchScreendevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints;      
    };

    if(isTouchScreendevice()){
        deviceTouch = true;
        document.body.classList.add('page--is-touch');
    } else { document.body.classList.add('page--no-touch'); }

});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("body").classList.add("page--animation-ready");
});

if( document.querySelector('footer .footer-section--bottom .site--nav ul li:first-Child a') !== null ){
    document.querySelector('footer .footer-section--bottom .site--nav ul li:first-Child a').addEventListener('click', function (e) {
        e.preventDefault();
        UC_UI.showSecondLayer();
    });
}

import "./common";
import "../blocks/headerlanguage/view";
import "../blocks/navigation/view";
import "../blocks/icon/view";
import "../blocks/tabsslider/view";
import "../blocks/mapslider/view";
import "../blocks/timelineslider/view";
import "../blocks/accordion/view";
import "../blocks/testimonialslider/view";
import "../blocks/blogslider/view";
import "../blocks/circleslider/view";
import "../blocks/customerpreview/view";
import "../blocks/bloglisting/view";
import "../blocks/customerlisting/view";
import "../blocks/youtube/view";
import "../blocks/form/view";
import "../blocks/newsletter/view";