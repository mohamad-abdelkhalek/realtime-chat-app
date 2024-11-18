document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.querySelector(".users .search input");
    const searchButton = document.querySelector(".users .search button");

    searchButton.addEventListener("click", () => {
        const isActive = searchBar.classList.toggle("active");
        searchButton.classList.toggle("active", isActive); // Sync button state
        if (isActive) searchBar.focus(); // Focus when visible
    });
});
