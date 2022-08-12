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
