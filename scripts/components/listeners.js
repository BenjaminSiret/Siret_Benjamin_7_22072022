let tagArray = [];
let tagSearchArray = [];
let results = false;
let mainSearchResults = [];

// const ingredientsInput = document.getElementById("ingredients-input");
// const appliancesInput = document.getElementById("appliances-input");
// const ustensilsInput = document.getElementById("ustensils-input");

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

  // ouverture / fermeture des dropdown

  const chevrons = document.querySelectorAll(".fa-chevron-down");

  chevrons.forEach(chevron => {
    chevron.addEventListener("click", (e) => {
      chevron.classList.toggle("rotate");

      // la classe est adaptée en fonction du champ avancé
      switch (e.target.parentElement.parentElement.className) {
        case "ingredients-field":
          e.target.parentElement.classList.toggle("ingredients-active");
          break;
        case "ustensils-active":
          e.target.parentElement.classList.toggle('ustensils-active');
          break;
        default:
          e.target.parentElement.classList.toggle("active");
          break;
      }

      // on affiche la liste si est masquée, on la masque si elle est affichée
      const advancedList = e.target.parentElement.nextElementSibling;
      if (advancedList.style.display === "block") {
        advancedList.style.display = "none";
      } else {
        advancedList.style.display = "block";
      }
    });
  });
}


