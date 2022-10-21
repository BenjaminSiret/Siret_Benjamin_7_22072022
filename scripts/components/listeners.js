let mainSearchResults = []; // tableau de resultats de recherche principale
let tagsSearchResults = []; // tableau de résultats de recherche par tags
let newTags = []; // tableau contenant les tags (éléments html)
let tagsArray = []; // tableau contenant les tags (strings) séléctionnés par l'utilisateur
let tagsSearchArray = [];// tableau contenant les résultats de recherche (non croisée) par tag
let filteredTagsArray = []; // tableau de tous les tags filtrés pour une recherche
let advancedFieldsTagsResults = []; // tableau de tags pour une recherche dans les champs avancés

function globalListener(recipes) {

  // listener sur les champs avancés et les tags
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

    //TODO: ajouter la fermeture de tous les champs avancés quand on supprime un tag ?

    // tags selectionnés && pas de résultats de recherche principale => on fait la recherche par tag sur toutes les recettes, on affiche les résultats
    if (newTags.length && !mainSearchResults.length) {
      //on vide le tableau de tags utilisés pour la recherche
      tagsSearchArray = [];
      // on ajoute chaque tag affichés au tableau de tags
      tagsArray.forEach((tag) => {
        const tagSearchResult = tagSearchRecipes(recipes, tag);
        tagsSearchArray.push(tagSearchResult);
      });
      // on fait une recherche croisée si il y a plusieurs tags
      tagsSearchResults = tagsSearchArray.reduce((acc, cur) =>
        acc.filter((element) => cur.includes(element))
      );
      // on actualise les champs avancés
      fillAdvancedFields(tagsSearchResults);
      tagListener();
      displayRecipes(tagsSearchResults);
    }

    // tags selectionnés && résultats de recherche principale => on fait la recherche par tag sur les résultats de recherche principale, on affiche les résultats
    else if (newTags.length && mainSearchResults.length) {
      tagsSearchArray = [];
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
    "#ingredients-input, #appliances-input, #ustensils-input"
  );

  inputsArray.forEach((input) => {
    input.addEventListener("keyup", () => {
      let query = input.value.toLowerCase().trim();

      // si résultat de recherche principale => on filtre à partir de ces résultats
      if (mainSearchResults.length) {
        filteredTagsArray = filter(mainSearchResults, input.id);
        // si résultat de recherche par tag => on filter à partir de ces résultats
      } else if (tagsSearchResults.length) {
        filteredTagsArray = filter(tagsSearchResults, input.id);
        // si pas de recherche => on filtre à partir de toutes les recettes
      } else {
        filteredTagsArray = filter(recipes, input.id);
      }
      advancedFieldsTagsResults = filteredTagsArray.filter((element) =>
        element.toLowerCase().startsWith(query)
      );

      //si résultat => actualisation des champs avancés, on relance le tagListener
      if (advancedFieldsTagsResults.length) {
        refreshAdvancedFields(input, advancedFieldsTagsResults);
        tagListener();
      } else {
        refreshAdvancedFields(input, advancedFieldsTagsResults);
      }


      let field = input.parentElement.parentElement;
      let button = input.parentElement;
      let chevron = input.nextElementSibling;
      let tagsList = input.parentElement.nextElementSibling;

      // on ouvre la dropdown et on tourne le chevron quand saisie utilisateur <=> et inversement
      switch (field.className) {
        case "ingredients-field":
          closeOtherActiveInputs(input); // on ferme les autres champs actifs
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
          closeOtherActiveInputs(input);
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
          closeOtherActiveInputs(input);
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
    let input = chevron.parentElement.children[0];
    let field = chevron.parentElement.parentElement;

    chevron.addEventListener("click", () => {
      closeOtherActiveInputs(input); // on ferme les autres inputs actifs le cas échéant
      chevron.classList.toggle("rotate"); // on pivote le chevron à 180 deg
      changeInputClass(chevron); // la classe de l'input est adaptée en fonction du champ avancé

      // on affiche la liste si est masquée, on la masque si elle est affichée, le placeholder est adapté
      let advancedList = chevron.parentElement.nextElementSibling;
      if (advancedList.style.display === "block") {
        input.value = "";
        switch (field.className) {
          case "ingredients-field":
            input.placeholder = "Ingredients";
            break;

          case "appliances-field":
            input.placeholder = "Appareils";
            break;

          case "ustensils-field":
            input.placeholder = "Ustensiles";
            break;
        }
        advancedList.style.display = "none";
        // fermeture du champ sur chevron => on actualise les champs
        if (mainSearchResults.length) {
          fillAdvancedFields(mainSearchResults);

        } else if (tagsSearchResults.length) {
          fillAdvancedFields(tagsSearchResults);

        } else {
          fillAdvancedFields(recipes);
        }

        tagListener(); // on relance le tagListener

      } else {
        advancedList.style.display = "block";
        switch (field.className) {
          case "ingredients-field":
            input.placeholder = "Recherchez un ingrédient";
            break;

          case "appliances-field":
            input.placeholder = "Recherchez un appareil";
            break;

          case "ustensils-field":
            input.placeholder = "Recherchez un ustensile";
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

function closeOtherActiveInputs(input) {
  const inputsButtons = Array.from(document.querySelectorAll(".search-advanced-button"));
  const inputToRemove = inputsButtons.indexOf(input.parentElement);
  inputsButtons.splice(inputToRemove, 1);
  inputsButtons.forEach(input => {
    input.classList.remove("ingredients-active", "appliances-active", "ustensils-active");
    input.nextElementSibling.style.display = "none";
    input.children[1].classList.remove("rotate");
    input.children[0].value = "";
    switch (input.parentElement.className) {
      case "ingredients-field":
        input.children[0].placeholder = "Ingrédients";
        break;
      case "appliances-field":
        input.children[0].placeholder = "Appareils";
        break;
      case "ustensils-field":
        input.children[0].placeholder = "Ustensiles";
        break;
    }
  });
}
