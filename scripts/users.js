const userList = document.querySelector(".users .users-list");
const searchBar = document.querySelector(".users .search input");
const searchButton = document.querySelector(".users .search button");

// Toggle search bar visibility and focus
document.addEventListener("DOMContentLoaded", () => {
    searchButton.addEventListener("click", () => {
        const isActive = searchBar.classList.toggle("active");
        searchButton.classList.toggle("active", isActive);
        if (isActive) searchBar.focus();
    });
});

// Search functionality
searchBar.onkeyup = () => {
    const searchTerm = searchBar.value.trim();
    searchBar.classList.toggle("active", searchTerm !== "");

    // Perform AJAX request for search
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "./php/search.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            const data = xhr.response;
            console.log(data); // Debugging: log the server response
            userList.innerHTML = data; // Update user list with search results
        }
    };

    xhr.onerror = () => console.error("Search request failed.");
    xhr.send(`searchTerm=${encodeURIComponent(searchTerm)}`); // Send sanitized input
};

// Periodic user list updates
const fetchUserList = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "./php/getUsers.php", true);

    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            const data = xhr.response;
            if (!searchBar.classList.contains("active")) {
                userList.innerHTML = data; // Update user list if search is inactive
            }
        }
    };

    xhr.onerror = () => console.error("User list update failed.");
    xhr.send();
};

// Poll for updates every 5 seconds (adjust frequency as needed)
setInterval(fetchUserList, 5000);
