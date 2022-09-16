function searchListener(recipes) {
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("keyup", () => {
    let query = searchInput.value.toLowerCase().trim();
    if (query.length > 2) {
      const mainSearchResults = mainSearchRecipes(recipes, query);
      if (!mainSearchResults.length) {
        //TODO: afficher message d'alert à la place du console.log
        console.log(
          "Aucune recette ne correspond à votre recette, vous pouvez chercher 'tarte aux pommes', 'poisson', ..."
        );
      } else {
        document.querySelector(".results").innerHTML = "";
        displayRecipes(mainSearchResults);
        displayAdvancedFields(mainSearchResults);
      }

      const appliancesSearchInput = document.getElementById("appliances-input");
      appliancesSearchInput.addEventListener("keyup", () => {
        let query = appliancesSearchInput.value.toLowerCase().trim();
        const appliancesArray = filterAppliances(mainSearchResults);
        const appliancesSearchResults = appliancesArray.filter(
          (element) => element.toLowerCase().includes(query)
        );
        if (appliancesSearchResults.length) {
          displayAppliancesField(appliancesSearchResults);
          const newSearchResults = tagSearchRecipes(mainSearchResults, query);
          displayRecipes(newSearchResults);
        } else {
          console.log("toto");
        }
      });

      const ustensilsSearchInput = document.getElementById("ustensils-input");
      ustensilsSearchInput.addEventListener("keyup", () => {
        let query = ustensilsSearchInput.value.toLowerCase().trim();
        const ustensilsArray = filterUstensils(mainSearchResults);
        const ustensilsSearchResults = ustensilsArray.filter((element) => element.toLowerCase().includes(query));
        if (ustensilsSearchResults.length) {
          displayUstensilsField(ustensilsSearchResults);
          const newSearchResults = tagSearchRecipes(mainSearchResults, query);
          displayRecipes(newSearchResults);
        }
      });

      const ingredientsSearchInput = document.getElementById("ingredients-input");
      ingredientsSearchInput.addEventListener("keyup", () => {
        let query = ingredientsSearchInput.value.toLowerCase().trim();
        const ingredientsArray = filterIngredients(mainSearchResults);
        const ingredientsSearchResults = ingredientsArray.filter((element) => element.toLowerCase().includes(query));
        if (ingredientsSearchResults.length) {
          displayIngredientsField(ingredientsSearchResults);
          const newSearchResults = tagSearchRecipes(mainSearchResults, query);
          displayRecipes(newSearchResults);
        }
      });

      tagListener(mainSearchResults);
    }
  });


  //tagListener(recipes);
}


function tagListener(recipes) {
  const tags = document.querySelectorAll(".appliance-tag, .ustensil-tag, .ingredient-tag");
  let tagArray = [];
  tags.forEach(tag => {
    tag.addEventListener("click", () => {

    });
  });
}

