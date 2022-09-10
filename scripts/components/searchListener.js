function searchListener(recipes) {
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("keyup", () => {
    let query = searchInput.value.toLowerCase().trim();
    if (query.length > 2) {
      const searchResults = searchRecipes(recipes, query);
      console.log(searchResults);
      if (!searchResults.length) {
        //TODO: afficher message d'alert à la place du console.log
        console.log(
          "Aucune recette ne correspond à votre recette, vous pouvez chercher 'tarte aux pommes', 'poisson', ..."
        );
      } else {
        document.querySelector(".results").innerHTML = "";
        displayRecipes(searchResults);
        displayAdvancedFields(searchResults);
        //applianceListener(searchResults);
      }
      const applianceSearchInput = document.getElementById("appliance-input");
      applianceSearchInput.addEventListener("keyup", () => {
        let query = applianceSearchInput.value.toLowerCase().trim();
        const newSearchResults = searchRecipes(searchResults, query);
        console.log(newSearchResults);
        const applianceArray = filterAppliance(newSearchResults);
        const applianceSearchResult = applianceArray.find(
          (element) => element.toLowerCase() === query
        );
        if (applianceSearchResult) {
          displayAdvancedFields(newSearchResults);
          displayRecipes(newSearchResults);
        }
      });
    }
  });
}

// function applianceListener(searchResults) {
//   const searchInput = document.getElementById("appliance-input");
//   searchInput.addEventListener("keyup", () => {
//     let query = searchInput.value.toLowerCase().trim();
//     const applianceArray = filterAppliance(searchResults);
//     const applianceResults = applianceArray.find(
//       (appliance) => appliance === query
//     );
//     console.log(applianceResults);
//   });
// }
