const form = document.querySelector(".typing-area");
const inputField = form.querySelector(".input-field");
const sendButton = form.querySelector("button");
const chatBox = document.querySelector(".chat-box");

// Prevent form submission
form.onsubmit = (e) => {
    e.preventDefault();
};

// Send message
sendButton.onclick = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "./php/addChat.php", true);

    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                inputField.value = ""; // Clear input field after sending
            }
        }
    };

    const formData = new FormData(form);
    xhr.send(formData);
};


chatBox.onmouseenter = () => {
    chatBox.classList.add("active");
}

chatBox.onmouseleave = () => {
    chatBox.classList.remove("active");
}

// Fetch messages
const fetchChatList = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "./php/getChat.php", true);

    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            const data = xhr.response;
            chatBox.innerHTML = data; // Update chat box

            // Scroll to the bottom
            if(!chatBox.classList.contains("active")){
                chatBox.scrollTop = chatBox.scrollHeight;
            }
        }
    };

    xhr.onerror = () => {
        alert("Failed to fetch messages. Please try again later.");
        console.error("Failed to update chat list.");
    };

    // Include outgoing_id and incoming_id in the request
    const formData = new FormData();
    formData.append("outgoing_id", document.querySelector("input[name='outgoing_id']").value);
    formData.append("incoming_id", document.querySelector("input[name='incoming_id']").value);

    xhr.send(formData);
};

// Poll for updates every 5 seconds
setInterval(fetchChatList, 5000);
