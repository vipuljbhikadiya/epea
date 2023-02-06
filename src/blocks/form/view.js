document.addEventListener("DOMContentLoaded", function () {

    /**
     * Contact Form Js start
     */
    if (document.querySelector('input[name="time"]')) {
      document.querySelector('input[name="time"]').value = Math.floor(
        new Date().getTime() / 1000
      );
    }
  
    if (document.querySelector('input[name="subscription_time"]')) {
      document.querySelector('input[name="subscription_time"]').value =
        Math.floor(new Date().getTime() / 1000);
    }
  
    if (document.querySelector(".hide-robot")) {
      document.querySelectorAll(".hide-robot").forEach(function (robotField) {
        robotField.style.display = "none";
      });
    }
  
    // form validation
    if (document.querySelector(".form.form--contact")) {
      var forms = document.querySelectorAll(".form.form--contact");
      Array.prototype.slice.call(forms).forEach(function (form) {
        form.querySelector('input[type="submit"]').addEventListener(
          "click",
          function (event) {
            event.preventDefault();
            var errors = form.querySelectorAll(".error-msg");
            let formValidation = true;
            const inputs = form.querySelectorAll("[required]");
  
            inputs.forEach(function (input) {
              let formControl = input.nextElementSibling;
              formControl.classList.remove("show");
              let elementType = input.getAttribute("type");
  
              let elementlabel = input
                .closest(".col")
                .querySelector("label")
                .getAttribute("for");
              let elementValue = input.value.trim();
              let elementName = input.getAttribute("name");
  
              switch (elementType) {
                case "text":
                  if (elementValue === "") {
                    formControl.classList.add("show");
                    formControl.innerHTML = elementlabel + " is required feild.";
                    formValidation = false;
                  }
                  break;
                case "email":
                  if (elementValue === "") {
                    formControl.classList.add("show");
                    formControl.innerHTML = elementlabel + " is required feild.";
                    formValidation = false;
                  } else if (!isEmail(elementValue)) {
                    formControl.classList.add("show");
                    formControl.innerHTML =
                      elementlabel + " address is not valid.";
                    formValidation = false;
                  }
                  break;
                case "checkbox":
                  let isChecked = document.querySelector(
                    '[name="' + elementName + '"]:checked'
                  );
                  if (!isChecked) {
                    input
                      .closest(".acceptance")
                      .nextElementSibling.classList.add("show");
                    input.closest(".acceptance").nextElementSibling.innerHTML =
                      elementlabel + " is required feild.";
                    formValidation = false;
                  }
                  break;
              }
            });
            if (formValidation == true) {
              errors.forEach((err) => {
                if (err.classList.contains("show") == true)
                  err.classList.remove("show");
              });
              form.querySelector('input[type="submit"]').disabled = true;
              const params = new URLSearchParams();
              params.append("action", "sendEmail");
              params.append(
                "clientid",
                form.querySelector('input[name="clientId"]').value
              );
              params.append(
                "time",
                form.querySelector('input[name="time"]').value
              );
              params.append(
                "con_name",
                form.querySelector('input[name="con_name"]').value
              );
              params.append(
                "firstname",
                form.querySelector('input[name="firstname"]').value
              );
              params.append(
                "lastname",
                form.querySelector('input[name="lastname"]').value
              );
              params.append(
                "company",
                form.querySelector('input[name="company"]').value
              );
              params.append(
                "email",
                form.querySelector('input[name="email"]').value
              );
              params.append(
                "message",
                form.querySelector('textarea[name="message"]').value
              );
              sendEmail(gb_ajax.ajaxurl, params, form);
            }
          },
          false
        );
      });
    }
  
    function isEmail(email) {
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  
    async function sendEmail(url, body, form) {
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
        form.querySelector('input[type="submit"]').disabled = false;
        if (false == data.status) {
          form.querySelector(".response").classList.add("show");
          form.querySelector(".response-message").classList.remove("success");
          form.querySelector(".response-message").classList.add("error");
          form.querySelector(".response-message").innerHTML = data.message;
          form.reset();
        } else {
          form.querySelector(".response").classList.add("show");
          form.querySelector(".response-message").classList.remove("error");
          form.querySelector(".response-message").classList.add("success");
          form.querySelector(".response-message").innerHTML = data.message;
          form.reset();
          setTimeout(function () {
            form.querySelector(".response").classList.remove("show");
            form.querySelector(".response-message").innerHTML = "";
          }, 2000);
        }
      }
    }
    // form validation end.
  
  });