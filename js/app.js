const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('search');
const mealsEl = document.getElementById('meals')

resultHeading = document.getElementById('result-heading');
single_mealEl = document.getElementById('single-meal');

// search meal and fetch from api
function searchMeal(e) {
  e.preventDefault();

  //clear single meal
  single_mealEl.innerHTML = '';

  //get search term
  const term = search.value;
  // console.log(term); // it show whatever you enter

  //check for empty
  if(term.trim()){
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          resultHeading.innerHTML = `<h5>Search results for '${term}': </h5>`;

          if(data.meals === null){
            resultHeading.innerHTML = `<p>There are no search results. Search again...</p>`;
          }else{
            mealsEl.innerHTML = data.meals.map(meal => `
              <div class="meal text-center">
                <img class="img-search" src= "${meal.strMealThumb}" alt="${meal.strMeal}" />
                <div class="meal-info" data-mealID="${meal.idMeal}">
                  <h6 class=" py-3">${meal.strMeal}</h6>
                </div>
              </div>
              `)
              .join('')
          }
        });

        //clear seach text
        search.value = '';

  }else{
    alert('Please enter keyword for searching...');
  }
}

// fetch meal by idea
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
      .then(res => res.json())
      .then(data => {
        const meal = data.meals[0];

        addMealToDOM(meal);
      });
}

// Fetch random meal from API
function getRandomMeal() {
  // Clear meals and heading
  mealsEl.innerHTML = '';
  resultHeading.innerHTML = '';

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

//add meal to dom
function addMealToDOM() {
  const ingretiends = [];

  for(let i=1; i<= 20; i++){
    if(meal[`strIngredient${i}`]){
      strIngredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
    }else{
      break;
    }
  }

  single_mealEl.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
}

// Event listeners
submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);

mealsEl.addEventListener('click', e => {
  const mealInfo = e.path.find(item => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealid');
    getMealById(mealID);
  }
});
