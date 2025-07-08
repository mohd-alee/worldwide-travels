const form = document.getElementById("search-form");
form.addEventListener("submit", execute_search);
function execute_search(e) {
	e.preventDefault();
	let searchTerm = document.getElementById("search-field").value;
	const searchContainer = document.getElementById("search-results");
	searchContainer.innerHTML = "";
	searchContainer.classList.remove("show");
	if (!searchTerm) {
		alert("No input provided. Please check the field");
	} else {
		console.clear();
		searchTerm = searchTerm.toLowerCase();
		fetch("../../worldwide_travelers_api.json")
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				for (const category in data) {
					if (category.includes(searchTerm)) {
						data[category].forEach((item) => {
							console.log(item);
							// Single Parent Div
							let singleSearchWrap = document.createElement("div");
							singleSearchWrap.classList.add(
								"d-flex",
								"flex-wrap",
								"flex-column",
								"gap-2"
							);

							// Single Result Image
							let resultImg = document.createElement("img");
							resultImg.setAttribute(
								"src",
								`/assets/imgs/api/${item.imageUrl}`
							);
							resultImg.classList.add("img-fluid");

							// Single Result Title
							let resultTitle = document.createElement("h5");
							resultTitle.classList.add("mb-0");
							resultTitle.textContent = item.name;

							// Single Result Description
							let resultDesc = document.createElement("p");
							resultDesc.classList.add("mb-0");
							resultDesc.textContent = item.description;

							// Assembling Single Result
							singleSearchWrap.appendChild(resultImg);
							singleSearchWrap.appendChild(resultTitle);
							singleSearchWrap.appendChild(resultDesc);

							// Adding into main Container
							searchContainer.appendChild(singleSearchWrap);
						});
					}
				}
				searchContainer.classList.add("show");
			})
			.catch((error) => {
				console.error("Failed to load API:", error);
			});
	}
}
