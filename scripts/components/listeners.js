let tagArray = [];
let tagSearchArray = [];
let results = false;
let mainSearchResults = [];

//TODO: ajouter des commentaires pour expliquer le code

function globalListener(recipes) {
  // base listeners
  advancedFieldsListener(recipes);
  tagListener();

  // search-input listener
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("keyup", () => {
    let query = searchInput.value.toLowerCase().trim();
    if (query.length > 2) {
      mainSearchResults = mainSearchRecipes(recipes, query);
      if (!mainSearchResults.length) {
        displayErrorMessage();
      } else {
        document.querySelector(".results").innerHTML = "";
        displayRecipes(mainSearchResults);
        fillAdvancedFields(mainSearchResults);
        results = true;
      }
      advancedFieldsListener(mainSearchResults);
      tagListener();
    }
  });

  // tags-section observer
  const tagsSection = document.querySelector(".tags-section");
  const observer = new MutationObserver(() => {
    const newTags = Array.from(document.querySelectorAll(".selected-tag"));
    const tagsArray = newTags.map((tag) => tag.textContent);
    const tagsSearchArray = [];
    // si il y a déjà un résultat de recherche, la recherche par tag est faite à partir de ces résultats
    if (results) {
      if (newTags.length) {
        tagsArray.forEach((tag) => {
          const tagSearchResult = tagSearchRecipes(mainSearchResults, tag);
          tagsSearchArray.push(tagSearchResult);
        });
        const tagsSearchResults = tagsSearchArray.reduce((acc, cur) =>
          acc.filter((element) => cur.includes(element))
        );
        displayRecipes(tagsSearchResults);
        fillAdvancedFields(tagsSearchResults);
      } else {
        displayRecipes(mainSearchResults);
        fillAdvancedFields(mainSearchResults);
      }
      advancedFieldsListener(mainSearchResults);
      tagListener();
    }

    // si il n'y a pas de résultats de recherche, la recherche par tag est faite sur toutes les recettes
    else if (!results) {
      if (newTags.length) {
        tagsArray.forEach((tag) => {
          const tagSearchResult = tagSearchRecipes(recipes, tag);
          tagsSearchArray.push(tagSearchResult);
        });
        const tagsSearchResults = tagsSearchArray.reduce((acc, cur) =>
          acc.filter((element) => cur.includes(element))
        );
        displayRecipes(tagsSearchResults);
        fillAdvancedFields(tagsSearchResults);
        advancedFieldsListener(recipes);
        tagListener();
      } else {
        displayRecipes(recipes);
        fillAdvancedFields(recipes);
        tagListener();
      }
    }
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
        tagListener();
      }
    });
  });
}