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
}


function tagListener(recipes) {
  const tags = document.querySelectorAll(".appliance-tag, .ustensil-tag, .ingredient-tag");
  let tagArray = [];
  let tagSearchArray = [];
  tags.forEach(tag => {
    tag.addEventListener("click", () => {
      tagArray.push(tag.textContent);
      displayTag(tag);

      // fermeture du tag si click sur la croix
      document.querySelectorAll(".cross").forEach(cross => {
        cross.addEventListener('click', (e) => {
          e.target.parentElement.remove();
        });
      });

      // recherche par tag sur chaque item du tableau
      tagArray.forEach(tag => {
        const tagSearchResult = tagSearchRecipes(recipes, tag);
        tagSearchArray.push(tagSearchResult);
      });
      const tagSearchResults = tagSearchArray.reduce((acc, cur) => acc.filter(element => cur.includes(element)));
      if (!tagSearchResults.length) {
        alert("pas de recettes avec cette recherche");
      } else {
        displayRecipes(tagSearchResults);
      }
    });
  });
};

function advancedFieldsListener(recipes) {
  const inputsArray = document.querySelectorAll("#appliances-input, #ustensils-input, #ingredients-input");
  inputsArray.forEach(input => {
    input.addEventListener("keyup", () => {
      let query = input.value.toLowerCase().trim();
      const filteredArray = filter(recipes, input.id);
      const searchResults = filteredArray.filter((element) => element.toLowerCase().includes(query));
      if (searchResults.length) {
        refreshAdvancedField(input, searchResults);
        tagListener(recipes);
      }
    });
  });
}
