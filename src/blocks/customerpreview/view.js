document.addEventListener("DOMContentLoaded", function () {

  if (document.querySelector(".preview-customer")) {

    if(document.body.classList.contains('page--is-touch')){
      deviceTouch = true;
    } else {
      deviceTouch = false;
    }

    window.addEventListener('resize', function() {

			if (deviceTouch){
				document.querySelectorAll('.preview-customer .preview-customer__item').forEach(function (el) {
					el.classList.remove("active");
				});
			}

			document.querySelectorAll('.preview-customer .preview-customer__detail').forEach(function (resizeCustomerItem) {
				
				resizeCustomerItem.setAttribute("style","height:auto;");
				
				let resizeCIHeight = resizeCustomerItem.firstChild.offsetHeight;
	
				resizeCustomerItem.setAttribute("style","height:" + resizeCIHeight + "px");
	
			});
		});

    document.querySelectorAll(".preview-customer").forEach(function (customerList) {

      customerList.querySelectorAll('.preview-customer__detail').forEach(function (customerItem) {
            
          let ciHeight = customerItem.firstChild.offsetHeight;
          customerItem.setAttribute("style","height:" + ciHeight + "px");

        });

        function customResizeCustomersIcons() {
          var elements = document.querySelectorAll('.preview-customer__item icon__visual');
          if (elements.length < 0) {
            return;
          }
          var _len = elements.length;
          for (var _i = 0; _i < _len; _i++) {
            var el = elements[_i];
            var elWidth = el.offsetWidth;
            var iconSize = elWidth * 0.7;
            
            var iconSizeRounded = Math.round(iconSize / 2) * 2;
            el.style.fontSize = iconSizeRounded + 'px';
          }
        }

        customerList.addEventListener("click", function (e) {
        
            e = e || window.event;

            var target = e.target;           
    
            if (deviceTouch && e.target.classList[0] == "preview-customer__title") {
              target.parentElement.parentElement.parentElement.classList.add("active");
              customResizeCustomersIcons();
            } 
            
            else if (deviceTouch && e.target.classList[0] == "preview-customer__image" && !e.target.parentElement.parentElement.parentElement.parentElement.classList.contains("active")) {
              target.parentElement.parentElement.parentElement.parentElement.classList.add("active");
              customResizeCustomersIcons();
            } 
            
            else if (deviceTouch && e.target.classList[0] == "preview-customer__item") {
              target.classList.add("active");
              customResizeCustomersIcons();
            } 
            
            else if (e.target.classList[0] == "preview-customer__close") {
              target.closest(".preview-customer__item").classList.remove("active");
            }
            
            return false;
        
        }, false);
    });
  }
});