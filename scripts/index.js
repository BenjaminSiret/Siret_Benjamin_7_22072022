const query = "";

function searchListener(recipes) {
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("keyup", () => {
    let query = searchInput.value;
    if (query.length > 2) {
      const searchResults = searchRecipes(recipes, query);
      if (!searchResults.length) {
        console.log(
          "Aucune recette ne correspond à votre recette, vous pouvez chercher 'tarte aux pommes', 'poisson', ..."
        );
        displayRecipes(recipes);
      } else {
        document.querySelector(".results").innerHTML = "";
        displayRecipes(searchResults);
      }
    }
  });
}

async function getRecipes() {
  const url = "data/recipes.json";
  const response = await fetch(url);
  const recipes = await response.json();
  return recipes;
}

async function displayRecipes(recipes) {
  const recipesSection = document.querySelector(".results");

  recipes.forEach((recipe) => {
    const recipeModel = recipeFactory(recipe);
    const recipeCardDOM = recipeModel.getRecipeCardDOM();
    recipesSection.appendChild(recipeCardDOM);
  });
}

async function init() {
  const { recipes } = await getRecipes();
  displayRecipes(recipes);
  searchListener(recipes);
}

init();
