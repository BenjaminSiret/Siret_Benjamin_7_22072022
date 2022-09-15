// Filter functions ***********
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
  const appliancesSection = document.getElementById("appliances-search");
  const ustensilsSection = document.getElementById("ustensils-search");
  const ingredientsSection = document.getElementById("ingredients-search");

  appliancesSection.innerHTML = "";
  ustensilsSection.innerHTML = "";
  ingredientsSection.innerHTML = "";

  const appliancesArray = filterAppliances(recipes);
  const ustensilsArray = filterUstensils(recipes);
  const ingredientsArray = filterIngredients(recipes);

  const appliancesList = document.createElement("ul");
  const ustensilsList = document.createElement("ul");
  const ingredientsList = document.createElement("ul");

  appliancesArray.forEach((element) => {
    const li = document.createElement("li");
    li.textContent = `${element}`;
    li.classList.add("appliance-tag");
    appliancesList.appendChild(li);
  });
  ustensilsArray.forEach((element) => {
    const li = document.createElement("li");
    li.textContent = `${element}`;
    li.classList.add("ustensil-tag");
    ustensilsList.appendChild(li);
  });
  ingredientsArray.forEach((element) => {
    const li = document.createElement("li");
    li.textContent = `${element}`;
    li.classList.add("ingredient-tag");
    ingredientsList.appendChild(li);
  });

  appliancesSection.classList.add("appliance-results");
  appliancesSection.appendChild(appliancesList);

  ustensilsSection.classList.add("ustensils-results");
  ustensilsSection.appendChild(ustensilsList);

  ingredientsSection.classList.add("ingredients-results");
  ingredientsSection.appendChild(ingredientsList);
}

function displayAppliancesField(appliancesArray) {
  const appliancesSection = document.getElementById("appliances-search");
  appliancesSection.innerHTML = "";
  const appliancesList = document.createElement("ul");
  appliancesArray.forEach((element) => {
    const li = document.createElement("li");
    li.textContent = `${element}`;
    appliancesList.appendChild(li);
  });
  appliancesSection.classList.add("appliances-results");
  appliancesSection.appendChild(appliancesList);
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

function displayTag(tag) {
  const tagsSection = document.querySelector(".tags-section");
  const selectedTag = document.createElement("div");
  selectedTag.innerHTML = `<span>${tag.textContent}</span><img src='./assets/cross.png' class="cross">`;
  switch (tag.className) {
    case "appliance-tag":
      selectedTag.style.backgroundColor = "#68d9a4";
      break;
    case "ustensil-tag":
      selectedTag.style.backgroundColor = "#ed6454";
      break;
    case "ingredient-tag":
      selectedTag.style.backgroundColor = "#3282f7";
      break;
  }
  selectedTag.classList.add("selected-tag");
  tagsSection.appendChild(selectedTag);
}
