function filterAppliances(recipes) {
  return [...new Set(recipes.map((recipe) => recipe.appliance.toLowerCase()))];
}

function filterUstensils(recipes) {
  const ustensilsArray = recipes.map((recipe) => recipe.ustensils);
  let searchArray = [];
  ustensilsArray.forEach((element) => {
    element.forEach((ustensil) => {
      searchArray.push(ustensil.toLowerCase());
    });
  });
  return [...new Set(searchArray)];
}

function filterIngredients(recipes) {
  const ingredientsArray = recipes.map((recipe) => recipe.ingredients);
  let searchArray = [];
  ingredientsArray.forEach((element) => {
    element.forEach((recipe) => {
      searchArray.push(recipe.ingredient.toLowerCase());
    });
  });
  return [...new Set(searchArray)];
}


function filter(recipes, input) {
  if (input === "appliances-input") {
    return [...new Set(recipes.map((recipe) => recipe.appliance.toLowerCase()))];

  } else if (input === "ustensils-input") {
    const ustensilsArray = recipes.map((recipe) => recipe.ustensils);
    let searchArray = [];
    ustensilsArray.forEach((element) => {
      element.forEach((ustensil) => {
        searchArray.push(ustensil.toLowerCase());
      });
    });
    return [...new Set(searchArray)];

  } else if (input === "ingredients-input") {
    const ingredientsArray = recipes.map((recipe) => recipe.ingredients);
    let searchArray = [];
    ingredientsArray.forEach((element) => {
      element.forEach((recipe) => {
        searchArray.push(recipe.ingredient.toLowerCase());
      });
    });
    return [...new Set(searchArray)];
  }
}
