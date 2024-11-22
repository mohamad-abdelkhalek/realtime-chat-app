// Select all forms within the .login container
const forms = document.querySelectorAll(".login form");
const errorText = document.querySelector(".error-txt");

forms.forEach((form) => {
    form.onsubmit = (e) => {
        e.preventDefault(); // Prevent the form from submitting

        // AJAX start
        const xhr = new XMLHttpRequest(); // Create a new XMLHttpRequest object
        xhr.open("POST", "./php/login.php", true);

        xhr.onload = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    try {
                        const response = JSON.parse(xhr.responseText); // Parse the JSON response
                        if (response.status === "success") {
                            location.href = "users.html"; // Redirect to users page
                        } else {
                            errorText.textContent = response.message || "An error occurred.";
                            errorText.style.display = "block";
                        }
                    } catch (error) {
                        errorText.textContent = "Invalid response from server.";
                        errorText.style.display = "block";
                        console.error("Response parsing error:", error);
                    }
                } else {
                    errorText.textContent = `Error: ${xhr.status}`;
                    errorText.style.display = "block";
                }
            }
        };

        xhr.onerror = () => {
            errorText.textContent = "Failed to connect to the server. Please try again.";
            errorText.style.display = "block";
        };

        // Send form data
        const formData = new FormData(form);
        xhr.send(formData);
    };
});
