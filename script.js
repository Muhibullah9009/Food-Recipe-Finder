// Get the elements from index.html file into JS file.
const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-closeBtn");
const showAllButton = document.createElement("button"); // Create a button element

// Function to get recipes from the API
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();
        renderRecipes(response.meals);
    } catch (error) {
        console.error('Error in Fetching Recipes:', error);
        recipeContainer.innerHTML = "<h2>Error in Fetching Recipes...</h2>";
    }
}

// Function to render recipes
const renderRecipes = (meals) => {
    if (!meals || meals.length === 0) {
        recipeContainer.innerHTML = "<h2>No recipes found</h2>";
        return;
    }
    recipeContainer.innerHTML = "";
    meals.forEach(meal => {
        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipe");
        recipeDiv.innerHTML = `
            <img src ="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
            <p>Belongs to <span>${meal.strCategory}</span> Category</p>
        `;
        const button = document.createElement("button");
        button.textContent = "View Recipe";
        button.addEventListener('click', () => {
            openRecipePopUp(meal);
        });
        recipeDiv.appendChild(button);
        recipeContainer.appendChild(recipeDiv);
    });
}

// Function to fetch Ingredients and details
const fetchIngredients = (meal) => {
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${ingredient} ${measure}</li>`
        } else {
            break;
        }
    }
    return ingredientsList;
}

// Function to open recipe popup
const openRecipePopUp = (meal) => {
    recipeDetailsContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class="ingredientList">${fetchIngredients(meal)}</ul>
        <div class="recipeInstructions">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
    `
    recipeDetailsContent.parentElement.style.display = "block";
}

// Function to CLOSE recipe popup
recipeCloseBtn.addEventListener("click", () => {
    recipeDetailsContent.parentElement.style.display = "none";
});

// Add event listener on searchBtn
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if (!searchInput) {
        recipeContainer.innerHTML = `<h2>Type the name of the meal in the Search Box</h2>`;
        return;
    }
    fetchRecipes(searchInput);
});

// Add event listener on searchBox for live search filtering
searchBox.addEventListener('input', () => {
    const searchInput = searchBox.value.trim();
    if (!searchInput) {
        recipeContainer.innerHTML = "";
        return;
    }
    fetchRecipes(searchInput);
});

var crursor = document.querySelector("#class1")
var crursorblur = document.querySelector("#class2")
document.addEventListener("mousemove", function(dets) {
    crursor.style.left = dets.x + "px";
    crursor.style.top = dets.y + "px";
    crursorblur.style.left = dets.x - 150 + "px";
    crursorblur.style.top = dets.y - 150 + "px";
})