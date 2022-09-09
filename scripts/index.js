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
  const applianceArray = [
    ...new Set(recipes.map((recipe) => recipe.appliance)),
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

// function displayUstensils(recipes) {
//   const ustensilSection = document.getElementById("ustensils-search");
//   applianceSection.innerHTML = "";
//   const ustensilArray = [
//     ...new Set(recipes.map((recipe) => recipe.ustensil)),
//   ];
//   const applianceList = document.createElement("ul");
//   applianceArray.forEach((element) => {
//     const li = document.createElement("li");
//     li.textContent = `${element}`;
//     applianceList.appendChild(li);
//   });
//   applianceSection.classList.add("appliance-results");
//   applianceSection.appendChild(applianceList);
// }

// Fonction init
async function init() {
  const { recipes } = await getRecipes();
  displayRecipes(recipes);
  searchListener(recipes);
}

init();
