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
      }

      const applianceSearchInput = document.getElementById("appliance-input");
      applianceSearchInput.addEventListener("keyup", () => {
        let query = applianceSearchInput.value.toLowerCase().trim();
        const applianceArray = filterAppliance(searchResults);
        const applianceSearchResults = applianceArray.filter(
          (element) => element.toLowerCase().includes(query)
        );
        if (applianceSearchResults) {
          displayApplianceField(applianceSearchResults);
          // const newSearchResults = searchRecipes(recipes, applianceSearchResults);
          // displayRecipes(newSearchResults);
        }

      });

      const ustensilsSearchInput = document.getElementById("ustensils-input");
      ustensilsSearchInput.addEventListener("keyup", () => {
        let query = ustensilsSearchInput.value.toLowerCase().trim();
        const ustensilsArray = filterUstensils(searchResults);
        const ustensilsSearchResults = ustensilsArray.filter((element) => element.toLowerCase().includes(query));
        if (ustensilsSearchResults) {
          displayUstensilsField(ustensilsSearchResults);
          // const newSearchResults = searchRecipes(recipes, ustensilsSearchResults);
          // displayRecipes(newSearchResults);
        }
      });

      const ingredientsSearchInput = document.getElementById("ingredients-input");
      ingredientsSearchInput.addEventListener("keyup", () => {
        let query = ingredientsSearchInput.value.toLowerCase().trim();
        const ingredientsArray = filterIngredients(searchResults);
        const ingredientsSearchResults = ingredientsArray.filter((element) => element.toLowerCase().includes(query));
        if (ingredientsSearchResults) {
          displayIngredientsField(ingredientsSearchResults);
          // const newSearchResults = searchRecipes(recipes, ingredientsSearchResults);
          // displayRecipes(newSearchResults);
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
