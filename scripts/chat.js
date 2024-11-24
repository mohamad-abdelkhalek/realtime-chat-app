const form = document.querySelector(".typing-area");
const inputField = form.querySelector(".input-field");
const sendButton = form.querySelector("button");
const chatBox = document.querySelector(".chat-box");

form.onsubmit = (e) => {
    e.preventDefault(); // Prevent the form from submitting
};

sendButton.onclick = () => {
    // AJAX start
    const xhr = new XMLHttpRequest(); // Create a new XMLHttpRequest object
    xhr.open("POST", "./php/addChat.php", true);

    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                inputField.value = ""; // Clear input field after successful insertion
            }
        }
    };

    // Send form data
    const formData = new FormData(form);
    xhr.send(formData);
};

const fetchChatList = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "./php/getChat.php", true);

    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            const data = xhr.response;
            chatBox.innerHTML = data; // Update chat box with new messages
        }
    };

    xhr.onerror = () => console.error("Failed to update chat list.");
    xhr.send(); // Fetch chat messages without sending form data
};

// Poll for updates every 5 seconds
setInterval(fetchChatList, 5000);
