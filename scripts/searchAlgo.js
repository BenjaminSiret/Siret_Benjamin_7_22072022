function searchRecipes(recipes, query) {
  const results = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(query) ||
      recipe.description.toLowerCase().includes(query) ||
      recipe.ingredients.find((ingredients) =>
        ingredients.ingredient.toLowerCase().includes(query)
      )
  );
  return results;
}
