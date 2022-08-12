function searchRecipes(recipes, query) {
  const results = [];
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    if (recipe.name.toLowerCase().includes(query.toLowerCase())) {
      results.push(recipe);
      continue;
    } else if (recipe.description.toLowerCase().includes(query.toLowerCase())) {
      results.push(recipe);
      continue;
    }
    for (let i = 0; i < recipe.ingredients.length; i++) {
      const ingredient = recipe.ingredients[i].ingredient;
      if (ingredient.toLowerCase().includes(query.toLowerCase())) {
        results.push(recipe);
        break;
      }
    }
  }
  console.log(results);
  return results;
}
