let tagArray = [];
let tagSearchArray = [];
let mainSearchResults = [];
let tagsSearchResults = [];
let newTags = [];
let tagsArray = [];
let tagsSearchArray = [];



function globalListener(recipes) {

  // listener sur les champs avancés et les tags

  //TODO: résoudre le problème d'advancedFieldsListener => forcer la recherche dans les champs sur les derniers résultats de recherche
  advancedFieldsListener(recipes);
  tagListener();

  // RECHERCHE PRINCIPALE
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("keyup", () => {
    let query = searchInput.value.toLowerCase().trim();

    // saisie > 2 caractères && pas de tag selectionné => la recherche est lancée
    if (query.length > 2 && !newTags.length) {
      mainSearchResults = mainSearchRecipes(recipes, query);

      if (!mainSearchResults.length) {
        displayErrorMessage(); // message d'erreur si pas de recette trouvée
      } else {
        fillAdvancedFields(mainSearchResults); // on actualise les tags
        tagListener();
        displayRecipes(mainSearchResults);
      }
    }

    // saisie > 2 caractères && tag selectionné => recherche croisée avec les résultats de tags
    else if (query.length > 2 && newTags.length) {
      mainSearchResults = mainSearchRecipes(tagsSearchResults, query);
      if (!mainSearchResults.length) {
        displayErrorMessage();
      } else {
        fillAdvancedFields(mainSearchResults);
        tagListener();
        displayRecipes(mainSearchResults);
      }
    }

    // saisie < 2 caractères && pas de tag selectionné => on vide les résultats de recherche principale et on affiche toutes les recettes
    else if (query.length <= 2 && !newTags.length) {
      mainSearchResults = [];
      fillAdvancedFields(recipes);
      tagListener();
      displayRecipes(recipes);
    }

    // saisie < 2 caractères && tag selectionné => on vide le tableau de tags et on fait une recherche par tag
    else if (query.length <= 2 && newTags.length) {
      mainSearchResults = [];
      tagsSearchArray = [];
      tagsArray.forEach((tag) => {
        const tagSearchResult = tagSearchRecipes(recipes, tag);
        tagsSearchArray.push(tagSearchResult);
      });
      // on fait une recherche croisée si il y a plusieurs tags
      tagsSearchResults = tagsSearchArray.reduce((acc, cur) =>
        acc.filter((element) => cur.includes(element))
      );
      fillAdvancedFields(tagsSearchResults);
      tagListener();
      displayRecipes(tagsSearchResults);
    }
  });

  // RECHERCHE PAR TAG
  const tagsSection = document.querySelector(".tags-section");
  // on observe les changements dans le DOM sur la tagsSection
  const observer = new MutationObserver(() => {
    newTags = Array.from(document.querySelectorAll(".selected-tag"));
    tagsArray = newTags.map((tag) => tag.textContent);

    // tags selectionnés && pas de résultats de recherche principale => on fait la recherche par tag sur toutes les recettes, on affiche les résultats
    if (newTags.length && !mainSearchResults.length) {
      tagsArray.forEach((tag) => {
        const tagSearchResult = tagSearchRecipes(recipes, tag);
        tagsSearchArray.push(tagSearchResult);
      });
      // on fait une recherche croisée si il y a plusieurs tags
      tagsSearchResults = tagsSearchArray.reduce((acc, cur) =>
        acc.filter((element) => cur.includes(element))
      );
      fillAdvancedFields(tagsSearchResults);
      tagListener();
      displayRecipes(tagsSearchResults);
    }

    // tags selectionnés && résultats de recherche principale => on fait la recherche par tag sur les résultats de recherche principale, on affiche les résultats
    else if (newTags.length && mainSearchResults.length) {
      tagsArray.forEach((tag) => {
        const tagSearchResult = tagSearchRecipes(mainSearchResults, tag);
        tagsSearchArray.push(tagSearchResult);
      });
      tagsSearchResults = tagsSearchArray.reduce((acc, cur) =>
        acc.filter((element) => cur.includes(element))
      );
      fillAdvancedFields(tagsSearchResults);
      tagListener();
      displayRecipes(tagsSearchResults);

    }

    // pas de tags selectionnés && résultats de recherche principale => on vide les résultats par tag et on affiche les résultats de recherche principale
    else if (!newTags.length && mainSearchResults.length) {
      tagsSearchResults = [];
      fillAdvancedFields(mainSearchResults);
      tagListener();
      displayRecipes(mainSearchResults);
    }

    // pas de tags selectionnés && pas de recherche principale => on affiche toutes les recettes
    else {
      tagsSearchResults = [];
      mainSearchResults = [];
      fillAdvancedFields(recipes);
      tagListener();
      displayRecipes(recipes);
    }
  });

  observer.observe(tagsSection, { childList: true });
}


