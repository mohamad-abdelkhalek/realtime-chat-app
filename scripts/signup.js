// Select all forms within the .signup container
const forms = document.querySelectorAll(".signup form"); 
const errorText = document.querySelector(".error-txt");

forms.forEach((form) => {
    form.onsubmit = (e) => {
        e.preventDefault(); // Prevent form from submitting

        // Ajax start
        let xhr = new XMLHttpRequest(); // Create XML Object
        xhr.open("POST", "./php/signup.php", true);

        xhr.onload = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    let data = xhr.responseText; // Correctly get the response text
                    if (data === "success") {
                        location.href = "users.html";
                    } else {
                        errorText.textContent = data;
                        errorText.style.display = "block";
                    }
                }
            }
        };

        // Send form data
        const formData = new FormData(form);
        xhr.send(formData);
    };
});
