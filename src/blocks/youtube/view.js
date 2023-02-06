document.addEventListener('DOMContentLoaded', function () {

	if (document.querySelector('.youtube') != null) {

		var youtube_video = false;

		window.addEventListener('ucEvent', function (event) {

			if(event.detail.hasOwnProperty('YouTube Video') && event.detail['YouTube Video'] === true) {
				youtube_video = true;
				document.querySelector('.lightbox-youtube').classList.remove('lightbox-youtube--no-consent');
			} else {
				youtube_video = false;
				document.querySelector('.lightbox-youtube').classList.add('lightbox-youtube--no-consent');
			}
		});

		let links = document.querySelectorAll('.youtube__link');
		links.forEach(function (link) {
			link.addEventListener('click', function (e) {
				e.preventDefault();
				var youtubeId = this.dataset.youtubeid;
				if (document.querySelector('.lightbox-youtube') != null) {
					var parent = document.querySelector('.lightbox-youtube');
					var iframe = parent.querySelector('.lightbox-youtube__video');
					if (
						iframe.src.indexOf('/' + youtubeId + '/?showinfo=0') < 0 && youtube_video === true
					) {
						iframe.src =
							'https://www.youtube.com/embed/' +
							youtubeId +
							'/?showinfo=0';
					}
					
					else {

						document.querySelector('.lightbox-youtube__consent-accept').addEventListener('click', function (e) {
							
							UC_UI.acceptService('BJz7qNsdj-7');
							document.querySelector('.lightbox-youtube').classList.remove('lightbox-youtube--no-consent');
							if (
								iframe.src.indexOf('/' + youtubeId + '/?showinfo=0') < 0 && youtube_video === true
							) {
								iframe.src =
									'https://www.youtube.com/embed/' +
									youtubeId +
									'/?showinfo=0';
							}

						});

						window.addEventListener('ucEvent', function (event) {
							if(event.detail.hasOwnProperty('YouTube Video') && event.detail['YouTube Video'] === true) {
								if (
									iframe.src.indexOf('/' + youtubeId + '/?showinfo=0') < 0 && youtube_video === true
								) {
									iframe.src =
										'https://www.youtube.com/embed/' +
										youtubeId +
										'/?showinfo=0';
								}
							}
						});
					}
					parent.classList.add('lightbox-youtube--opened');
				}
			});
		});

		let button = document.querySelector('.lightbox-youtube__close');
		button.addEventListener('click', function () {
			var close_btn_parent = this.parentElement.parentElement.parentElement;
			close_btn_parent.getElementsByTagName('iframe')[0].src = '';
			close_btn_parent.classList.remove('lightbox-youtube--opened');
		});
	}
});