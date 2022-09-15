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
  recipesSection.innerHTML = "";
  recipes.forEach((recipe) => {
    const recipeModel = recipeFactory(recipe);
    const recipeCardDOM = recipeModel.getRecipeCardDOM();
    recipesSection.appendChild(recipeCardDOM);
  });
}

function displayAdvancedFields(recipes) {
  const applianceSection = document.getElementById("appliance-search");
  const ustensilsSection = document.getElementById("ustensils-search");
  const ingredientsSection = document.getElementById("ingredients-search");

  applianceSection.innerHTML = "";
  ustensilsSection.innerHTML = "";
  ingredientsSection.innerHTML = "";

  const applianceArray = filterAppliance(recipes);
  const ustensilsArray = filterUstensils(recipes);
  const ingredientsArray = filterIngredients(recipes);

  const applianceList = document.createElement("ul");
  const ustensilsList = document.createElement("ul");
  const ingredientsList = document.createElement("ul");

  applianceArray.forEach((element) => {
    const li = document.createElement("li");
    li.textContent = `${element}`;
    applianceList.appendChild(li);
  });
  ustensilsArray.forEach((element) => {
    const li = document.createElement("li");
    li.textContent = `${element}`;
    ustensilsList.appendChild(li);
  });
  ingredientsArray.forEach((element) => {
    const li = document.createElement("li");
    li.textContent = `${element}`;
    ingredientsList.appendChild(li);
  });

  applianceSection.classList.add("appliance-results");
  applianceSection.appendChild(applianceList);

  ustensilsSection.classList.add("ustensils-results");
  ustensilsSection.appendChild(ustensilsList);

  ingredientsSection.classList.add("ingredients-results");
  ingredientsSection.appendChild(ingredientsList);
}

function displayApplianceField(applianceArray) {
  const applianceSection = document.getElementById("appliance-search");
  applianceSection.innerHTML = "";
  const applianceList = document.createElement("ul");
  applianceArray.forEach((element) => {
    const li = document.createElement("li");
    li.textContent = `${element}`;
    applianceList.appendChild(li);
  });
  applianceSection.classList.add("appliance-results");
  applianceSection.appendChild(applianceList);
}

function displayUstensilsField(ustensilsArray) {
  const ustensilsSection = document.getElementById("ustensils-search");
  ustensilsSection.innerHTML = "";
  const ustensilsList = document.createElement("ul");
  ustensilsArray.forEach((element) => {
    const li = document.createElement("li");
    li.textContent = `${element}`;
    ustensilsList.appendChild(li);
  });
  ustensilsSection.classList.add("ustensils-results");
  ustensilsSection.appendChild(ustensilsList);
}

function displayIngredientsField(ingredientsArray) {
  const ingredientsSection = document.getElementById("ingredients-search");
  ingredientsSection.innerHTML = "";
  const ingredientsList = document.createElement("ul");
  ingredientsArray.forEach((element) => {
    const li = document.createElement("li");
    li.textContent = `${element}`;
    ingredientsList.appendChild(li);
  });
  ingredientsSection.classList.add("ingredients-results");
  ingredientsSection.appendChild(ingredientsList);
}

