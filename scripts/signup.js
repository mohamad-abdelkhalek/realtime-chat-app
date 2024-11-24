// Select all forms within the .signup container
const forms = document.querySelectorAll(".signup form");
const errorText = document.querySelector(".error-txt");

if (forms.length > 0) {
    forms.forEach((form) => {
        form.onsubmit = async (e) => {
            e.preventDefault(); // Prevent form from submitting

            const formData = new FormData(form);

            try {
                // Send form data using Fetch API
                const response = await fetch("./php/signup.php", {
                    method: "POST",
                    body: formData,
                });
                
                // Get response text
                const data = await response.text();

                // Handle server response
                if (data === "success") {
                    location.href = "./users.php"; // Redirect on success
                } else {
                    if (errorText) {
                        errorText.textContent = data;
                        errorText.style.display = "block";
                    }
                }
            } catch (error) {
                console.error("Error during AJAX request:", error);
                if (errorText) {
                    errorText.textContent = "Something went wrong. Please try again.";
                    errorText.style.display = "block";
                }
            }
        };
    });
} else {
    console.warn("No forms found in the .signup container.");
}
