async function getRecipes() {
  const url = "data/recipes.json";
  const response = await fetch(url);
  const recipes = await response.json();
  console.log(recipes);
}

getRecipes();
