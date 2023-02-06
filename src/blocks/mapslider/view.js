import Splide from "@splidejs/splide";

document.addEventListener("DOMContentLoaded", function () {

  if (document.querySelector('.splide--map')) {
		var location__sliders =
			document.getElementsByClassName('splide--map');

		for (var i = 0; i < location__sliders.length; i++) {
			const slider_ele = location__sliders[i];

			const splideSlider = new Splide(slider_ele, {
				pagination: false,
				type: 'fade',
				rewind: true,
			});

			splideSlider.mount();

			const slider_doc = slider_ele.parentElement.parentElement;
			const markers = slider_doc.querySelectorAll('.slider-map__marker');

			splideSlider.on('move', function (newIndex, prevIndex, destIndex) {
				removeActivemarker(markers);
				const marker = slider_doc.querySelector(
					"[data-id='marker--" + destIndex + "']"
				);
				marker.classList.add('slider-map__marker--active');
			});

			function removeActivemarker(markers) {
				markers.forEach((marker) => {
					marker.classList.remove('slider-map__marker--active');
				});
			}

			markers.forEach((marker) => {
				marker.addEventListener('click', function handleClick(event) {
					removeActivemarker(markers);
					marker.classList.add('slider-map__marker--active');
					var marker_index = marker.getAttribute('data-index');
					splideSlider.go(parseInt(marker_index));
				});
			});
		}

		function customResizeMap() {
			var elements = document.getElementsByClassName("slider-map__visual-helper");
			if (elements.length < 0) {
			  return;
			}
			var _len = elements.length;
			for (var _i = 0; _i < _len; _i++) {
			  var el = elements[_i];
			  var elHeight = el.offsetHeight;
			  var elStyles = window.getComputedStyle(el);
			  var elTransformMatrix = elStyles.transform || elStyles.webkitTransform || elStyles.mozTransform
			  
			  var elTransform = elTransformMatrix.match(/matrix.*\((.+)\)/)[1].split(', ')

			  var elHeightCalculated = elHeight * elTransform[0];
		  
			  el.parentElement.style.height = elHeightCalculated + "px";
			}
		  }
		  customResizeMap();
		window.addEventListener("resize", customResizeMap);
	}
});