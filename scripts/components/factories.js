function recipeFactory(data) {
  const {
    id,
    name,
    servings,
    ingredients,
    time,
    description,
    appliance,
    ustensils,
  } = data;

  function getRecipeCardDOM() {
    const card = document.createElement("article");
    card.classList.add("card");
    card.innerHTML = `<div class="card-content">
                        <div class="card-content-header">
                          <h2 class="recipe-title">${name}</h2>
                          <p class="recipe-time">${time}</p>
                        </div>
                        <div class="card-content-text">
                          <p class="recipe-text">${description}</p>
                        </div>
                      </div>`;
    return card;
  }
  return {
    id,
    name,
    servings,
    ingredients,
    time,
    description,
    appliance,
    ustensils,
    getRecipeCardDOM,
  };
}

function tagFactory(tag) {
  const tagsSection = document.querySelector(".tags-section");
  const selectedTag = document.createElement("div");
  selectedTag.innerHTML = `<span>${tag.textContent}</span><img src='./assets/cross.png' class="cross">`;
  switch (tag.className) {
    case "appliance-tag":
      selectedTag.style.backgroundColor = "#68d9a4";
      break;
    case "ustensil-tag":
      selectedTag.style.backgroundColor = "#ed6454";
      break;
    case "ingredient-tag":
      selectedTag.style.backgroundColor = "#3282f7";
      break;
  }
  selectedTag.classList.add("selected-tag");
  tagsSection.appendChild(selectedTag);
}
