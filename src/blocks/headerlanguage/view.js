document.addEventListener("DOMContentLoaded", function () {

    if (document.querySelector('.lang--selected-menu')) {
		
		document
			.querySelector('.lang--menu-name')
			.addEventListener('click', function () {

				if ( this.classList.contains('is-open')) {
					this.classList.remove('is-open');
				} else {
					this.classList.add('is-open');
				}

				if ( this.nextElementSibling.classList.contains('is--active-lang')) {
					this.nextElementSibling.classList.remove('is--active-lang');
				} else {
					this.nextElementSibling.classList.add('is--active-lang');
				}
		});

		document.querySelectorAll('.lang-item').forEach(function (ln, i) {
			if (ln.classList.length >= 2) {
				var langCodeClass = ln.classList[2];

				if (langCodeClass.split('-').length == 3) {
					var childHtml = langCodeClass.split('-')[2];

					ln.querySelector('a').innerHTML =
						ln.querySelector('a').innerHTML +
						"<span class='country-code'>" +
						childHtml +
						'</span>';
				}
			}
		});

		if (document.querySelector('.lang-item.current-lang')) {
			document.querySelector('.current--lang-code').innerHTML =
				document.querySelector('.current-lang .country-code').innerHTML;
		}
	}

});