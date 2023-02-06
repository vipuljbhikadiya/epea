document.addEventListener("DOMContentLoaded", function () {

  // Check if Page contains Accordions Blocks
  if (document.querySelector(".accordion") != null) {
        
    // Get all Accordions
    let accordions = document.querySelectorAll(".accordion");

    // Loop through Accordions
    accordions.forEach((acc, index) => {
    
      // Get all Accordion Items
      let accordionItems = acc.querySelectorAll(".accordion-item");

      // Add active to first Accordion Item
      if(accordionItems[0]) {
        accordionItems[0].classList.add("accordion-item--active");
        accordionItems[0].children[1].style.maxHeight = accordionItems[0].children[1].scrollHeight + "px";
      }

      // Loop through all Accordion Items
      accordionItems.forEach((item, index) => {

        item.firstChild.addEventListener("click", function (e) {
          e.preventDefault();

          // Set Animation for Accordion Item
          if (item.children[1].style.maxHeight) {
            item.children[1].style.maxHeight = null;
          } else {
            item.children[1].style.maxHeight = item.children[1].scrollHeight + "px";
          }

          // Check if Accordion Item is active
          if (item.classList.contains("accordion-item--active")) {

            // Remove active Class
            item.classList.remove("accordion-item--active");
          
          } else {

            // Add active Class
            item.classList.add("accordion-item--active");
          
          }
        });
      });
    });
  }
});