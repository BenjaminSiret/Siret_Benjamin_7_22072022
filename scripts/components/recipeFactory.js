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
    card.innerHTML = `<div class="card-img"></div>
                      <div class="card-content">
                        <div class="card-content-header">
                          <h2 class="recipe-title">${name}</h2>
                          <div class="recipe-duration">
                            <img src='assets/clock.png' alt="clock">
                            <p class="recipe-time">${time} min</p>
                          </div>
                        </div>
                        <div class="card-content-text">
                          <ul class="recipe-ingredients">
                            ${ingredients.map((ingredient) => {
                                if (ingredient.unit === "grammes") {
                                  return `<li><strong>${ingredient.ingredient}:</strong>
                                                      ${ingredient.quantity ? ingredient.quantity : ""}gr
                                          </li>`;
                                } else {
                                  return `<li><strong>${ingredient.ingredient}:</strong>
                                                      ${ingredient.quantity ? ingredient.quantity : ""}
                                                      ${ingredient.unit ? ingredient.unit : ""}
                                          </li>`;
                                }
                            }).join("")
                            }
                          </ul>
                          <div class="recipe-text">${description}</div>
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
