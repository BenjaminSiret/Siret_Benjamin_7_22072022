async function getRecipes() {
  const url = "data/recipes.json";
  const response = await fetch(url);
  const recipes = await response.json();
  return recipes;
}

// Fonction init
async function init() {
  const { recipes } = await getRecipes();
  displayRecipes(recipes);
  fillAdvancedFields(recipes);
  globalListener(recipes);

}

init();
