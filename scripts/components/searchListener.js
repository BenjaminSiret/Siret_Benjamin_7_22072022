let tagArray = [];
let tagSearchArray = [];
let results = false;
let mainSearchResults = [];

//TODO: ajouter des commentaires pour expliquer le code

function searchListener(recipes) {
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
        //TODO: afficher message d'alert à la place du console.log
        displayErrorMessage();
      } else {
        document.querySelector(".results").innerHTML = "";
        displayRecipes(mainSearchResults);
        displayAdvancedFields(mainSearchResults);
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
    if (results && newTags.length) {
      tagsArray.forEach((tag) => {
        const tagSearchResult = tagSearchRecipes(mainSearchResults, tag);
        tagsSearchArray.push(tagSearchResult);
      });
      const tagsSearchResults = tagsSearchArray.reduce((acc, cur) =>
        acc.filter((element) => cur.includes(element))
      );
      if (!tagsSearchResults.length) {
        alert("pas de résultats avec ces critères de recherche");
      } else {
        displayRecipes(tagsSearchResults);
      }
    }
    // si il n'y a pas de résultats de recherche, la recherche par tag est faite sur toutes les recettes
    else if (!results && newTags.length) {
      tagsArray.forEach((tag) => {
        const tagSearchResult = tagSearchRecipes(recipes, tag);
        tagsSearchArray.push(tagSearchResult);
      });
      const tagsSearchResults = tagsSearchArray.reduce((acc, cur) =>
        acc.filter((element) => cur.includes(element))
      );
      if (!tagsSearchResults.length) {
        displayErrorMessage();
      } else {
        displayRecipes(tagsSearchResults);
      }
    }
    // si il n'y a pas d'actions, toutes les recettes sont affichées
    else {
      displayRecipes(recipes);
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
