async function getRecipes() {
  const url = "data/recipes.json";
  const response = await fetch(url);
  const recipes = await response.json();
  return recipes;
}

function displayRecipes(recipes) {
  const recipesSection = document.querySelector(".results");
  recipes.forEach((recipe) => {
    const recipeModel = recipeFactory(recipe);
    const recipeCardDOM = recipeModel.getRecipeCardDOM();
    recipesSection.appendChild(recipeCardDOM);
  });
}
// Fonctions d'affichages des champs avancés => à déplacer dans un fichier à part
function displayAppliance(recipes) {
  const applianceSection = document.getElementById("appliance-search");
  applianceSection.innerHTML = "";

  // on utiliser new Set pour enlever les doublons
  const applianceArray = [
    ...new Set(recipes.map((recipe) => recipe.appliance.toLowerCase())),
  ];
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

  const ustensilsArray = recipes.map((recipe) => recipe.ustensils);
  let searchArray = [];
  ustensilsArray.forEach((element) => {
    element.forEach((ustensil) => {
      searchArray.push(ustensil.toLowerCase());
    });
  });

  // on utiliser new Set pour enlever les doublons
  const ustensilsFinalArray = [...new Set(searchArray)];

  const ustensilsList = document.createElement("ul");
  ustensilsFinalArray.forEach((element) => {
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

  const ingredientsArray = recipes.map((recipe) => recipe.ingredients);
  let searchArray = [];
  ingredientsArray.forEach((element) => {
    element.forEach((recipe) => {
      searchArray.push(recipe.ingredient.toLowerCase());
    });
  });

  // on utiliser new Set pour enlever les doublons
  const ingredientsFinalArray = [...new Set(searchArray)];
  console.log(ingredientsFinalArray);
  const ingredientsList = document.createElement("ul");
  ingredientsFinalArray.forEach((element) => {
    const li = document.createElement("li");
    li.textContent = `${element}`;
    ingredientsList.appendChild(li);
  });
  ingredientsSection.classList.add("ingredients-results");
  ingredientsSection.appendChild(ingredientsList);
}

// Fonction init
async function init() {
  const { recipes } = await getRecipes();
  displayRecipes(recipes);
  searchListener(recipes);
}

init();
