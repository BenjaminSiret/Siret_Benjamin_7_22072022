function displayRecipes(recipes) {
  const recipesSection = document.querySelector(".results");
  recipesSection.innerHTML = "";
  recipes.forEach((recipe) => {
    const recipeModel = recipeFactory(recipe);
    const recipeCardDOM = recipeModel.getRecipeCardDOM();
    recipesSection.appendChild(recipeCardDOM);
  });
}

function fillAdvancedFields(recipes) {
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

  ingredientsList.classList.add("ingredients-tags-list");

  appliancesArray.forEach((element) => {
    const li = document.createElement("li");
    li.textContent = `${element}`;
    li.classList.add("appliances-tag");
    appliancesList.appendChild(li);
  });
  ustensilsArray.forEach((element) => {
    const li = document.createElement("li");
    li.textContent = `${element}`;
    li.classList.add("ustensils-tag");
    ustensilsList.appendChild(li);
  });
  ingredientsArray.forEach((element) => {
    const li = document.createElement("li");
    li.textContent = `${element}`;
    li.classList.add("ingredients-tag");
    ingredientsList.appendChild(li);
  });

  appliancesSection.classList.add("appliances-tags-container");
  appliancesSection.appendChild(appliancesList);

  ustensilsSection.classList.add("ustensils-tags-container");
  ustensilsSection.appendChild(ustensilsList);

  ingredientsSection.classList.add("ingredients-tags-container");
  ingredientsSection.appendChild(ingredientsList);
}

function refreshAdvancedFields(input, advancedFieldsTagsResults) {
  const inputSection = document.getElementById(
    input.id.replace("input", "search")
  );
  inputSection.innerHTML = "";
  const inputList = document.createElement("ul");
  advancedFieldsTagsResults.forEach((element) => {
    const li = document.createElement("li");
    li.textContent = `${element}`;
    li.classList.add(`${input.id.replace("-input", "-tag")}`);
    inputList.appendChild(li);
  });
  inputSection.classList.add(`${input.id.replace("input", "results")}`);
  inputSection.appendChild(inputList);
}

function displayTag(tag) {
  const tagsSection = document.querySelector(".tags-section");
  const selectedTag = document.createElement("div");
  selectedTag.innerHTML = `<span>${tag.textContent}</span><img src='./assets/cross.png' class="cross" onClick="removeTag(this)">`;
  switch (tag.className) {
    case "appliances-tag":
      selectedTag.style.backgroundColor = "#68d9a4";
      break;
    case "ustensils-tag":
      selectedTag.style.backgroundColor = "#ed6454";
      break;
    case "ingredients-tag":
      selectedTag.style.backgroundColor = "#3282f7";
      break;
  }
  selectedTag.classList.add("selected-tag");
  tagsSection.appendChild(selectedTag);
}

function removeTag(el) {
  const element = el;
  element.parentElement.remove();
}

function displayErrorMessage() {
  const results = document.querySelector(".results");
  results.innerHTML = `<p class="error-message">"Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc..."</p>`;
}

function displayIngredientsField() {
  const ingredientsField = document.querySelector(".ingredients-tags");
  ingredientsField.style.display = "block";
}
