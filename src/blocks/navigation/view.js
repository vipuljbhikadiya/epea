document.addEventListener('DOMContentLoaded', function () {

	window.addEventListener('resize', reportWindowSize);

	reportWindowSize();
	function reportWindowSize() {
		
		var screen_width = screen.width;
		var screen_height = screen.height;
		var elem_toggle = document.getElementById("header__nav-btn");
		var elem_body = document.getElementsByTagName("body");
		var elem_header = document.querySelector("header");
		var elem_headerHeight = elem_header.offsetHeight;
		if( document.querySelector(".site--nav") !== null ){
			var elem_nav = document.querySelector(".site--nav");
			var elem_links = document.querySelectorAll(".site--nav > ul > li.menu-item-has-children > a");

			for (var i = 0; i < elem_links.length; i++) {

					elem_links[i].onclick = function(event) {

				event.preventDefault();

						for (var i = 0; i < elem_links.length; i++) {
							elem_links[i].parentElement.classList.remove("child--open");
						}

				if(this.classList.contains("open")) {
							this.parentElement.classList.remove("child--open");
							this.classList.remove("open");
						} else {
							this.parentElement.classList.add("child--open");
							this.classList.add("open");
						}

				return false;
					};
			}

			if (screen_width <= 1400) {

				var navHeight = (screen_height - elem_headerHeight) + 'px';

				elem_nav.style.height = navHeight;
				elem_nav.style.top = elem_headerHeight + 'px';
				
				elem_toggle.onclick = function(event) {
					elem_body[0].classList.toggle("main-nav--open");
				};
			
			} else {

				elem_nav.style.removeProperty('height');
				elem_nav.style.removeProperty('top');
				
				var navItemElems = elem_nav.querySelectorAll('ul > li');
				navItemElems.forEach(function(el) {
					el.classList.remove("child--open");
				});

				if (elem_body[0].classList.contains("main-nav--open")) {
					elem_body[0].classList.remove("main-nav--open");
				}
			}
		}
	};
});