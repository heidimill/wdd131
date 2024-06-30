// main.js

import recipes from './recipes.mjs';

function random(num) {
    return Math.floor(Math.random() * num);
}

function getRandomListEntry(list) {
    const listLength = list.length;
    const randomNum = random(listLength);
    return list[randomNum];
}

function tagsTemplate(tags) {
    let html = '';
    tags.forEach(tag => {
        html += `<p>${tag}</p> `;
    });
    return html;
}

function ratingTemplate(rating) {
    let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            html += '<span aria-hidden="true" class="icon-star">⭐</span>';
        } else {
            html += '<span aria-hidden="true" class="icon-star-empty">☆</span>';
        }
    }
    html += `</span>`;
    return html;
}

function recipeTemplate(recipe) {
    const tagsHTML = tagsTemplate(recipe.tags);
    const ratingHTML = ratingTemplate(recipe.rating);

    let html = `<div class="recipe-section">`;
    html += `<img src="${recipe.image}" alt="${recipe.name}" class="food-img"/>`;
    html += `<div class="inner-info">`;
    html += `<div class="tags">${tagsHTML}</div>`;
    html += `<h2 class="recipe-name">${recipe.name}</h2>`;
    html += `${ratingHTML}`;
    html += `<p class="description">${recipe.description}</p>`;
    html += `</div></div>`;

    return html;
}

function renderRecipes(recipeList) {
    const outputElement = document.querySelector('.recipes'); // Select the div with class 'recipes'
    let recipesHTML = "";
    recipeList.forEach(recipe => {
        recipesHTML += recipeTemplate(recipe);
    });
    outputElement.innerHTML = recipesHTML;
}

function filterRecipes(query) {
    const filtered = recipes.filter(recipe => {
        const lowerCaseQuery = query.toLowerCase();
        const nameMatch = recipe.name.toLowerCase().includes(lowerCaseQuery);
        const descriptionMatch = recipe.description.toLowerCase().includes(lowerCaseQuery);
        const tagsMatch = recipe.tags && recipe.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery));
        const ingredientsMatch = recipe.ingredients && recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(lowerCaseQuery));
        return nameMatch || descriptionMatch || tagsMatch || ingredientsMatch;
    });
    return filtered.sort((a, b) => a.name.localeCompare(b.name));
}

function searchHandler(e) {
    e.preventDefault();
    const query = document.getElementById("search-input").value.trim().toLowerCase(); // Trim whitespace
    const filteredRecipes = filterRecipes(query);
    renderRecipes(filteredRecipes);
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("search-form").addEventListener("submit", searchHandler);
    init();
});

function init() {
    const recipe = getRandomListEntry(recipes);
    renderRecipes([recipe]);
}
