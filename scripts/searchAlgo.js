function searchRecipes(recipes, query) {
  const results = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(query.toLowerCase()) ||
      recipe.description.toLowerCase().includes(query.toLowerCase()) ||
      recipe.ingredients.find((ingredients) =>
        ingredients.ingredient.toLowerCase().includes(query.toLowerCase())
      )
  );
  console.log(results);
  return results;
}
