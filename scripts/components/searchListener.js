let tagArray = [];
let tagSearchArray = [];

function searchListener(recipes) {
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("keyup", () => {
    let query = searchInput.value.toLowerCase().trim();
    if (query.length > 2) {
      const mainSearchResults = mainSearchRecipes(recipes, query);
      if (!mainSearchResults.length) {
        //TODO: afficher message d'alert à la place du console.log
        console.log(
          "Aucune recette ne correspond à votre recette, vous pouvez chercher 'tarte aux pommes', 'poisson', ..."
        );
      } else {
        document.querySelector(".results").innerHTML = "";
        displayRecipes(mainSearchResults);
        displayAdvancedFields(mainSearchResults);
      }
      advancedFieldsListener(mainSearchResults);
      tagListener(mainSearchResults);
    }
  });
  advancedFieldsListener(recipes);
  tagListener(recipes);

  const tagsSection = document.querySelector(".tags-section");

  const observer = new MutationObserver(() => {
    const newTags = Array.from(document.querySelectorAll(".selected-tag"));
    const tagsArray = newTags.map((tag) => tag.textContent);
    const tagsSearchArray = [];
    console.log(tagsArray);
    tagsArray.forEach((tag) => {
      const tagSearchResult = tagSearchRecipes(recipes, tag);
      tagsSearchArray.push(tagSearchResult);
    });
    const tagsSearchResults = tagsSearchArray.reduce((acc, cur) =>
      acc.filter((element) => cur.includes(element))
    );
    //TODO: ajouter les conditions (si déjà une recherche + si le tableau est vide pour éviter l'erreur de reduce)
    displayRecipes(tagsSearchResults);
  });
  observer.observe(tagsSection, { childList: true });
}

function tagListener() {
  const tags = document.querySelectorAll(
    ".appliance-tag, .ustensil-tag, .ingredient-tag"
  );
  tags.forEach((tag) => {
    tag.addEventListener("click", () => {
      displayTag(tag);
    });
  });
}

function advancedFieldsListener(recipes) {
  const inputsArray = document.querySelectorAll(
    "#appliances-input, #ustensils-input, #ingredients-input"
  );
  inputsArray.forEach((input) => {
    input.addEventListener("keyup", () => {
      let query = input.value.toLowerCase().trim();
      const filteredArray = filter(recipes, input.id);
      const searchResults = filteredArray.filter((element) =>
        element.toLowerCase().includes(query)
      );
      if (searchResults.length) {
        refreshAdvancedField(input, searchResults);
        tagListener(recipes);
      }
    });
  });
}
