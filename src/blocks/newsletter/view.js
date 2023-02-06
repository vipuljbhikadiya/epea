// form validation functions
function formvalidation(form) {
    // get all input which required validation
    let formValidation = true;
    const inputs = form.querySelectorAll('[required]');

    inputs.forEach(function (input) {
        let formControl = input.closest('.form--control');
        formControl.classList.remove('error');
        let elementType = input.getAttribute('type');
        let elementlabel = input?.dataset?.label;
        let elementValue = input.value.trim();
        let elementName = input.getAttribute('name');
        switch (elementType) {
            case 'email':
                if (elementValue === '') {
                    setErrorFor(
                        formControl,
                        elementlabel + ' is required feild.'
                    );
                    formValidation = false;
                } else if (!isEmail(elementValue)) {
                    setErrorFor(
                        formControl,
                        elementlabel + ' address is not valid.'
                    );
                    formValidation = false;
                }
                break;
            case 'checkbox':
                let isChecked = document.querySelector(
                    '[name="' + elementName + '"]:checked'
                );
                if (!isChecked) {
                    setErrorFor(
                        formControl,
                        elementlabel + ' is required feild.'
                    );
                    formValidation = false;
                }
                break;
        }
    });

    return formValidation;
}

function setErrorFor(formControl, message) {
    let errorElement = formControl.querySelector('.validation--feedback');
    errorElement.innerText = message;

    formControl.classList.add('error');
}

function isEmail(email) {
    const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

let newsletterFormSubmit = document.querySelector('.newsletter--btn');
let formFeedback = document.querySelector('.form--feedback');
let newsletterForm = document.getElementById('newsletter__form');
let submissionError = document.querySelector('.submission--error');

if (newsletterForm != undefined) {
    let formHeight = newsletterForm.offsetHeight;
    formFeedback.style.minHeight = formHeight + 'px';
}

// Common Ajax callback for all async process
async function ajaxcallback(url, params) {
    let response;

    await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Cache-Control': 'no-cache',
        },
        body: params,
    })
        .then((responseData) => {
            if (responseData.status == 200) {
                response = responseData.json();
            }
        })
        .catch((error) => {});

    return response;
}

async function formSubmitAjaxHandler(form, submitButton) {
    // get the ajax action
    const action = form.getAttribute('id');
    // preapare ajax parameter

    let params = new FormData(form);

    params.append('action', action);
    // made submit disabled when user hit for call
    submitButton.disabled = true;

    // fire ajax call back function to get asynchronously data from server
    let response = await ajaxcallback(gb_ajax.ajaxurl, params);

    // process response if success
    if (response) {
        if (response?.data?.status == true) {
            form.remove();
            formFeedback.classList.remove('d-none');
        } else {
            submissionError.textContent = response?.data?.msg;
            if (submissionError.classList.contains('d-none')) {
                submissionError.classList.remove('d-none');
            }
        }
    }
    submitButton.disabled = false;
    submitButton.classList.remove('button--loading');
}

if (newsletterFormSubmit != undefined) {
    newsletterFormSubmit.addEventListener('click', function (e) {
        e.preventDefault();
        let form = e?.target?.form;

        let submitButton = e?.target;
        submissionError.classList.add('d-none');
        const isFormValid = formvalidation(form);
        if (!isFormValid) return false;
        submitButton.classList.add('button--loading');
        formSubmitAjaxHandler(form, submitButton);
    });
}