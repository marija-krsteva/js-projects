// // Form blur event listeners
document.getElementById('name').addEventListener('blur', validateName);
document.getElementById('zip').addEventListener('blur', validateZip);
document.getElementById('email').addEventListener('blur', validateEmail);
document.getElementById('phone').addEventListener('blur', validatePhone);

function validateName() {
    const name = document.getElementById('name');
    const re = /^[a-zA-Z]{2,10}$/ ;

    validation(name, re);
}

function validateZip() {
    const zip = document.getElementById('zip');
    const re = /^[0-9]{5}(-[0-9]{4})?$/ ;

    validation(zip, re);
}

function validateEmail() {
    const email = document.getElementById('email');
    const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

    validation(email, re);
}

function validatePhone() {
    const phone = document.getElementById('phone');
    const re = /^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/;

    validation(phone, re);
}

function validation(field, re) {
    if(!re.test(field.value)) {
        field.classList.add('is-invalid');
    } else {
        field.classList.remove('is-invalid');
    }
}


// Another way to do it
// const regexExpressions = {
//     name: /^[a-zA-Z]{2,10}$/,
//     zip: /^[0-9]{5}(-[0-9]{4})?$/,
//     email: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
//     phone: /^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/
// };

// document.querySelectorAll('input').forEach(el => 
//     el.addEventListener('blur', function(e){
//         const field = e.target;
//         const re = regexExpressions[field.id];

//         if(!re.test(field.value)) {
//             field.classList.add('is-invalid');
//         } else {
//             field.classList.remove('is-invalid');
//         }

//     })
// );