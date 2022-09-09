// Filter functions ***********
function filterAppliance(recipes) {
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

//************************************
// Display functions*****************

function displayRecipes(recipes) {
  const recipesSection = document.querySelector(".results");
  recipes.forEach((recipe) => {
    const recipeModel = recipeFactory(recipe);
    const recipeCardDOM = recipeModel.getRecipeCardDOM();
    recipesSection.appendChild(recipeCardDOM);
  });
}

function displayAppliance(recipes) {
  const applianceSection = document.getElementById("appliance-search");
  applianceSection.innerHTML = "";

  const applianceArray = filterAppliance(recipes);
  const applianceList = document.createElement("ul");
  applianceArray.forEach((element) => {
    const li = document.createElement("li");
    li.textContent = `${element}`;
    applianceList.appendChild(li);
  });
  applianceSection.classList.add("appliance-results");
  applianceSection.appendChild(applianceList);
}

function displayUstensils(recipes) {
  const ustensilsSection = document.getElementById("ustensils-search");
  ustensilsSection.innerHTML = "";
  const ustensilsArray = filterUstensils(recipes);
  const ustensilsList = document.createElement("ul");
  ustensilsArray.forEach((element) => {
    const li = document.createElement("li");
    li.textContent = `${element}`;
    ustensilsList.appendChild(li);
  });
  ustensilsSection.classList.add("ustensils-results");
  ustensilsSection.appendChild(ustensilsList);
}

function displayIngredients(recipes) {
  const ingredientsSection = document.getElementById("ingredients-search");
  ingredientsSection.innerHTML = "";
  const ingredientsArray = filterIngredients(recipes);
  const ingredientsList = document.createElement("ul");
  ingredientsArray.forEach((element) => {
    const li = document.createElement("li");
    li.textContent = `${element}`;
    ingredientsList.appendChild(li);
  });
  ingredientsSection.classList.add("ingredients-results");
  ingredientsSection.appendChild(ingredientsList);
}
