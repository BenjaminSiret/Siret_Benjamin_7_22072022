let tagArray = [];
let tagSearchArray = [];
let results = false;
let mainSearchResults = [];



//TODO: ajouter des commentaires pour expliquer le code

function globalListener(recipes) {
  // base listeners
  advancedFieldsListener(recipes);

  // search-input listener
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("keyup", () => {
    let query = searchInput.value.toLowerCase().trim();
    if (query.length > 2) {
      mainSearchResults = mainSearchRecipes(recipes, query);
      if (!mainSearchResults.length) {
        displayErrorMessage();
        results = false;
      } else {
        document.querySelector(".results").innerHTML = "";
        displayRecipes(mainSearchResults);
        fillAdvancedFields(mainSearchResults);
        advancedFieldsListener(mainSearchResults);
        tagListener();
        results = true;
      }
      advancedFieldsListener(mainSearchResults);
    } else {
      displayRecipes(recipes);
      results = false;
    }
  });


  const tagsSection = document.querySelector(".tags-section");
  const observer = new MutationObserver(() => {
    const newTags = Array.from(document.querySelectorAll(".selected-tag"));
    const tagsArray = newTags.map((tag) => tag.textContent);
    const tagsSearchArray = [];
    const chevron = document.querySelector(".rotate");
    const input = chevron.parentElement.children[0];
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
        advancedFieldsListener(tagsSearchResults);
      } else {
        displayRecipes(mainSearchResults);
        fillAdvancedFields(mainSearchResults);
        advancedFieldsListener(mainSearchResults);
        tagListener();
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
        advancedFieldsListener(tagsSearchResults);
        tagListener();
      } else {
        // il faut remettre le placeholder du champ
        input.value = "";
        //changePlaceholder(chevron);
        displayRecipes(recipes);
        fillAdvancedFields(recipes);
        advancedFieldsListener(recipes);
        tagListener();
      }
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
        fillAdvancedFields(recipes);
      } else {
        fillAdvancedFields(recipes);
        tagListener();
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


