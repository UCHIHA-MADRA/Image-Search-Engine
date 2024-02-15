const accessKey = "5c_o5TbPBBVUJ_ry5GPWjSlw_2X3SmQuSEPx_GXeusU";
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Clear previous search results when searching for a new keyword or page 1
        if (page === 1) {
            searchResult.innerHTML = "";
        }
        
        const results = data.results;

        // Display search results
        results.forEach(result => {
            const image = document.createElement("img");
            image.src = result.urls.small;
            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";

            imageLink.appendChild(image);
            searchResult.appendChild(imageLink);
        });

        // Show 'Show more' button
        showMoreBtn.style.display = "block";

        console.log(data);
    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

// Event listener for form submission
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1; // Reset page to 1 when submitting the form
    searchImages();
});

// Event listener for 'Show more' button click
showMoreBtn.addEventListener("click", () => {
    page++; // Increment page number for pagination
    searchImages();
});
