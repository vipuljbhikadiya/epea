import Splide from "@splidejs/splide";

// Hero slider
if (document.querySelector(".splide--testimonial")) {
  var selector = document.getElementsByClassName("splide--testimonial");

  for (var i = 0; i < selector.length; i++) {
    const slide_ele = selector[i];
    const testimonialSlider = new Splide(slide_ele, {
      type: "loop",
      perPage: 1,
      perMove: 1,
      pauseOnHover: false,
      arrows: true,
      easing: 'linear',
      width: '50%',
      fixedWidth: '100%',
      gap: '0',
      pagination: false,
      breakpoints: {
        1400: {
          width: "60%",
        },
        1024: {
          width: "60%",
        },
        768: {
          width: "80%",
        },
        480: {
          width: "90%",
        },
      },
    });
    testimonialSlider.mount();
  }
}
