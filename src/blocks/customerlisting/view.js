document.addEventListener("DOMContentLoaded", function () {

  if (document.querySelector(".listing-customer")) {

    if(document.body.classList.contains('page--is-touch')){
      deviceTouch = true;
    } else {
      deviceTouch = false;
    }

    window.addEventListener('resize', function() {

			if (deviceTouch){
				document.querySelectorAll('.listing-customer .listing-customer__item').forEach(function (el) {
					el.classList.remove("active");
				});
			}

			elementOverlayHeight();
		});

    document.querySelectorAll(".listing-customer").forEach(function (customerList) {

      customerList.querySelectorAll('.listing-customer__detail').forEach(function (customerItem) {
            
          let ciHeight = customerItem.firstChild.offsetHeight;
          customerItem.setAttribute("style","height:" + ciHeight + "px");

        });

        function customResizeCustomersIcons() {
          var elements = document.querySelectorAll('.listing-customer__item icon__visual');
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
            let paged = "";
            let taxonomy = this.querySelector(
              'input[name="customer_taxonomy"]'
            ).value;
            

            if (e.target.classList.contains('listing-customer__nav-prev') && !e.target.classList.contains('disabled') || e.target.classList.contains('listing-customer__nav-next') && !e.target.classList.contains('disabled')) {
              e.preventDefault();
              paged = target.dataset.paged;
              getCustomersList(paged, taxonomy, customerList);
            } 

            else if (e.target.tagName == 'svg'  && !e.target.parentElement.classList.contains('disabled')) {
              e.preventDefault();
              paged = target.parentElement.dataset.paged;
              getCustomersList(paged, taxonomy, customerList);
            }

            else if (e.target.tagName == 'line'  && !e.target.parentElement.parentElement.parentElement.classList.contains('disabled')) {
              e.preventDefault();
              paged = target.parentElement.parentElement.parentElement.dataset.paged;
              getCustomersList(paged, taxonomy, customerList);
            }
            
            else if (deviceTouch && e.target.classList[0] == "listing-customer__title") {
              target.parentElement.parentElement.parentElement.classList.add("active");
              customResizeCustomersIcons();
            } 
            
            else if (deviceTouch && e.target.classList[0] == "listing-customer__image" && !e.target.parentElement.parentElement.parentElement.parentElement.classList.contains("active")) {
              target.parentElement.parentElement.parentElement.parentElement.classList.add("active");
              customResizeCustomersIcons();
            } 
            
            else if (deviceTouch && e.target.classList[0] == "listing-customer__item") {
              target.classList.add("active");
              customResizeCustomersIcons();
            } 
            
            else if (e.target.classList[0] == "listing-customer__close") {
              target.closest(".listing-customer__item").classList.remove("active");
            }
            
            return false;
        
        }, false);
    });
  }

  function elementOverlayHeight() {
    document.querySelectorAll('.listing-customer .listing-customer__detail').forEach(function (resizeCustomerItem) {
      
      resizeCustomerItem.setAttribute("style","height:auto;");
      
      let resizeCIHeight = resizeCustomerItem.firstChild.offsetHeight;

      resizeCustomerItem.setAttribute("style","height:" + resizeCIHeight + "px");

    }); 
  }

  function getCustomersList(paged, taxonomy, position) {
    const params = new URLSearchParams();
    params.append("action", "getCustomersList");
    params.append("paged", paged);
    params.append("taxonomy", taxonomy);

    getCustomerPosts(gb_ajax.ajaxurl, params, position);
  }

  async function getCustomerPosts(url, body, position) {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cache-Control": "no-cache",
      },
      body: body,
    });

    var data = await response.json();

    if (response.status == 200) {
      if (data.html != "") {
        position.querySelector(".listing-customer__content").innerHTML = data.html;
        position.scrollIntoView({ behavior: "smooth" });
        elementOverlayHeight();
      }
    }
  }
});