// Select all forms within the .login container
const forms = document.querySelectorAll(".login form");
const errorText = document.querySelector(".error-txt");

forms.forEach((form) => {
    form.onsubmit = (e) => {
        e.preventDefault(); // Prevent the form from submitting


    );}}