function searchListener(recipes) {
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("keyup", () => {
    let query = searchInput.value.toLowerCase();
    if (query.length > 2) {
      const searchResults = searchRecipes(recipes, query);
      if (!searchResults.length) {
        console.log(
          "Aucune recette ne correspond à votre recette, vous pouvez chercher 'tarte aux pommes', 'poisson', ..."
        );
      } else {
        document.querySelector(".results").innerHTML = "";
        displayRecipes(searchResults);
        displayAppliance(searchResults);
      }
    }
  });
}
