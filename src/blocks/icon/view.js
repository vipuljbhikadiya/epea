// Icon JS
function customResizeIcons() {
  var elements = document.getElementsByClassName("icon__visual");
  if (elements.length < 0) {
    return;
  }
  var _len = elements.length;
  for (var _i = 0; _i < _len; _i++) {
    var el = elements[_i];
    var elWidth = el.offsetWidth;

    if (el.closest(".icon").parentElement.classList.contains('quote-image__content') || el.closest(".icon").parentElement.classList.contains('slider-timeline__detail')) {
      var iconSize = elWidth;
    } else if (el.closest(".icon").parentElement.classList.contains('footer-column')) {
      var iconSize = elWidth * 0.6;
    } else {
      var iconSize = elWidth * 0.7;
    }

    var iconSizeRounded = Math.round(iconSize / 2) * 2;
    el.style.fontSize = iconSizeRounded + "px";
  }
}
customResizeIcons();
window.addEventListener("resize", customResizeIcons);
