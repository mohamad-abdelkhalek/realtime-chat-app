const passwordField = document.querySelector(".form input[type='password']");
const toggleButton = document.querySelector(".form .field i");

toggleButton.addEventListener("click", () => {
  if (passwordField.type === "password") {
    passwordField.type = "text";
    toggleButton.classList.replace("fa-eye", "fa-eye-slash"); // Change the icon
  } else {
    passwordField.type = "password";
    toggleButton.classList.replace("fa-eye-slash", "fa-eye"); // Change back the icon
  }
});
