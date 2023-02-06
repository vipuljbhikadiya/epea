import Splide from "@splidejs/splide";

document.addEventListener("DOMContentLoaded", function () {

	if (document.querySelector('.slider-timeline')) {
		var timeline_ele = document.getElementsByClassName('slider-timeline');

		for (var i = 0; i < timeline_ele.length; i++) {

			var selector = timeline_ele[i].querySelector('.slider-timeline__content');			
			var nav = timeline_ele[i].querySelector('.slider-timeline__nav');
			var main = new Splide(selector, {
				type: 'fade',
				pauseOnHover: false,
				width: '644.69px',
				fixedWidth: '644.69px',
				pagination: false,
				arrows: false,
				cover: true,
				breakpoints: {
					1024: {
						width: '440px',
						fixedWidth: '440px',
					},
					767: {
						width: '300px',
						fixedWidth: '300px',
					},
				},
			});
			var thumbnails = new Splide(nav, {
				rewind: true,
				width: '100%',
				fixedWidth: 'auto',
				isNavigation: true,
				gap: 46,
				pagination: false,
				cover: true,
				focus: 'center',
				trimSpace: false,
			});
			main.sync(thumbnails);
			let splideDoc = thumbnails?.root;
			thumbnails.on('move', function (newIndex, prevIndex, destIndex) {
				if (splideDoc != undefined) {
					let prevEle = splideDoc.querySelector(
						'.slider-timeline__nav [data-index="' + prevIndex + '"]'
					);
					let targetEle = splideDoc.querySelector(
						'.slider-timeline__nav [data-index="' + destIndex + '"]'
					);
					prevEle.classList.remove('animation-start');
					targetEle.classList.add('animation-start');
				}
			});
			main.mount();
			thumbnails.mount();
			if (splideDoc != undefined) {
				let activeEle = splideDoc.querySelector(
					'.slider-timeline__nav [data-index="0"]'
				);
				if (activeEle != undefined) {
					activeEle.classList.add('animation-start');
				}
			}
		}
	}

});