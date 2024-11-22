// Select all forms within the .login container
const forms = document.querySelectorAll(".login form");
const errorText = document.querySelector(".error-txt");

forms.forEach((form) => {
    form.onsubmit = (e) => {
        e.preventDefault(); // Prevent the form from submitting

         // AJAX start
         const xhr = new XMLHttpRequest(); // Create a new XMLHttpRequest object
         xhr.open("POST", "./php/login.php", true);

    );}}