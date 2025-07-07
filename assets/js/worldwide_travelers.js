const form = document.getElementById("search-form");
form.addEventListener("submit", execute_search);
function execute_search(e) {
	e.preventDefault();
	let searchTerm = document.getElementById("search-field").value;
	if (!searchTerm) {
		alert("No input provided. Please check the field");
	} else {
		fetch("../../worldwide_travelers_api.json")
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.error("Failed to load API:", error);
			});
	}
}
