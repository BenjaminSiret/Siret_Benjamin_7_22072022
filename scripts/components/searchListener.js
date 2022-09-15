function searchListener(recipes) {
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("keyup", () => {
    let query = searchInput.value.toLowerCase().trim();
    if (query.length > 2) {
      const searchResults = searchRecipes(recipes, query);
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

      const appliancesSearchInput = document.getElementById("appliances-input");
      appliancesSearchInput.addEventListener("keyup", () => {
        let query = appliancesSearchInput.value.toLowerCase().trim();
        const appliancesArray = filterAppliances(searchResults);
        const appliancesSearchResults = appliancesArray.filter(
          (element) => element.toLowerCase().includes(query)
        );
        if (appliancesSearchResults) {
          displayAppliancesField(appliancesSearchResults);
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

  // event-listener sur tous les tags pour que l'utilisateur puisse clicker
  const tags = document.querySelectorAll(".appliance-tag, .ustensil-tag, .ingredient-tag");
  tags.forEach(tag => {
    tag.addEventListener("click", () => {
      tagFactory(tag);
    });
  });


}

function tagFactory(tag) {
  const tagsSection = document.querySelector(".tags-section");
  const selectedTag = document.createElement("div");
  selectedTag.innerHTML = `<span>${tag.textContent}</span><img src='./assets/cross.png' class="cross">`;
  switch (tag.className) {
    case "appliance-tag":
      selectedTag.style.backgroundColor = "#68d9a4";
      break;
    case "ustensil-tag":
      selectedTag.style.backgroundColor = "#ed6454";
      break;
    case "ingredient-tag":
      selectedTag.style.backgroundColor = "#3282f7";
      break;
  }
  selectedTag.classList.add("selected-tag");
  tagsSection.appendChild(selectedTag);
}
