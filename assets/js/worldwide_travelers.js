const form = document.getElementById("search-form");
form.addEventListener("submit", execute_search);
function execute_search(e) {
	e.preventDefault();
	let searchTerm = document.getElementById("search-field").value;
	const searchContainer = document.getElementById("search-results");
	let result404;
	searchContainer.innerHTML = "";
	searchContainer.classList.remove("show");
	if (!searchTerm) {
		alert("No input provided. Please check the field");
	} else {
		searchTerm = searchTerm.toLowerCase();
		fetch("../../worldwide_travelers_api.json")
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				for (const category in data) {
					if (category.includes(searchTerm)) {
						data[category].forEach((item) => {
							if (item.cities) {
								const cities = item.cities;
								cities.map(function (city, index) {
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
									resultImg.classList.add("img-fluid");
									resultImg.setAttribute(
										"src",
										`/assets/imgs/api/${city.imageUrl}`
									);

									// Single Result Title
									let resultTitle = document.createElement("h5");
									resultTitle.classList.add("mb-0");
									resultTitle.textContent = city.name;

									// Single Result Description
									let resultDesc = document.createElement("p");
									resultDesc.classList.add("mb-0");
									resultDesc.textContent = city.description;

									// Assembling Single Result
									singleSearchWrap.appendChild(resultImg);
									singleSearchWrap.appendChild(resultTitle);
									singleSearchWrap.appendChild(resultDesc);

									// Adding into main Container
									searchContainer.appendChild(singleSearchWrap);
								});
							} else {
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
								resultImg.classList.add("img-fluid");
								resultImg.setAttribute(
									"src",
									`/assets/imgs/api/${item.imageUrl}`
								);

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
							}
						});
						result404 = false;
						break;
					} else {
						result404 = true;
					}
				}
				if (result404) {
					let noResultsFound = document.createElement("h6");
					noResultsFound.classList.add("mb-0");
					noResultsFound.textContent = "Nothing Matches your search query";
					searchContainer.appendChild(noResultsFound);
				}
				searchContainer.classList.add("show");
			})
			.catch((error) => {
				console.error("Failed to load API:", error);
			});
	}
}
