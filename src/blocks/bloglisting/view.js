document.addEventListener("DOMContentLoaded", function () {

  if (document.querySelector(".listing-blog")) {

    document.querySelectorAll(".listing-blog").forEach(function (newsList) {

        newsList.addEventListener("click", function (e) {
        
            e = e || window.event;

            var target = e.target;
            let paged = "";
            let taxonomy = this.querySelector(
              'input[name="blog_taxonomy"]'
            ).value;
            
            if (e.target.classList.contains('listing-blog__nav-prev') && !e.target.classList.contains('disabled') || e.target.classList.contains('listing-blog__nav-next') && !e.target.classList.contains('disabled')) {
              e.preventDefault();
              paged = target.dataset.paged;
              getblogList(paged, taxonomy, newsList);
            } 

            else if (e.target.tagName == 'svg'  && !e.target.parentElement.classList.contains('disabled')) {
              e.preventDefault();
              paged = target.parentElement.dataset.paged;
              getblogList(paged, taxonomy, newsList);
            }

            else if (e.target.tagName == 'line'  && !e.target.parentElement.parentElement.parentElement.classList.contains('disabled')) {
              e.preventDefault();
              paged = target.parentElement.parentElement.parentElement.dataset.paged;
              getblogList(paged, taxonomy, newsList);
            }
            
            return false;
        
        }, false);
    });
  }

  function getblogList(paged, taxonomy, position) {
    const params = new URLSearchParams();
    params.append("action", "getblogList");
    params.append("paged", paged);
    params.append("taxonomy", taxonomy);

    getNewsPosts(gb_ajax.ajaxurl, params, position);
  }

  async function getNewsPosts(url, body, position) {
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
        position.querySelector(".listing-blog__content").innerHTML = data.html;
        position.scrollIntoView({ behavior: "smooth" });
      }
    }
  }
});