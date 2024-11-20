// Select all forms within the .signup container
const forms = document.querySelectorAll(".signup form"); 
const errorText = document.querySelector(".error-txt");

forms.forEach((form) => {
    form.onsubmit = (e) => {
        e.preventDefault(); // Prevent form from submitting )}};