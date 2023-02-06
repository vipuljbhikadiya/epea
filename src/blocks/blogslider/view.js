import Splide from "@splidejs/splide";

document.addEventListener("DOMContentLoaded", function () {

    if (document.querySelector(".splide--blog")) {

        var selector = document.getElementsByClassName("splide--blog");

        for (var i = 0; i < selector.length; i++) {

            const slide_ele = selector[i];
            
            const mainNews = new Splide(slide_ele, {
                
                type: "slide",
                arrows: true,
                easing: "linear",
                width: "100%",
				fixedWidth: "calc(33.33333% - 20px)",
                perPage: 3,
                perMove: 1,
                gap: "20px",
                pagination: false,
				omitEnd: true,
				padding: { right: "8.33333%" },
                breakpoints: {
                    1400: {
                        perPage: 2,
						fixedWidth: "calc(50% - 20px)",
                    },
                    1024: {
                        perPage: 2,
                    },
                    768: {
                        gap: "10px",
						fixedWidth: "calc(50% - 10px)",
                    },
                    700: {
                        perPage: 1,
						fixedWidth: "100%",
                    },
                },
            });
        mainNews.mount();
        }
    }
});