import Splide from "@splidejs/splide";

document.addEventListener("DOMContentLoaded", function () {

  if (document.querySelector('.tabs-slider')) {
		var timeline_ele = document.getElementsByClassName('tabs-slider');

		for (var i = 0; i < timeline_ele.length; i++) {
			var selector = timeline_ele[i].querySelector('.tabs-slider__content');
			var nav = timeline_ele[i].querySelector('.tabs-slider__nav');

			var main = new Splide(selector, {
				type: 'fade',
				pauseOnHover: false,
				pagination: false,
				arrows: false,
				cover: true,
				drag: false,
			});
			var thumbnails = new Splide(nav, {
				rewind: true,
				fixedWidth: "30%",
				isNavigation: true,
				gap: 0,
				focus: 'center',
				pagination: false,
				arrows: false,
				cover: true,
				// padding: { left: 'calc((100vw - 1600px) / 2)' },
				breakpoints: {
					1400: {
						fixedWidth: "45%",
					},
					768: {
						fixedWidth: "90%",
					},
				},
			});

			main.sync(thumbnails);
			main.mount();
			thumbnails.mount();
			thumbnails.on("resized", function () {
				equalTabs(true);
			});
		}
		equalTabs(false);
	}
});
window.onresize = function () {
	if (screen.width >= 769) {
		if (document.querySelector(".tabs-slider")) {
			equalTabs(true);
		}
	} else {
		var elements = document.querySelectorAll(".tabs-slider__nav-item .headline");
		for (var i = 0; i < elements.length; i++) {
			elements[i].style.height = "";
		}

		var elementsTxt = document.querySelectorAll(".tabs-slider__nav-item .text");
		for (var i = 0; i < elementsTxt.length; i++) {
			elementsTxt[i].style.height = "";
		}
	}
};
function equalTabs(resize) {
	var elements = document.querySelectorAll(".tabs-slider__nav-item .headline"),
		allHeights = [],
		i = 0;
	
	if (resize === true) {
		for (i = 0; i < elements.length; i++) {
		elements[i].style.height = "auto";
		}
	}
	for (i = 0; i < elements.length; i++) {
		var elementHeight = elements[i].clientHeight;
		allHeights.push(elementHeight);
	}

	for (i = 0; i < elements.length; i++) {
		elements[i].style.height = Math.max.apply(Math, allHeights) + "px";
	}

	var elementsTxt = document.querySelectorAll(".tabs-slider__nav-item .text"),
		allTxtHeights = [],
		txt = 0;
	
	if (resize === true) {
		for (txt = 0; txt < elementsTxt.length; txt++) {
			elementsTxt[txt].style.height = "auto";
		}
	}
	for (txt = 0; txt < elementsTxt.length; txt++) {
		var elementHeight = elementsTxt[txt].clientHeight;
		allTxtHeights.push(elementHeight);
	}

	for (txt = 0; txt < elementsTxt.length; txt++) {
		elementsTxt[txt].style.height = Math.max.apply(Math, allTxtHeights) + "px";
	}
}