function tagListener() {
  const tags = Array.from(document.querySelectorAll(
    ".appliances-tag, .ustensils-tag, .ingredients-tag"
  ));
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

      let field = input.parentElement.parentElement;
      let button = input.parentElement;
      let chevron = input.nextElementSibling;
      let tagsList = input.parentElement.nextElementSibling;

      // on ouvre la dropdown et on tourne le chevron quand saisie utilisateur <=> et inversement
      switch (field.className) {
        case "ingredients-field":
          button.classList.add("ingredients-active");
          chevron.classList.add("rotate");
          tagsList.style.display = "block";
          if (input.textLength === 0) {
            button.classList.remove("ingredients-active");
            chevron.classList.remove("rotate");
            tagsList.style.display = "none";
          }
          break;
        case "appliances-field":
          button.classList.add("appliances-active");
          chevron.classList.add("rotate");
          tagsList.style.display = "block";
          if (input.textLength === 0) {
            button.classList.remove("appliances-active");
            chevron.classList.remove("rotate");
            tagsList.style.display = "none";
          }
          break;
        case "ustensils-field":
          button.classList.add("ustensils-active");
          chevron.classList.add("rotate");
          tagsList.style.display = "block";
          if (input.textLength === 0) {
            button.classList.remove("ustensils-active");
            chevron.classList.remove("rotate");
            tagsList.style.display = "none";
          }
          break;
      }
    });
  });

  // ouverture / fermeture des dropdown au click sur un chevron
  const chevrons = document.querySelectorAll(".fa-chevron-down");
  chevrons.forEach(chevron => {
    chevron.addEventListener("click", () => {
      chevron.classList.toggle("rotate");

      // la classe de l'input est adaptée en fonction du champ avancé
      changeInputClass(chevron);
      // on affiche la liste si est masquée, on la masque si elle est affichée, le placeholder est adapté
      const advancedList = chevron.parentElement.nextElementSibling;
      if (advancedList.style.display === "block") {
        chevron.parentElement.children[0].value = "";
        switch (chevron.parentElement.parentElement.className) {
          case "ingredients-field":
            chevron.parentElement.children[0].placeholder = "Ingredients";
            break;

          case "appliances-field":
            chevron.parentElement.children[0].placeholder = "Appareils";
            break;

          case "ustensils-field":
            chevron.parentElement.children[0].placeholder = "Ustensils";
            break;
        }
        advancedList.style.display = "none";
        // quand on referme un champ de recherche sans selectionner de tag => on le remet à "0"

      } else {
        advancedList.style.display = "block";
        switch (chevron.parentElement.parentElement.className) {
          case "ingredients-field":
            chevron.parentElement.children[0].placeholder = "Recherchez un ingrédient";
            break;

          case "appliances-field":
            chevron.parentElement.children[0].placeholder = "Recherchez un appareil";
            break;

          case "ustensils-field":
            chevron.parentElement.children[0].placeholder = "Recherchez un ustensile";
            break;
        }
      }
    });
  });
}


function changeInputClass(input) {
  switch (input.parentElement.parentElement.className) {
    case "ingredients-field":
      input.parentElement.classList.toggle("ingredients-active");
      break;
    case "appliances-field":
      input.parentElement.classList.toggle("appliances-active");
      break;
    case "ustensils-field":
      input.parentElement.classList.toggle('ustensils-active');
      break;
  }
}

function changePlaceholder(input) {
  let fieldInput = input.parentElement.children[0];
  switch (input.parentElement.parentElement.className) {
    case "ingredients-field":
      if (fieldInput.placeholder === "Ingredients") {
        fieldInput.placeholder = "Recherchez un ingrédient";
      } else {
        fieldInput.placeholder = "Ingredients";
      }
      break;
    case "appliances-field":
      if (fieldInput.placeholder === "Appareils") {
        fieldInput.placeholder = "Recherchez un appareil";
      } else {
        fieldInput.placeholder = "Appareils";
      }
      break;
    case "ustensils-field":
      if (fieldInput.placeholder === "Ustensiles") {
        fieldInput.placeholder = "Recherchez un ustensile";
      } else {
        fieldInput.placeholder = "Ustensiles";
      }
      break;
  }
}


