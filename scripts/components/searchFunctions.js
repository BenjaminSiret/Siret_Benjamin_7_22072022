function mainSearchRecipes(recipes, query) {
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

function tagSearchRecipes(recipes, query) {
  const results = recipes.filter(
    (recipe) =>
      recipe.appliance.toLowerCase().includes(query) ||
      recipe.ingredients.find((ingredients) => ingredients.ingredient.toLowerCase().includes(query)) ||
      recipe.ustensils.find((ustensil) => ustensil.toLowerCase().includes(query))
  );
  return results;
}
