document.addEventListener("DOMContentLoaded", function () {

  if (document.querySelector('.slider-circle')) {
    
    document.querySelectorAll('.slider-circle').forEach(function (parentEle) {

        
      let tabs_wrap = parentEle.querySelectorAll('.slider-circle__tabs');

      parentEle.querySelector('.slider-circle__tabs .slider-circle__link').classList.add('slider-circle__link--active');
      parentEle.querySelector('.slider-circle__content .slider-circle__slide').classList.add('slider-circle__slide--active');


      tabs_wrap.forEach(function (tab_wrap) {

        var tab_links = tab_wrap.querySelectorAll('.slider-circle__item');
        
        tab_links.forEach(function (tab_link) {

          tab_link.querySelector('.slider-circle__link').addEventListener('click', function (e) {

            e.preventDefault();
            tab_link.closest('.slider-circle').querySelectorAll('.slider-circle__slide').forEach(function (content) {

              content.classList.remove('slider-circle__slide--active');
            });

            tabs_wrap.forEach(function (tabs) {
            
              tabs.querySelectorAll('.slider-circle__item').forEach(function (link) {
                    
                if (
                  link.querySelector('.slider-circle__link').classList.contains('slider-circle__link--active') == true &&
                  link.querySelector('.slider-circle__link') != this
                ) {
                  
                  link.querySelector('.slider-circle__link').classList.remove('slider-circle__link--active');
                
                }

              });

            });

            this.classList.add('slider-circle__link--active');
            var content_wrap = this.closest('.slider-circle').querySelector('.slider-circle__content');
            content_wrap.querySelector(this.getAttribute('href')).classList.add('slider-circle__slide--active');
          });
        });
      });
    });
  }
});