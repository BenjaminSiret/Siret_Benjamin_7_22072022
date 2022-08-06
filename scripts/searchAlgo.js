function searchRecipes(recipes, query) {
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    if (recipe.name.toLowerCase().includes(query.toLowerCase())) {
      //TODO: ajouter un tableau de résultats et push les recettes dedans à la place des console.log()
      console.log(recipe);
      continue;
    } else if (recipe.description.toLowerCase().includes(query.toLowerCase())) {
      console.log(recipe);
      continue;
    }
    for (let i = 0; i < recipe.ingredients.length; i++) {
      const ingredient = recipe.ingredients[i].ingredient;
      if (ingredient.toLowerCase().includes(query.toLowerCase())) {
        console.log(recipe);
        break;
      }
    }
  }
}
